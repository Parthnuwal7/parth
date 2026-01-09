import { NextRequest, NextResponse } from 'next/server';
import { getVisitorLogs } from '@/lib/sheets';

export async function GET(request: NextRequest) {
    try {
        // Check for admin token
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const validToken = process.env.ADMIN_TOKEN;

        if (!token || token !== validToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const logs = await getVisitorLogs();

        // Process analytics
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Basic counts
        const totalPageViews = logs.length;
        const uniqueVisitors = new Set(logs.map(l => l.visitorId)).size;

        // Today's stats
        const todayLogs = logs.filter(l => l.timestamp.startsWith(today));
        const todayViews = todayLogs.length;
        const todayUnique = new Set(todayLogs.map(l => l.visitorId)).size;

        // Last 7 days breakdown
        const last7Days: Record<string, { views: number; unique: Set<string> }> = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const dateStr = date.toISOString().split('T')[0];
            last7Days[dateStr] = { views: 0, unique: new Set() };
        }

        logs.forEach(log => {
            const logDate = log.timestamp.split(' ')[0];
            if (last7Days[logDate]) {
                last7Days[logDate].views++;
                last7Days[logDate].unique.add(log.visitorId);
            }
        });

        const dailyStats = Object.entries(last7Days)
            .map(([date, data]) => ({
                date,
                views: data.views,
                unique: data.unique.size,
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        // Week-over-Week comparison (this week vs last week by day of week)
        const weekComparison: Array<{
            day: string;
            thisWeek: number;
            lastWeek: number;
        }> = [];

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
            // This week's day
            const thisWeekDate = new Date(now);
            thisWeekDate.setDate(now.getDate() - now.getDay() + i); // Start from Sunday
            const thisWeekStr = thisWeekDate.toISOString().split('T')[0];

            // Last week's same day
            const lastWeekDate = new Date(thisWeekDate);
            lastWeekDate.setDate(lastWeekDate.getDate() - 7);
            const lastWeekStr = lastWeekDate.toISOString().split('T')[0];

            const thisWeekViews = logs.filter(l => l.timestamp.startsWith(thisWeekStr)).length;
            const lastWeekViews = logs.filter(l => l.timestamp.startsWith(lastWeekStr)).length;

            weekComparison.push({
                day: dayNames[i],
                thisWeek: thisWeekViews,
                lastWeek: lastWeekViews,
            });
        }

        // Hour distribution (4-hour blocks)
        const hourBlocks: Record<string, number> = {
            '00-04': 0,
            '04-08': 0,
            '08-12': 0,
            '12-16': 0,
            '16-20': 0,
            '20-24': 0,
        };

        logs.forEach(log => {
            const timePart = log.timestamp.split(' ')[1];
            if (timePart) {
                const hour = parseInt(timePart.split(':')[0]);
                if (hour < 4) hourBlocks['00-04']++;
                else if (hour < 8) hourBlocks['04-08']++;
                else if (hour < 12) hourBlocks['08-12']++;
                else if (hour < 16) hourBlocks['12-16']++;
                else if (hour < 20) hourBlocks['16-20']++;
                else hourBlocks['20-24']++;
            }
        });

        // Top locations
        const locationCounts: Record<string, number> = {};
        logs.forEach(log => {
            const location = `${log.city}, ${log.country}`;
            if (log.city && log.city !== 'Unknown') {
                locationCounts[location] = (locationCounts[location] || 0) + 1;
            }
        });
        const topLocations = Object.entries(locationCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([location, count]) => ({ location, count }));

        // Top countries (using country column directly)
        const countryCounts: Record<string, number> = {};
        logs.forEach(log => {
            if (log.country && log.country !== 'Unknown') {
                countryCounts[log.country] = (countryCounts[log.country] || 0) + 1;
            }
        });
        const topCountries = Object.entries(countryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([country, count]) => ({ country, count }));

        // Top referrers
        const referrerCounts: Record<string, number> = {};
        logs.forEach(log => {
            if (log.referrer && log.referrer !== 'Direct') {
                referrerCounts[log.referrer] = (referrerCounts[log.referrer] || 0) + 1;
            }
        });
        const topReferrers = Object.entries(referrerCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([referrer, count]) => ({ referrer, count }));

        // Event breakdown
        const eventCounts: Record<string, number> = {};
        logs.forEach(log => {
            if (log.path.startsWith('EVENT:')) {
                const event = log.path.replace('EVENT: ', '');
                eventCounts[event] = (eventCounts[event] || 0) + 1;
            }
        });
        const eventBreakdown = Object.entries(eventCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([event, count]) => ({ event, count }));

        // Recent 10 unique visitors
        const seenVisitors = new Set<string>();
        const recentVisitors: Array<{
            visitorId: string;
            location: string;
            lastVisit: string;
            pageCount: number;
            status: string;
        }> = [];

        // Sort by timestamp descending
        const sortedLogs = [...logs].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

        for (const log of sortedLogs) {
            if (!seenVisitors.has(log.visitorId) && recentVisitors.length < 10) {
                seenVisitors.add(log.visitorId);
                const visitorLogs = logs.filter(l => l.visitorId === log.visitorId);
                recentVisitors.push({
                    visitorId: log.visitorId.substring(0, 8) + '...',
                    location: `${log.city}, ${log.country}`,
                    lastVisit: log.timestamp,
                    pageCount: visitorLogs.length,
                    status: log.status,
                });
            }
        }

        // New vs returning
        const newVisitors = logs.filter(l => l.status === 'New').length;
        const returningVisitors = logs.filter(l => l.status === 'Existing').length;

        // Most popular pages (excluding events)
        const pageCounts: Record<string, number> = {};
        logs.forEach(log => {
            if (!log.path.startsWith('EVENT:')) {
                pageCounts[log.path] = (pageCounts[log.path] || 0) + 1;
            }
        });
        const topPages = Object.entries(pageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([page, count]) => ({ page, count }));

        // Visitor Journeys (path sequences per visitor, split by sessions)
        const journeyMap: Record<string, Array<{ timestamp: string; path: string }>> = {};
        logs.forEach(log => {
            if (!journeyMap[log.visitorId]) {
                journeyMap[log.visitorId] = [];
            }
            journeyMap[log.visitorId].push({ timestamp: log.timestamp, path: log.path });
        });

        // Build journeys with session splitting (30 min timeout)
        const journeyCounts: Record<string, number> = {};
        const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

        Object.values(journeyMap).forEach((visitorLogs) => {
            // Sort logs by time
            const sorted = visitorLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            let currentSession: string[] = [];
            let lastTime = 0;

            sorted.forEach((log) => {
                const logTime = new Date(log.timestamp).getTime();

                // If gap > 30 mins, push previous session and start new
                if (lastTime > 0 && logTime - lastTime > SESSION_TIMEOUT_MS) {
                    if (currentSession.length > 0) {
                        const journeyStr = currentSession.map(p => {
                            if (p.startsWith('EVENT:')) return p.replace('EVENT: ', '🔗 ');
                            if (p === '/') return 'Home';
                            if (p.startsWith('/projects/')) return p.replace('/projects/', 'Project: ');
                            return p;
                        }).join(' → ');
                        journeyCounts[journeyStr] = (journeyCounts[journeyStr] || 0) + 1;
                    }
                    currentSession = [];
                }

                currentSession.push(log.path);
                lastTime = logTime;
            });

            // Push the final session
            if (currentSession.length > 0) {
                const journeyStr = currentSession.map(p => {
                    if (p.startsWith('EVENT:')) return p.replace('EVENT: ', '🔗 ');
                    if (p === '/') return 'Home';
                    if (p.startsWith('/projects/')) return p.replace('/projects/', 'Project: ');
                    return p;
                }).join(' → ');
                journeyCounts[journeyStr] = (journeyCounts[journeyStr] || 0) + 1;
            }
        });

        const topJourneys = Object.entries(journeyCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([journey, count]) => ({ journey, count }));

        // Peak hour
        const peakHour = Object.entries(hourBlocks)
            .sort((a, b) => b[1] - a[1])[0];

        // Average pages per visitor
        const avgPagesPerVisitor = uniqueVisitors > 0
            ? (totalPageViews / uniqueVisitors).toFixed(1)
            : '0';

        return NextResponse.json({
            summary: {
                totalPageViews,
                uniqueVisitors,
                todayViews,
                todayUnique,
                newVisitors,
                returningVisitors,
                avgPagesPerVisitor,
                peakHour: peakHour ? { block: peakHour[0], count: peakHour[1] } : null,
            },
            dailyStats,
            weekComparison,
            hourBlocks: Object.entries(hourBlocks).map(([block, count]) => ({ block, count })),
            topLocations,
            topCountries,
            topReferrers,
            eventBreakdown,
            recentVisitors,
            topPages,
            topJourneys,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
