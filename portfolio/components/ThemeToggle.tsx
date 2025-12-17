'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#1a1a1a' : '#f5f5f0'
      }}
      className="fixed bottom-4 right-4 md:top-4 md:bottom-auto z-50 p-2 md:p-3 rounded-full shadow-lg transition-all border-2 border-gray-300 hover:opacity-90 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      <span className="text-base md:text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
}
