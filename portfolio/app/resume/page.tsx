import type { Metadata } from 'next';
import Link from 'next/link';
import ResumeRequestForm from '@/components/ResumeRequestForm';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Resume | Parth Nuwal',
  description: 'Resume of Parth Nuwal — AI engineer building LLM-powered systems.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen px-4 md:px-6 py-6 md:py-10 bg-neutral-200 dark:bg-neutral-900">
      <ThemeToggle />
      <div className="max-w-[210mm] lg:max-w-[240mm] xl:max-w-[260mm] mx-auto">
        <div className="mb-4 flex justify-between items-center text-sm print:hidden">
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
            ← Back to portfolio
          </Link>
          <a
            href="#request"
            className="px-3 py-1.5 rounded border border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 transition-all"
          >
            Leave me a message
          </a>
        </div>

        <article className="resume-sheet mx-auto shadow-2xl w-full md:w-[210mm] lg:w-[240mm] xl:w-[260mm] md:min-h-[297mm] lg:min-h-[339mm] xl:min-h-[367mm] p-8 md:p-[18mm] lg:p-[20mm] xl:p-[22mm] space-y-4 text-[10.5pt] lg:text-[11.5pt] xl:text-[12pt] leading-snug font-serif">
          <header className="text-center border-b border-accent/20 pb-4">
            <h1 className="text-3xl md:text-4xl font-bold">Parth Nuwal</h1>
            <p className="mt-2 text-sm text-accent">
              <a
                href="https://www.linkedin.com/in/parth-nuwal-9a81b9226/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                LinkedIn
              </a>{' '}
              ·{' '}
              <a
                href="https://github.com/Parthnuwal7"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                GitHub
              </a>{' '}
              ·{' '}
              <a
                href="https://parth-nuwal-dev.vercel.app/"
                className="underline hover:text-foreground"
              >
                Portfolio
              </a>{' '}
              ·{' '}
              <a
                href="mailto:parthnuwal7@gnail.com"
                className="underline hover:text-foreground"
              >
                Email
              </a>
            </p>
          </header>

          <section>
            <h2 className="text-lg font-bold border-b border-accent/20 pb-1 mb-2">Summary</h2>
            <p>        
