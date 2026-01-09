'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

const VISITOR_ID_KEY = 'portfolio_visitor_id';
const LAST_LOG_KEY = 'portfolio_last_log';
const LOCATION_CACHE_KEY = 'portfolio_location';
const LOG_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds
const LOCATION_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedLocation {
  timestamp: number;
  data: {
    country: string;
    region: string;
    city: string;
    timezone: string;
    isp: string;
    latitude: string;
    longitude: string;
  };
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Get or create visitor ID immediately on client
    let storedId = localStorage.getItem(VISITOR_ID_KEY);
    if (!storedId) {
      // Generate UUID on client to prevent race condition with multiple tabs
      storedId = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, storedId);
    }
    setVisitorId(storedId);
  }, []);

  // Get cached location if valid (within 24 hours)
  const getCachedLocation = (): CachedLocation['data'] | null => {
    try {
      const cached = localStorage.getItem(LOCATION_CACHE_KEY);
      if (!cached) return null;

      const parsed: CachedLocation = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < LOCATION_TTL) {
        return parsed.data;
      }
      // Cache expired, remove it
      localStorage.removeItem(LOCATION_CACHE_KEY);
      return null;
    } catch {
      return null;
    }
  };

  // Save location to cache
  const cacheLocation = (data: CachedLocation['data']) => {
    const cached: CachedLocation = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cached));
  };

  useEffect(() => {
    // Wait for visitorId to be set
    if (!visitorId) return;

    // Get stored last path from localStorage (persists across component mounts)
    const lastLoggedPath = localStorage.getItem('portfolio_last_path');
    const isNewPath = lastLoggedPath !== pathname;

    // Guard against duplicate calls (React StrictMode double-invocation)
    // Reset if path changed
    if (isNewPath) {
      hasFetchedRef.current = false;
    }
    if (hasFetchedRef.current) return;

    // Check if enough time has passed since last log (only for same path refreshes)
    const lastLog = localStorage.getItem(LAST_LOG_KEY);
    const now = Date.now();

    // Only apply rate limit if same path AND within 3 minutes
    // Path changes always bypass the rate limit
    if (!isNewPath && lastLog && now - parseInt(lastLog) < LOG_INTERVAL) {
      // Skip logging if same path and less than 3 minutes since last log
      return;
    }

    // Mark as fetching to prevent duplicates
    hasFetchedRef.current = true;

    // Save timestamp and path BEFORE fetch to prevent race condition (optimistic update)
    localStorage.setItem(LAST_LOG_KEY, now.toString());
    localStorage.setItem('portfolio_last_path', pathname);

    // Check for cached location
    const cachedLocation = getCachedLocation();

    // Log visitor on page load
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        visitorId,
        referrer: document.referrer || 'Direct',
        cachedLocation // Send cached location if available
      }),
    })
      .then(res => res.json())
      .then(data => {
        // If server returns fresh location data, cache it
        if (data.location) {
          cacheLocation(data.location);
        }
      })
      .catch(err => {
        console.error(err);
        // Rollback timestamp on error so it can retry
        localStorage.removeItem(LAST_LOG_KEY);
        hasFetchedRef.current = false;
      });
  }, [pathname, visitorId]);

  return null;
}
