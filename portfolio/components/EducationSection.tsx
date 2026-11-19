export default function EducationSection() {
  return (
    <section id="education" className="py-8 md:py-12 px-0 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Education</h2>

        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">B.Tech in Computer Science (Data Science)</h3>
              <p className="text-accent text-base">
                Swami Keshvanand Institute of Technology (SKIT) <span className="opacity-70">· Jaipur</span>
              </p>
            </div>
            <div className="text-sm text-accent md:text-right whitespace-nowrap">
              <p>Jul 2022 – Apr 2026</p>
              <p>CGPA 9.45 / 10</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
