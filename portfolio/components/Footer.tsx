'use client';

interface FooterProps {
  visitorCount: number;
  socialLinks: Array<{ name: string; url: string; icon: string; iconLight?: string; iconDark?: string }>;
}

export default function Footer({ visitorCount, socialLinks }: FooterProps) {
  const githubLink = socialLinks.find(link => link.name.toLowerCase() === 'github')?.url || '#';
  const linkedinLink = socialLinks.find(link => link.name.toLowerCase() === 'linkedin')?.url || '#';
  const emailLink = socialLinks.find(link => link.name.toLowerCase() === 'email')?.url || 'mailto:your@email.com';
  const resumeLink = socialLinks.find(link => link.name.toLowerCase() === 'resume')?.url || '#';

  const trackClick = (event: string) => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        visitorId: localStorage.getItem('portfolio_visitor_id'),
        referrer: document.referrer || 'Direct'
      }),
    }).catch(console.error);
  };

  return (
    <footer id="socials" className="bg-accent/20 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 text-sm md:text-base">
          <a href="#projects" className="text-accent hover:text-foreground transition-colors">
            Projects
          </a>
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-foreground transition-colors"
            onClick={() => trackClick('resume_click')}
          >
            Resume
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-foreground transition-colors"
            onClick={() => trackClick('github_click')}
          >
            GitHub
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-foreground transition-colors"
            onClick={() => trackClick('linkedin_click')}
          >
            LinkedIn
          </a>
          <a href={emailLink} className="text-accent hover:text-foreground transition-colors">
            Email
          </a>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs md:text-sm text-accent">
            Visitors: {visitorCount.toLocaleString()}
          </p>
          <p className="text-xs md:text-sm text-accent">
            © 2026 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
