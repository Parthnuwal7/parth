'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const VISITOR_ID_KEY = 'portfolio_visitor_id';
const LAST_LOG_KEY = 'portfolio_last_log';
const LOG_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds

export default function VisitorTracker() {
  const pathname = usePathname();
  const [visitorId, setVisitorId] = useState<string | null>(null);

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

    // Check if enough time has passed since last log
    const lastLog = localStorage.getItem(LAST_LOG_KEY);
    const now = Date.now();
    
    if (lastLog && now - parseInt(lastLog) < LOG_INTERVAL) {
      // Skip logging if less than 3 minutes since last log
      return;
    }

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
      .catch(console.error);
  }, [pathname, visitorId]);

  return null;
}
