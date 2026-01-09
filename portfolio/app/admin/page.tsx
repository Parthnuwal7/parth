'use client';

import { useState, useEffect } from 'react';

interface Analytics {
  summary: {
    totalPageViews: number;
    uniqueVisitors: number;
    todayViews: number;
    todayUnique: number;
    newVisitors: number;
    returningVisitors: number;
    avgPagesPerVisitor: string;
    peakHour: { block: string; count: number } | null;
  };
  dailyStats: Array<{ date: string; views: number; unique: number }>;
  weekComparison: Array<{ day: string; thisWeek: number; lastWeek: number }>;
  hourBlocks: Array<{ block: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  eventBreakdown: Array<{ event: string; count: number }>;
  recentVisitors: Array<{
    visitorId: string;
    location: string;
    lastVisit: string;
    pageCount: number;
    status: string;
  }>;
  topPages: Array<{ page: string; count: number }>;
  topJourneys: Array<{ journey: string; count: number }>;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      setAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setToken('');
    setAnalytics(null);
    setError('');
  };

  useEffect(() => {
    if (authenticated && token) {
      setLoading(true);
      fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setAnalytics(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch analytics');
          setLoading(false);
        });
    }
  }, [authenticated, token]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleAuth} className="glass-card p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
          />
          <button
            type="submit"
            className="w-full glass-card px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-all"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-accent">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!analytics) return null;

  const maxDailyViews = Math.max(...analytics.dailyStats.map(d => d.views), 1);
  const maxHourViews = Math.max(...analytics.hourBlocks.map(h => h.count), 1);

  return (
    <div className="min-h-screen py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Traffic Analytics</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold">{analytics.summary.totalPageViews}</p>
            <p className="text-sm text-accent">Total Page Views</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold">{analytics.summary.uniqueVisitors}</p>
            <p className="text-sm text-accent">Unique Visitors</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold">{analytics.summary.todayViews}</p>
            <p className="text-sm text-accent">Today's Views</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold">{analytics.summary.todayUnique}</p>
            <p className="text-sm text-accent">Today's Unique</p>
          </div>
        </div>

        {/* Insights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <p className="text-xl font-semibold">{analytics.summary.newVisitors}</p>
            <p className="text-xs text-accent">New Visitors</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xl font-semibold">{analytics.summary.returningVisitors}</p>
            <p className="text-xs text-accent">Returning</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xl font-semibold">{analytics.summary.avgPagesPerVisitor}</p>
            <p className="text-xs text-accent">Avg Pages/Visitor</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xl font-semibold">{analytics.summary.peakHour?.block || 'N/A'}</p>
            <p className="text-xs text-accent">Peak Hours</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Last 7 Days Chart */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Last 7 Days</h2>
            <div className="flex items-end gap-3 h-48">
              {analytics.dailyStats.map((day) => {
                const heightPercent = maxDailyViews > 0 ? (day.views / maxDailyViews) * 100 : 0;
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      className="w-full bg-accent/60 rounded-t-md transition-all hover:bg-accent min-w-[20px]"
                      style={{ height: `${Math.max(heightPercent, 5)}%` }}
                      title={`${day.views} views, ${day.unique} unique`}
                    />
                    <p className="text-xs text-accent mt-2">
                      {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                    </p>
                    <p className="text-xs font-semibold">{day.views}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hour Distribution Chart */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Hour Distribution</h2>
            <div className="flex items-end gap-3 h-48">
              {analytics.hourBlocks.map((hour) => {
                const heightPercent = maxHourViews > 0 ? (hour.count / maxHourViews) * 100 : 0;
                return (
                  <div key={hour.block} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      className="w-full bg-accent/60 rounded-t-md transition-all hover:bg-accent min-w-[20px]"
                      style={{ height: `${Math.max(heightPercent, 5)}%` }}
                      title={`${hour.count} visits`}
                    />
                    <p className="text-xs text-accent mt-2">{hour.block}</p>
                    <p className="text-xs font-semibold">{hour.count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Week over Week Comparison */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Week over Week Comparison</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent/60 rounded"></div>
              <span className="text-xs">This Week</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent/30 rounded"></div>
              <span className="text-xs">Last Week</span>
            </div>
          </div>
          {(!analytics.weekComparison || analytics.weekComparison.length === 0) ? (
            <p className="text-accent text-sm">No comparison data yet</p>
          ) : (
            <div className="flex items-end gap-4 h-48">
              {(() => {
                const maxViews = Math.max(
                  ...analytics.weekComparison.map(d => Math.max(d.thisWeek, d.lastWeek)),
                  1
                );
                return analytics.weekComparison.map((day) => {
                  const thisWeekHeight = maxViews > 0 ? (day.thisWeek / maxViews) * 100 : 0;
                  const lastWeekHeight = maxViews > 0 ? (day.lastWeek / maxViews) * 100 : 0;
                  const change = day.lastWeek > 0
                    ? Math.round(((day.thisWeek - day.lastWeek) / day.lastWeek) * 100)
                    : day.thisWeek > 0 ? 100 : 0;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center h-full justify-end">
                      <div className="flex gap-1 items-end h-full">
                        <div
                          className="w-4 bg-accent/30 rounded-t transition-all"
                          style={{ height: `${Math.max(lastWeekHeight, 5)}%` }}
                          title={`Last week: ${day.lastWeek}`}
                        />
                        <div
                          className="w-4 bg-accent/60 rounded-t transition-all hover:bg-accent"
                          style={{ height: `${Math.max(thisWeekHeight, 5)}%` }}
                          title={`This week: ${day.thisWeek}`}
                        />
                      </div>
                      <p className="text-xs text-accent mt-2">{day.day}</p>
                      <p className="text-xs font-semibold">
                        {day.thisWeek}
                        {change !== 0 && (
                          <span className={change > 0 ? 'text-green-500 ml-1' : 'text-red-500 ml-1'}>
                            {change > 0 ? '↑' : '↓'}
                          </span>
                        )}
                      </p>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>

        {/* Tables Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Countries Bubble Chart */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Visitors by Country</h2>
            {(!analytics.topCountries || analytics.topCountries.length === 0) ? (
              <p className="text-accent text-sm">No country data yet</p>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center items-center min-h-[120px]">
                {(() => {
                  const maxCount = Math.max(...analytics.topCountries.map(c => c.count), 1);
                  const colors = [
                    'bg-blue-500/70', 'bg-green-500/70', 'bg-purple-500/70',
                    'bg-orange-500/70', 'bg-pink-500/70', 'bg-cyan-500/70',
                    'bg-yellow-500/70', 'bg-red-500/70', 'bg-indigo-500/70', 'bg-teal-500/70'
                  ];
                  return analytics.topCountries.map((item, i) => {
                    const size = 40 + (item.count / maxCount) * 60;
                    return (
                      <div
                        key={item.country}
                        className={`${colors[i % colors.length]} rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-lg hover:scale-110 transition-transform cursor-default`}
                        style={{ width: `${size}px`, height: `${size}px` }}
                        title={`${item.country}: ${item.count} visits`}
                      >
                        <div className="text-center leading-tight">
                          <div className="text-[10px] opacity-80">{item.country}</div>
                          <div>{item.count}</div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>

          {/* Top Locations */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Top Locations</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {analytics.topLocations.length === 0 ? (
                <p className="text-accent text-sm">No location data yet</p>
              ) : (
                analytics.topLocations.map((loc, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate">{loc.location}</span>
                    <span className="font-semibold ml-2">{loc.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Top Referrers Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Referrers */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Top Referrers</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {analytics.topReferrers.length === 0 ? (
                <p className="text-accent text-sm">No referrer data yet</p>
              ) : (
                analytics.topReferrers.map((ref, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate">{ref.referrer}</span>
                    <span className="font-semibold ml-2">{ref.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Event Breakdown & Top Pages */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Event Breakdown */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Event Breakdown</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {analytics.eventBreakdown.length === 0 ? (
                <p className="text-accent text-sm">No events yet</p>
              ) : (
                analytics.eventBreakdown.map((evt, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate font-mono text-xs">{evt.event}</span>
                    <span className="font-semibold ml-2">{evt.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Pages */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Top Pages</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {analytics.topPages.length === 0 ? (
                <p className="text-accent text-sm">No page data yet</p>
              ) : (
                analytics.topPages.map((page, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate font-mono text-xs">{page.page}</span>
                    <span className="font-semibold ml-2">{page.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>



        {/* Visitor Journeys */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Common Visitor Journeys</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {(!analytics.topJourneys || analytics.topJourneys.length === 0) ? (
              <p className="text-accent text-sm">No journey data yet</p>
            ) : (
              analytics.topJourneys.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-accent/10 pb-2 last:border-0 last:pb-0">
                  <div className="flex-1 mr-4 overflow-hidden">
                    <div className="flex flex-wrap gap-1 text-xs text-accent/80 font-mono">
                      {item.journey.split(' → ').map((step, idx, arr) => (
                        <span key={idx} className="flex items-center">
                          <span className={`${step === 'Home' ? 'text-blue-400' : step.startsWith('Project:') ? 'text-purple-400' : 'text-accent'} bg-accent/5 px-1.5 py-0.5 rounded`}>
                            {step}
                          </span>
                          {idx < arr.length - 1 && <span className="mx-1 text-accent/40">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-semibold bg-accent/10 px-2 py-1 rounded min-w-[2rem] text-center">
                    {item.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent 10 Unique Visitors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-left py-2 px-2">Visitor ID</th>
                  <th className="text-left py-2 px-2">Location</th>
                  <th className="text-left py-2 px-2">Last Visit</th>
                  <th className="text-left py-2 px-2">Pages</th>
                  <th className="text-left py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentVisitors.map((visitor, i) => (
                  <tr key={i} className="border-b border-accent/10 hover:bg-accent/5">
                    <td className="py-2 px-2 font-mono text-xs">{visitor.visitorId}</td>
                    <td className="py-2 px-2">{visitor.location}</td>
                    <td className="py-2 px-2">{visitor.lastVisit}</td>
                    <td className="py-2 px-2">{visitor.pageCount}</td>
                    <td className="py-2 px-2">
                      <span className={`text-xs px-2 py-1 rounded ${visitor.status === 'New' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {visitor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
}
