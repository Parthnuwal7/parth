'use client';

import { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export default function CalFloatingButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '15min' });
      cal('floatingButton', {
        calLink: 'parth-nuwal-qg5li2/15min',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return null;
}
