interface FooterProps {
  visitorCount: number;
  socialLinks: Array<{ name: string; url: string; icon: string; iconLight?: string; iconDark?: string }>;
}

export default function Footer({ visitorCount, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const githubLink = socialLinks.find(link => link.name.toLowerCase() === 'github')?.url || '#';
  const linkedinLink = socialLinks.find(link => link.name.toLowerCase() === 'linkedin')?.url || '#';
  const emailLink = socialLinks.find(link => link.name.toLowerCase() === 'email')?.url || 'mailto:your@email.com';

  return (
    <footer id="socials" className="bg-accent/20 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 text-sm md:text-base">
          <a href="#projects" className="text-accent hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="https://drive.google.com/file/d/12p7I3-seaEFth7eBksSykvCYBtwT6Lfp/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors">
            Resume
          </a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors">
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
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
