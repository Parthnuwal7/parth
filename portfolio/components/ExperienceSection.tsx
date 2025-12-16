export default function ExperienceSection() {
  return (
    <div className="py-8">
      <h3 className="text-3xl font-bold mb-8">Experience</h3>
      
      <div className="space-y-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-xl font-semibold">Backend Engineer</h4>
              <p className="text-accent">Company Name</p>
            </div>
            <span className="text-sm text-accent">2023 - Present</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Built scalable APIs serving millions of requests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Implemented RAG systems with measurable accuracy improvements</span>
            </li>
          </ul>
        </div>
        
        {/* Add more experience items as needed */}
      </div>
    </div>
  );
}
