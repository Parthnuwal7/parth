'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProjectDetails {
  id: string;
  problem: string;
  whatIBuilt: string[];
  architecture: string;
  hardProblems: string[];
  tradeoffs: string[];
  improvements: string[];
  deepDive: string;
  demoUrl: string;
  tags: string[];
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeepDive, setShowDeepDive] = useState(false);

  // Use React.use() to unwrap the params promise
  const unwrappedParams = React.use(params);

  React.useEffect(() => {
    fetch(`/api/projects/${unwrappedParams.id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-accent">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link href="/#projects" className="text-accent hover:text-foreground">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/#projects" className="text-accent hover:text-foreground mb-4 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold mb-4">{unwrappedParams.id}</h1>
          
          <div className="flex gap-4">
            <a href={`https://github.com/${unwrappedParams.id}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground">
              GitHub →
            </a>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground">
                Demo →
              </a>
            )}
          </div>
        </div>

        {/* Problem */}
        <section className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Problem</h2>
          <p className="leading-relaxed">{project.problem}</p>
        </section>

        {/* What I Built */}
        <section className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">What I Built</h2>
          <ul className="space-y-2">
            {project.whatIBuilt.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture */}
        {project.architecture && (
          <section className="glass-card p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
            <div className="bg-accent/5 p-6 rounded-lg">
              <img src={project.architecture} alt="Architecture diagram" className="w-full" />
            </div>
          </section>
        )}

        {/* Hard Problems Solved */}
        <section className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Hard Problems Solved</h2>
          <ul className="space-y-3">
            {project.hardProblems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Trade-offs */}
        <section className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Trade-offs</h2>
          <ul className="space-y-3">
            {project.tradeoffs.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent mt-1">⚖</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What I'd Improve Next */}
        <section className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">What I'd Improve Next</h2>
          <ul className="space-y-2">
            {project.improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Deep Dive (Collapsible) */}
        {project.deepDive && (
          <section className="glass-card p-8">
            <button
              onClick={() => setShowDeepDive(!showDeepDive)}
              className="w-full text-left flex justify-between items-center"
            >
              <h2 className="text-2xl font-semibold">Deep Dive</h2>
              <span className="text-2xl">{showDeepDive ? '−' : '+'}</span>
            </button>
            {showDeepDive && (
              <div className="mt-4 prose max-w-none">
                <p className="whitespace-pre-wrap">{project.deepDive}</p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

// Add React import for use() hook
import * as React from 'react';
