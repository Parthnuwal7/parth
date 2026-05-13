interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  lorUrl?: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Software Engineer Intern',
    company: 'AtTheRate.ai',
    location: 'Singapore (Remote)',
    period: 'Mar 2026 – Present',
    bullets: [
      'Parallelized large-scale campaign reporting pipelines over BullMQ-based async processing, reducing query latency by 30% on high-volume datasets.',
      'Built backend logic for campaign recommendation systems, including bid and budget adjustments at the placement level (Flipkart platform integration).',
      'Contributed to system design for Flipkart onboarding (50K+ platform users), including white-labelling architecture and access control across agency vs client permissions.',
    ],
  },
  {
    role: 'Business Intelligence Intern',
    company: 'Aspire FinTech Technologies',
    location: 'Singapore (Remote)',
    period: 'Aug 2024 – Apr 2025',
    bullets: [
      'Implemented 400+ dbt tests (freshness, completeness, consistency, nullability, logic checks) across 30+ core tables, raising data quality score from 30 → 60+ and making downstream analytics demonstrably trustworthy.',
      'Performed SQL-based data model updates and schema changes, collaborating with stakeholders to align transformations with how the business actually used the data.',
      'Developed Tableau dashboards on top of the cleaned data layer for campaign performance tracking and business reporting used by growth teams.',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-20 px-0 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div key={i} className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">{exp.role}</h3>
                  <p className="text-accent text-base">
                    {exp.company} <span className="opacity-70">· {exp.location}</span>
                  </p>
                </div>
                <span className="text-sm text-accent whitespace-nowrap">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm md:text-base leading-relaxed">
                    <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
