import Image from 'next/image';

interface HeroSectionProps {
  siteCopy: Record<string, string>;
  socialLinks: Array<{ name: string; url: string; icon: string }>;
}

export default function HeroSection({ siteCopy, socialLinks }: HeroSectionProps) {
  const githubLink = socialLinks.find(link => link.name.toLowerCase() === 'github')?.url || 'https://github.com';
  const linkedinLink = socialLinks.find(link => link.name.toLowerCase() === 'linkedin')?.url || 'https://linkedin.com';
  
  // Ensure URLs have proper protocol
  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <section id="home" className="flex items-start justify-center px-6 pt-8 pb-20">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Photo */}
          <div className="flex justify-center">
            <div className="glass-card p-0 w-100 h-100 flex items-center justify-center overflow-hidden">
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
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">
                {siteCopy.name || 'Parth Nuwal'}
              </h1>
              <p className="text-xl text-accent mb-6">
                {siteCopy.role || 'Backend Engineer · AI Systems'}
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              {siteCopy.valueStatement || 
                'Building scalable backend systems and AI solutions that solve real problems.'}
            </p>

            <ul className="space-y-2">
              {(siteCopy.proofPoints || 
                'Production-ready APIs serving millions of requests|RAG systems with measurable accuracy improvements|Clean architecture that teams actually want to maintain')
                .split('|')
                .map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">▸</span>
                    <span>{point.trim()}</span>
                  </li>
                ))}
            </ul>

            <div className="flex gap-4 pt-4">
              <a
                href="/resume.pdf"
                download
                className="glass-card px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-all"
              >
                Download Resume
              </a>
              <a
                href={formatUrl(githubLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-4 py-3 font-medium hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
              >
                <Image src="/github-dark.png" alt="GitHub" width={20} height={20} />
                GitHub
              </a>
              <a
                href={formatUrl(linkedinLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-4 py-3 font-medium hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
              >
                <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
