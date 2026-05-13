interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const defaultSkills = {
    'Data & Storage': ['SQL', 'DuckDB', 'dbt', 'MongoDB', 'Pinecone', 'Chroma', 'NetworkX'],
    'Backend & Pipelines': ['Python', 'FastAPI', 'REST APIs', 'Async Processing', 'BullMQ', 'Redis'],
    'ML & Data Science': ['PyTorch', 'scikit-learn', 'statsmodels', 'scipy', 'pandas', 'NumPy'],
    'Infra & Cloud': ['GCP', 'Docker', 'Git', 'n8n'],
    'LLM & AI Systems': ['LLaMA 3', 'Gemini', 'RAG', 'Multi-Agent Systems', 'ReAct', 'LLM Evals', 'Langfuse'],
    'AI Frameworks': ['LangChain', 'Pydantic', 'Hugging Face', 'Google ADK'],
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
