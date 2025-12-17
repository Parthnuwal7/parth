interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const defaultSkills = {
    'Backend & Systems': ['Python', 'FastAPI', 'Flask', 'REST API design', 'SQL', 'MongoDB', 'Supabase'],
    'Data & Analytics': ['SQL Analytics', 'Tableau', 'dbt', 'Data Quality Checks'],
    'Machine Learning & NLP': ['Applied Machine Learning', 'Supervised & Unsupervised Learning', 'Neural Networks', 'Natural Language Processing (NLP)'],
    'LLMs & AI Integrations': ['LLM-based system integrations', 'LangChain', 'Model integrations (Gemini, open-source transformers)'],
    'Automation & Testing': ['Playwright (web automation & data extraction)', 'n8n (workflow automation)'],
    'Engineering Tools': ['Git', 'GitHub', 'Web scraping (BeautifulSoup)'],
  };

  const displaySkills = Object.keys(skills).length > 0 ? skills : defaultSkills;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
          {Object.entries(displaySkills).map(([category, items]) => (
            <div key={category} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-accent">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
}
