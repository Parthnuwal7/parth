export default function EducationSection() {
  return (
    <div className="py-8">
      <h3 className="text-3xl font-bold mb-8">Education</h3>
      
      <div className="space-y-6">
        <div className="glass-card p-6">
          <h4 className="text-xl font-semibold mb-2">Bachelor of Technology</h4>
          <p className="text-accent mb-2">Swami Keshvanand Institute of Technology, Jaipur • 2022-26</p>
          <p className="text-sm">Computer Science & Engineering (Data Science)</p>
        </div>
        <div className="glass-card p-6">
          <h4 className="text-xl font-semibold mb-2">Senior Secondary (Class XII)</h4>
          <p className="text-accent mb-2">Central Board of Secondary Education (CBSE) • 2021-22</p>
          <p className="text-sm">Science with Mathematics</p>
        </div>
         <div className="glass-card p-6">
          <h4 className="text-xl font-semibold mb-2">Secondary (Class X)</h4>
          <p className="text-accent mb-2">Central Board of Secondary Education (CBSE) • 2019-20</p>
          <p className="text-sm">General class 10th</p>
        </div>
        {/* Add more education items as needed */}
      </div>
    </div>
  );
}
