import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutMeSection from '@/components/AboutMeSection';
import MessageSection from '@/components/MessageSection';
import Footer from '@/components/Footer';
import { getProjects, getSkills, getSocialLinks, getSiteCopy, getVisitorCount } from '@/lib/sheets';

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function Home() {
  // Fetch all data in parallel
  const [projects, skills, socialLinks, siteCopy, visitorCount] = await Promise.all([
    getProjects().catch(() => []),
    getSkills().catch(() => ({})),
    getSocialLinks().catch(() => []),
    getSiteCopy().catch(() => ({})),
    getVisitorCount().catch(() => 0),
  ]);

  return (
    <>
      <Navigation />
      <ThemeToggle />
      <div className="min-h-screen px-3 md:px-6 pt-24 md:pt-25">
        <div className="max-w-7xl mx-auto glass-card p-4 md:p-8 lg:p-12">
          <main>
            <HeroSection siteCopy={siteCopy} socialLinks={socialLinks} />
            <ProjectsSection projects={projects} />
            <AboutMeSection skills={skills} />
            <MessageSection />
          </main>
        </div>
      </div>
      <Footer visitorCount={visitorCount} socialLinks={socialLinks} />
    </>
  );
}

