import SkillsSection from './SkillsSection';
import ExtraCurricularsSection from './ExtraCurricularsSection';

interface AboutMeSectionProps {
  skills: Record<string, string[]>;
}

export default function AboutMeSection({ skills }: AboutMeSectionProps) {
  return (
    <section id="about" className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-0 md:px-10">
        <div className="space-y-12 md:space-y-16">
          {/* Skills subsection */}
          <div className="py-4 md:py-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Skills</h3>
            <SkillsSection skills={skills} />
          </div>
          
          {/* Other Interests subsection */}
          <div className="py-4 md:py-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Other Interests</h3>
            <ExtraCurricularsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
