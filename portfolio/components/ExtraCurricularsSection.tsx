import Image from 'next/image';

export default function ExtraCurricularsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Photography</h3>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/infinite.pixelz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-3 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all flex items-center gap-2"
                >
                  <Image src="/insta.png" alt="Instagram" width={20} height={20} className="w-5 h-5" />
                </a>
                <a
                  href="https://infinite-pixelz.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-3 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all"
                >
                  🌐
                </a>
              </div>
            </div>
            <p className="text-accent mb-3 text-sm">Street, portrait and product photography.</p>
            <p className="text-sm leading-relaxed">
              Built a professional photography portfolio website from scratch to showcase my work, alongside maintaining an active Instagram presence. Worked on client shoots, collaborated with artists and served as student coordinator of the college photography club for two years—organizing workshops, competitions and photowalks.
            </p>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-4">Badminton</h3>
            <p className="text-accent mb-3 text-sm">Competitive player with district-level representation at multiple state tournaments (U13 - U15).</p>
            <p className="text-sm leading-relaxed">
              Led and won tournaments for the college team, including Arya Cup (singles) and RTU tournaments.
            </p>
          </div>
    </div>
  );
}
