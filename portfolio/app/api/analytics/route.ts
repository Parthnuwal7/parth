import { NextRequest, NextResponse } from 'next/server';
import { logVisitor, checkVisitorExists } from '@/lib/sheets';
import { v4 as uuidv4 } from 'uuid';

interface IPInfoResponse {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
}

interface CachedLocationData {
  country: string;
  region: string;
  city: string;
  timezone: string;
  isp: string;
  latitude: string;
  longitude: string;
}

export async function POST(request: NextRequest) {
  try {
    const { path, visitorId: clientVisitorId, referrer, event, cachedLocation } = await request.json();

    // Get IP from headers - try multiple sources
    let ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') || // Cloudflare
      request.headers.get('x-client-ip') ||
      request.headers.get('x-cluster-client-ip') ||
      request.headers.get('forwarded')?.split(',')[0]?.trim() ||
      'unknown';

    // If still unknown, try to get from request
    if (ip === 'unknown') {
      const requestIP = (request as any).ip;
      if (requestIP) {
        ip = requestIP;
      }
    }

    console.log('Captured IP:', ip);
    console.log('Headers:', {
      'x-forwarded-for': request.headers.get('x-forwarded-for'),
      'x-real-ip': request.headers.get('x-real-ip'),
      'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
    });

    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Generate or use existing visitor ID
    const visitorId = clientVisitorId || uuidv4();

    // Check if this is a new or existing visitor (safely)
    let isExisting = false;
    try {
      isExisting = clientVisitorId ? await checkVisitorExists(clientVisitorId) : false;
    } catch (error) {
      console.log('Could not check visitor existence, defaulting to New');
      isExisting = false;
    }

    // Location data - use cached if provided, otherwise fetch from ipinfo
    let locationData: CachedLocationData | null = null;
    let fetchedFreshLocation = false;

    if (cachedLocation) {
      // Use cached location from client (skip ipinfo API call)
      locationData = cachedLocation;
      console.log('Using cached location data');
    } else {
      // No cached location - fetch from ipinfo
      const ipinfoToken = process.env.IPINFO_TOKEN;

      if (ipinfoToken && ip !== 'unknown' && ip !== '127.0.0.1' && !ip.startsWith('192.168.')) {
        try {
          const response = await fetch(`https://ipinfo.io/${ip}?token=${ipinfoToken}`);
          if (response.ok) {
            const ipData: IPInfoResponse = await response.json();
            const [latitude = '', longitude = ''] = ipData.loc?.split(',') || ['', ''];

            locationData = {
              country: ipData.country || 'Unknown',
              region: ipData.region || 'Unknown',
              city: ipData.city || 'Unknown',
              timezone: ipData.timezone || 'Unknown',
              isp: ipData.org || 'Unknown',
              latitude,
              longitude,
            };
            fetchedFreshLocation = true;
            console.log('Fetched fresh location from ipinfo');
          }
        } catch (error) {
          console.error('Error fetching IP info:', error);
        }
      }
    }

    // Determine source from referrer
    let source = 'Direct';
    if (referrer && referrer !== '') {
      try {
        const refUrl = new URL(referrer);
        source = refUrl.hostname;
      } catch {
        source = 'Direct';
      }
    }

    // Prepare visitor data
    const visitorData = {
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      visitorId,
      ip,
      country: locationData?.country || 'Unknown',
      region: locationData?.region || 'Unknown',
      city: locationData?.city || 'Unknown',
      timezone: locationData?.timezone || 'Unknown',
      isp: locationData?.isp || 'Unknown',
      userAgent,
      referrer: referrer || 'Direct',
      latitude: locationData?.latitude || '',
      longitude: locationData?.longitude || '',
      source: cachedLocation ? 'cached' : 'ipinfo.io',
      status: isExisting ? 'Existing' : 'New',
      path: event ? `EVENT: ${event}` : (path || '/'),
    };

    await logVisitor(visitorData);

    // Return response with fresh location data for client to cache
    return NextResponse.json({
      success: true,
      visitorId,
      isNew: !isExisting,
      // Only send location back if we fetched it fresh (for client to cache)
      ...(fetchedFreshLocation && locationData ? { location: locationData } : {})
    });
  } catch (error) {
    console.error('Error logging visitor:', error);
    return NextResponse.json(
      { error: 'Failed to log visitor' },
      { status: 500 }
    );
  }
}