AI Engineer focused on LLM applications, agent systems and the backend infrastructure that makes them reliable. Built
X-101, a conversational analytics platform that converts natural language into deterministic dashboards, statistical models
and ReAct-driven insights. Comfortable owning systems end-to-end– from prompt design to schema modeling to production
deployment.
          </p>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-accent/20 pb-1 mb-2">Experience</h2>

            <div className="mb-4">
              <div className="flex flex-wrap justify-between gap-2">
                <strong>Software Engineer Intern</strong>
                <span className="text-accent">Mar 2026 — Present</span>
              </div>
              <p className="italic">AtTheRate.ai, Singapore (Remote)</p>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                <li>
                  Parallelized large-scale campaign reporting pipelines over BullMQ-based async processing, <strong>reducing query latency by 30%</strong> on high-volume datasets.
                </li>
                <li>
                  Built backend logic for campaign recommendation systems, including bid and budget adjustments at the placement level (Flipkart platform integration).
                </li>
                <li>
                  Contributed to system design for <strong>Flipkart onboarding (50K+ platform users)</strong>, including white-labelling architecture and access control across agency vs client permissions.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap justify-between gap-2">
                <strong>Business Intelligence Intern</strong>
                <span className="text-accent">Aug 2024 — Apr 2025</span>
              </div>
              <p className="italic">
                Aspire FinTech Technologies, Singapore (Remote) ·{' '}
                <a
                  href="https://drive.google.com/file/d/1EnjpCSNyrH1c1jdvFljgUyChRaNxD6OL/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  LOR
                </a>
              </p>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                <li>
                  Implemented <strong>400+ dbt tests</strong> (freshness, completeness, consistency, nullability, logic checks) across 30+ core tables, raising data quality score from <strong>30 → 60+</strong> and making downstream analytics demonstrably trustworthy.
                </li>
                <li>
                  Performed SQL-based data model updates and schema changes, collaborating with stakeholders to align transformations with how the business actually used the data.
                </li>
                <li>
                  Developed Tableau dashboards on top of the cleaned data layer for campaign performance tracking and business reporting used by growth teams.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-accent/20 pb-1 mb-2">Projects</h2>

            <div className="mb-4">
              <div className="flex flex-wrap justify-between gap-2">
                <strong>X-101: Deterministic Analytics Platform with NL Interface</strong>
                <span className="text-accent">
                  <a href="https://x101-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Link</a>
                  {' · '}
                  <a href="https://github.com/Parthnuwal7/x101" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GitHub</a>
                </span>
              </div>
              <p className="italic text-sm">Python, FastAPI, DuckDB, NetworkX, scikit-learn, statsmodels, LiteLLM, Next.js, GCP</p>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                <li>
                  Built an end-to-end system where users upload CSVs and ask plain-English questions, returning dashboards and statistical model outputs backed by <strong>parameterized SQL on DuckDB</strong> — all execution, joins, and aggregation handled by deterministic Python, never the LLM.
                </li>
                <li>
                  Architected around the principle <em>&ldquo;LLMs do language; code does data&rdquo;</em> — the LLM plans the question, but every SQL query, join, and statistical computation runs through a typed Python execution layer with full schema validation.
                </li>
                <li>
                  Built a <strong>NetworkX-backed semantic graph</strong> mapping business concepts to schema columns, with BFS path-finding to inject verified column mappings into the planner — eliminating hallucination on schema references.
                </li>
                <li>
                  Achieved <strong>replay-deterministic execution</strong> via JSONL pipeline logging and a deterministic validator (PASS / WARN / FAIL); validated through a <strong>400+ case modular test suite</strong> across pipeline stages.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap justify-between gap-2">
                <strong>Insight: NLP Pipeline for Review Analytics</strong>
                <span className="text-accent">
                  <a href="https://insights123.streamlit.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Link</a>
                  {' · '}
                  <a href="https://github.com/Parthnuwal7/insight" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GitHub</a>
                </span>
              </div>
              <p className="italic text-sm">FastAPI, Redis, MongoDB, PyABSA, Hugging Face</p>
              <ul className="list-disc list-outside ml-5 mt-1 space-y-1">
                <li>
                  Built a modular NLP pipeline using aspect-based sentiment analysis to extract sentiment, aspects, and intent from review datasets, producing structured outputs for downstream dashboards.
                </li>
                <li>
                  Deployed scalable backend with Redis-based rate limiting and a monitoring dashboard for tracking system usage and performance.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-accent/20 pb-1 mb-2">Skills</h2>
            <dl className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
              <dt className="font-semibold">Data &amp; Storage</dt>
              <dd>SQL, DuckDB, dbt, MongoDB, Pinecone, Chroma, NetworkX</dd>
              <dt className="font-semibold">Backend &amp; Pipelines</dt>
              <dd>Python, FastAPI, REST APIs, Async Processing, BullMQ, Redis</dd>
              <dt className="font-semibold">ML &amp; Data Science</dt>
              <dd>PyTorch, scikit-learn, statsmodels, scipy, pandas, NumPy</dd>
              <dt className="font-semibold">Infra &amp; Cloud</dt>
              <dd>GCP, Docker, Git, n8n</dd>
              <dt className="font-semibold">LLM &amp; AI Systems</dt>
              <dd>LLaMA 3, Gemini, RAG, Multi-Agent Systems, ReAct, LLM Evals, Langfuse</dd>
              <dt className="font-semibold">AI Frameworks</dt>
              <dd>LangChain, Pydantic, Hugging Face, Google ADK</dd>
            </dl>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-accent/20 pb-1 mb-2">Education</h2>
            <div className="flex flex-wrap justify-between gap-2">
              <strong>B.Tech in Computer Science (Data Science)</strong>
              <span className="text-accent">Jul 2022 — Apr 2026</span>
            </div>
            <p>Swami Keshvanand Institute of Technology (SKIT), Jaipur · CGPA: 9.45 / 10.00</p>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-accent/20 pb-1 mb-2">Signals</h2>
            <ul className="list-disc list-outside ml-5 space-y-1">
              <li>Finalist — Smart India Hackathon (SIH) 2025</li>
              <li>Participant — Amazon ML Summer School 2024</li>
            </ul>
          </section>
        </article>

        <section id="request" className="mt-10 glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold mb-2">Leave me a message</h2>
          <p className="text-sm text-accent mb-4">
            Got a role, a project, or just want to say hi? Drop a note below and I&apos;ll get back to you.
          </p>
          <ResumeRequestForm />
        </section>
      </div>
    </main>
  );
}
