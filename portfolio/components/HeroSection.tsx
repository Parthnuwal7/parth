'use client';

import Image from 'next/image';
import { useTheme } from './ThemeProvider';

interface HeroSectionProps {
  siteCopy: Record<string, string>;
  socialLinks: Array<{ name: string; url: string; icon: string; iconLight?: string; iconDark?: string }>;
}

export default function HeroSection({ siteCopy, socialLinks }: HeroSectionProps) {
  const github = socialLinks.find(link => link.name.toLowerCase() === 'github');
  const linkedin = socialLinks.find(link => link.name.toLowerCase() === 'linkedin');
  const cal = socialLinks.find(link => link.name.toLowerCase() === 'cal');
  const { theme } = useTheme();

  // Get the appropriate icon based on theme
  const getIcon = (link: typeof github) => {
    if (!link) return null;
    if (theme === 'dark' && link.iconDark) return link.iconDark;
    if (theme === 'light' && link.iconLight) return link.iconLight;
    return link.icon; // fallback to default icon
  };

  // Ensure URLs have proper protocol
  const formatUrl = (url: string) => {
    const cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('mailto:')) {
      return `https://${cleanUrl}`;
    }
    return cleanUrl;
  };

  return (
    <section id="home" className="flex items-start justify-center px-0 md:px-10 pt-6 md:pt-8 pb-12 md:pb-20">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left - Photo */}
          <div className="flex justify-center order-1 md:order-none">
            <div className="glass-card p-0 w-64 md:w-80 lg:w-96 aspect-square overflow-hidden">
              <Image
                src="/profile.jpg"
                alt={siteCopy.name || 'Profile Photo'}
                width={900}
                height={900}
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, 256px"
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3">
                {siteCopy.name || 'Parth Nuwal'}
              </h1>
              {/* <p className="text-2xl font-semibold mb-2">
                {siteCopy.role || 'Machine Learning Engineer'}
              </p> */}
              <p className="text-base md:text-lg text-accent mb-2">
                {siteCopy.subtitle || 'Software Engineer · Applied AI · Bakend & Data'}
              </p>
              <p className="text-md md:text-md text-accent flex items-center gap-1 mb-4 md:mb-6">
                <span>📍</span>
                {siteCopy.location || 'India'}
              </p>
              {/* <p className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10">
                <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                {siteCopy.availability || 'Open to founding & early-stage AI engineer roles'}
              </p> */}
            </div>

            <div className="space-y-3 md:space-y-4 text-md md:text-base leading-8">
              <p className="font-medium">
                {siteCopy.intro ||
                  'Software engineer drawn to problems where AI, backend systems, and data intersect.'}
              </p>
              <p>
                {siteCopy.experience ||
                  'I like creating systems from the bottom up, deconstructing ambiguous requirements, analysing trade-offs, building dependable services, and identifying what happens when things go wrong. My areas of interest are backend architecture, data infrastructure, and applied AI, particularly around agentic systems and model evaluation.'}
              </p>
              <p>
                {siteCopy.philosophy ||
                  'I care about the engineering around AI as much as the models themselves: ensuring correctness, observability, latency, cost, and knowing whether a system actually works beyond a successful demo.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
              {cal && (
                <a
                  href={formatUrl(cal.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-4 py-3 font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all flex items-center gap-2"
                  onClick={() => {
                    fetch('/api/analytics', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        event: 'cal_click',
                        visitorId: localStorage.getItem('portfolio_visitor_id'),
                        referrer: document.referrer || 'Direct'
                      }),
                    }).catch(console.error);
                  }}
                >
                  {getIcon(cal) && <Image src={`/${getIcon(cal)}`} alt="Book a call" width={20} height={20} />}
                  Book a 15-min call
                </a>
              )}
              {github && (
                <a
                  href={formatUrl(github.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-4 py-3 font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all flex items-center gap-2"
                  onClick={() => {
                    fetch('/api/analytics', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        event: 'github_click',
                        visitorId: localStorage.getItem('portfolio_visitor_id'),
                        referrer: document.referrer || 'Direct'
                      }),
                    }).catch(console.error);
                  }}
                >
                  {getIcon(github) && <Image src={`/${getIcon(github)}`} alt="GitHub" width={20} height={20} />}
                </a>
              )}
              {linkedin && (
                <a
                  href={formatUrl(linkedin.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-4 py-3 font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all flex items-center gap-2"
                  onClick={() => {
                    fetch('/api/analytics', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        event: 'linkedin_click',
                        visitorId: localStorage.getItem('portfolio_visitor_id'),
                        referrer: document.referrer || 'Direct'
                      }),
                    }).catch(console.error);
                  }}
                >
                  {getIcon(linkedin) && <Image src={`/${getIcon(linkedin)}`} alt="LinkedIn" width={20} height={20} />}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
