interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const defaultSkills = {
    'Backend': ['FastAPI', 'Flask', 'PostgreSQL', 'MongoDB', 'Redis'],
    'Data / AI': ['RAG systems', 'NL → SQL', 'Embeddings & evaluation'],
    'Engineering': ['API design', 'Async execution', 'Schema modeling'],
  };

  const displaySkills = Object.keys(skills).length > 0 ? skills : defaultSkills;

  return (
    <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(displaySkills).map(([category, items]) => (
            <div key={category} className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
  );
}
