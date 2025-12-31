'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

const VISITOR_ID_KEY = 'portfolio_visitor_id';
const LAST_LOG_KEY = 'portfolio_last_log';
const LOG_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds

export default function VisitorTracker() {
  const pathname = usePathname();
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Get or create visitor ID
    let storedId = localStorage.getItem(VISITOR_ID_KEY);
    if (!storedId) {
      storedId = null; // Will be created by backend
    }
    setVisitorId(storedId);
  }, []);

  useEffect(() => {
    if (visitorId === null && typeof window === 'undefined') return;

    // Reset fetch guard if pathname changed
    if (lastPathRef.current !== pathname) {
      hasFetchedRef.current = false;
      lastPathRef.current = pathname;
    }

    // Guard against duplicate calls (React StrictMode double-invocation)
    if (hasFetchedRef.current) return;

    // Check if enough time has passed since last log
    const lastLog = localStorage.getItem(LAST_LOG_KEY);
    const now = Date.now();

    if (lastLog && now - parseInt(lastLog) < LOG_INTERVAL) {
      // Skip logging if less than 3 minutes since last log
      return;
    }

    // Mark as fetching to prevent duplicates
    hasFetchedRef.current = true;

    // Log visitor on page load
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        visitorId: localStorage.getItem(VISITOR_ID_KEY),
        referrer: document.referrer || 'Direct'
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.visitorId && !localStorage.getItem(VISITOR_ID_KEY)) {
          localStorage.setItem(VISITOR_ID_KEY, data.visitorId);
        }
        // Update last log timestamp
        localStorage.setItem(LAST_LOG_KEY, now.toString());
      })
      .catch(err => {
        console.error(err);
        // Reset on error so it can retry
        hasFetchedRef.current = false;
      });
  }, [pathname, visitorId]);

  return null;
}
