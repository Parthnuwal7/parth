interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

interface SkillGroup {
  category: string;
  items: string[];
  usedIn?: string;
}

// A short, role-focused list backed by real work. The exhaustive list lives in public/llms.txt.
const defaultSkills: SkillGroup[] = [
  {
    category: 'Backend & Systems',
    items: ['Python', 'TypeScript', 'FastAPI', 'Flask', 'Redis', 'Job Queues & Workers', 'REST APIs'],
    // usedIn: 'LinkedIn Ads ingestion (designed for 1M jobs/day), cost-safe GPU orchestration at AdAI',
  },
  {
    category: 'Data',
    items: ['SQL', 'MongoDB', 'PostgreSQL', 'dbt', 'Supabase'],
    // usedIn: '400+ dbt tests at Aspire, DuckDB in X-101, PostgreSQL in Snappy',
  },
  {
    category: 'Agents & LLM Systems',
    items: ['LLM Agents', 'Multi-Agent Systems', 'Google ADK', 'LangChain', 'RAG', 'LLM Evals', 'Langfuse'],
    // usedIn: 'ARIA eval loop at AtTheRate.ai (failures 65% → 5%), X-101 analytics agent',
  },
  {
    category: 'Infra & Deployment',
    items: ['GCP (Cloud Run)', 'Modal (GPU jobs)', 'Docker', 'Vercel'],
    //usedIn: 'Video GPU pipelines on Modal, Snappy on Cloud Run + Vercel',
  },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const groups: SkillGroup[] =
    Object.keys(skills).length > 0
      ? Object.entries(skills).map(([category, items]) => ({ category, items }))
      : defaultSkills;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {groups.map(({ category, items, usedIn }) => (
        <div key={category} className="glass-card p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-accent">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
          {usedIn && (
            <p className="mt-4 pt-3 border-t border-accent/15 text-xs md:text-sm text-accent">
              <span className="font-medium">Used in:</span> {usedIn}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
