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
  const resume = socialLinks.find(link => link.name.toLowerCase() === 'resume');
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
            <div className="glass-card p-0 w-64 h-64 md:w-100 md:h-100 flex items-center justify-center overflow-hidden">
              <Image
                src="/hero.jpg"
                alt={siteCopy.name || 'Profile Photo'}
                width={400}
                height={400}
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
                {siteCopy.subtitle || 'Backend • Data • ML Systems'}
              </p>
              <p className="text-md md:text-md text-accent flex items-center gap-1 mb-4 md:mb-6">
                <span>📍</span>
                {siteCopy.location || 'India'}
              </p>
            </div>

            <div className="space-y-3 md:space-y-4 text-sm md:text-base leading-relaxed text-justify">
              <p>
                {siteCopy.intro || 
                  'Final-year CS undergraduate with a strong backend and data-driven mindset. I enjoy working on the backend side of systems - building APIs, integrating ML workflows and designing reliable services from scratch to MVP.'}
              </p>
              <p>
                {siteCopy.experience || 
                  'My work has primarily involved Python, FastAPI backends, ML pipelines and Natural language processing (NLP). I focus on clarity and building things that work beyond demos.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
              <a
                href="/resume.pdf"
                download
                className="glass-card px-4 py-3 font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all flex items-center gap-2"
              >
                {resume && getIcon(resume) && <Image src={`/${getIcon(resume)}`} alt="Resume" width={20} height={20} />}
                Resume
              </a>
              {github && (
                <a
                  href={formatUrl(github.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-4 py-3 font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all flex items-center gap-2"
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
