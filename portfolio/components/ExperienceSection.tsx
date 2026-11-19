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
    role: 'AI Engineer (Contract)',
    company: 'AdAI Inc.',
    location: 'USA (Remote)',
    period: 'Sep 2026 – Nov 2026',
    bullets: [
      'Sole engineer at a two-person AI video-ad startup, working directly with the CEO. Shipped 6+ generative video-editing workflows end to end (text replacement, auto-subtitles, face and head swap, product replacement, timestamp-range edits and more) across React/Next.js, TypeScript orchestration and Python media services.',
      'Cut video text-render step time by 67% by removing redundant decode/encode passes and parallelizing compositing, with frame-hash checks to confirm unedited areas stayed untouched.',
      'Built "smart rendering": only the segments being edited are processed, and untouched segments are copied straight from the source. This avoids full re-encodes, so longer videos render faster and cheaper.',
      'Designed cost-safe orchestration for paid GPU and model-provider jobs: every job is recorded before submission, retries are blocked when charge status is uncertain, and runs resume safely after a crash. Parallelized GPU jobs on Modal for videos up to 120s.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'AtTheRate.ai',
    location: 'Singapore (Remote)',
    period: 'Mar 2026 – Aug 2026',
    bullets: [
      'Improved ARIA, the company’s marketing assistant, on a golden set spanning 7 aspects and 21 sub-aspects, cutting failures from 65% to 5% through better multi-aspect and multilingual query handling, model reasoning and platform awareness. Built an LLM-as-judge benchmark (300+ queries) with Langfuse traces.',
      'Owned agency/seller access control for Flipkart’s Saarthi Initiative, used by 30K sellers: connected-account permissions, access gating and revocation. Found and closed authorization gaps where revoked or read-only agencies could still modify campaigns through bulk APIs before the Flipkart handover, and shipped a production hotfix for an access issue.',
      'Built a LinkedIn Ads integration (OAuth connect, account picker, campaign CRUD, reporting, alerts, recommendations and sync), backed by a Redis scheduler–worker ingestion system designed for up to 1M jobs/day.',
    ],
  },
  {
    role: 'Business Intelligence Intern',
    company: 'Aspire FinTech Technologies',
    location: 'Singapore (Remote)',
    period: 'Aug 2024 – Apr 2025',
    bullets: [
      'Implemented 400+ dbt tests across analytical models, raising an internal data-quality score from 30 to 60+; maintained SQL models and reporting schemas.',
      'Worked with campaign managers to turn growth-analysis requirements into Tableau dashboards, iterating on stakeholder feedback.',
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
