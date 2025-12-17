'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#about' },
  { name: 'Leave a message', href: '#message' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
      <div className="glass-card px-3 md:px-6 py-3 shadow-lg backdrop-blur-md">
        <ul className="flex gap-3 md:gap-8 items-center justify-center flex-wrap">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`text-xs md:text-sm font-medium transition-colors hover:text-foreground ${
                  activeSection === item.href.slice(1)
                    ? 'text-foreground'
                    : 'text-accent'
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
