export default function ExperienceSection() {
  return (
    <div className="py-8">
      <h3 className="text-3xl font-bold mb-8">Experience</h3>
      
      <div className="space-y-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-xl font-semibold">Business Intelligence Intern</h4>
              <p className="text-accent">Aspire FinTech Technologies Pvt Ltd, SG</p>
            </div>
            <span className="text-sm text-accent">Aug, 24 - May, 25</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-1">
              <span className="text-accent mt-1">•</span>
              <span>Collaborated with growth team to analyze business data and generate actionable insights on referral campaigns</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-accent mt-1">•</span>
              <span>Helped design and implement data visualization dashboards to track key performance metrics</span>
            </li>
          </ul>
        </div>
        {/* Add more experience items as needed */}
      </div>
    </div>
  );
}
