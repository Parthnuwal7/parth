import Image from 'next/image';

interface HeroSectionProps {
  siteCopy: Record<string, string>;
  socialLinks: Array<{ name: string; url: string; icon: string }>;
}

export default function HeroSection({ siteCopy, socialLinks }: HeroSectionProps) {
  const github = socialLinks.find(link => link.name.toLowerCase() === 'github');
  const linkedin = socialLinks.find(link => link.name.toLowerCase() === 'linkedin');
  
  // Ensure URLs have proper protocol
  const formatUrl = (url: string) => {
    const cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('mailto:')) {
      return `https://${cleanUrl}`;
    }
    return cleanUrl;
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
              <h1 className="text-5xl font-bold mb-3">
                {siteCopy.name || 'Parth Nuwal'}
              </h1>
              {/* <p className="text-2xl font-semibold mb-2">
                {siteCopy.role || 'Machine Learning Engineer'}
              </p> */}
              <p className="text-lg text-accent mb-6">
                {siteCopy.subtitle || 'Backend • Data • ML Systems'}
              </p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-justify">
              <p>
                {siteCopy.intro || 
                  'Final-year undergraduate from Jaipur, India with a strong backend and data-driven mindset. I enjoy working on the backend side of systems - building APIs, integrating ML workflows and designing reliable services from scratch to MVP.'}
              </p>
              <p>
                {siteCopy.experience || 
                  'My work has primarily involved Python, FastAPI backends, ML pipelines and system-level problem solving. I focus on correctness, clarity and building things that actually work beyond demos.'}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="/resume.pdf"
                download
                className="glass-card px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-all"
              >
                Download Resume
              </a>
              {github && (
                <a
                  href={formatUrl(github.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-4 py-3 font-medium hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
                >
                  {github.icon && <Image src={`/${github.icon}`} alt="GitHub" width={20} height={20} />}
                  GitHub
                </a>
              )}
              {linkedin && (
                <a
                  href={formatUrl(linkedin.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-4 py-3 font-medium hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
                >
                  {linkedin.icon && <Image src={`/${linkedin.icon}`} alt="LinkedIn" width={20} height={20} />}
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
