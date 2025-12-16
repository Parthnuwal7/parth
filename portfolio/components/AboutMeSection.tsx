import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ExtraCurricularsSection from './ExtraCurricularsSection';

interface AboutMeSectionProps {
  skills: Record<string, string[]>;
}

export default function AboutMeSection({ skills }: AboutMeSectionProps) {
  return (
    <section id="about" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
        
        <div className="space-y-16">
          <EducationSection />
          <ExperienceSection />
          
          {/* Skills subsection */}
          <div className="py-8">
            <h3 className="text-3xl font-bold mb-8">Skills</h3>
            <SkillsSection skills={skills} />
          </div>
          
          {/* Extra-curriculars subsection */}
          <div className="py-8">
            <h3 className="text-3xl font-bold mb-8">Extra-Curriculars</h3>
            <ExtraCurricularsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
