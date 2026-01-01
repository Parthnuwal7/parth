'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as React from 'react';

interface ProjectDetails {
  id: string;
  title: string;
  githubUrl: string;
  liveUrl: string;
  problem: string;
  whatIBuilt: string[];
  architecture: string;
  hardProblems: string[];
  tradeoffs: string[];
  improvements: string[];
  deepDive: string;
  demoUrl: string;
  tags: string[];
  uiSnapshots: string[];
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSnapshot, setCurrentSnapshot] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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

  const nextSnapshot = () => {
    setCurrentSnapshot((prev) => (prev + 1) % project.uiSnapshots.length);
  };

  const prevSnapshot = () => {
    setCurrentSnapshot((prev) => (prev - 1 + project.uiSnapshots.length) % project.uiSnapshots.length);
  };

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/#projects" className="text-accent hover:text-foreground mb-4 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <div className="flex gap-4 flex-wrap">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-4 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:bg-accent/20 transition-all inline-flex items-center gap-2"
                onClick={() => {
                  fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      event: `project_github_click:${project.id}`,
                      visitorId: localStorage.getItem('portfolio_visitor_id'),
                      referrer: document.referrer || 'Direct'
                    }),
                  }).catch(console.error);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-4 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:bg-accent/20 transition-all inline-flex items-center gap-2"
                onClick={() => {
                  fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      event: `project_live_click:${project.id}`,
                      visitorId: localStorage.getItem('portfolio_visitor_id'),
                      referrer: document.referrer || 'Direct'
                    }),
                  }).catch(console.error);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Continuous Content Section */}
        <div className="glass-card p-8 space-y-12">

          {/* Architecture */}
          {project.architecture && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
              <div
                className="bg-accent/5 p-4 rounded-lg overflow-hidden cursor-zoom-in max-h-80 flex items-center justify-center"
                onClick={() => setLightboxImage(project.architecture)}
              >
                <img
                  src={project.architecture}
                  alt="Architecture diagram"
                  className="max-h-72 max-w-full object-contain rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
              <p className="text-xs text-center text-accent/60 mt-2">Click to enlarge</p>
            </section>
          )}

          {/* Problem */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Problem</h2>
            <p className="leading-relaxed text-foreground/80">{project.problem}</p>
          </section>

          {/* What I Built */}
          {project.whatIBuilt.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">What I Built</h2>
              <ul className="space-y-2">
                {project.whatIBuilt.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* UI Snapshots Carousel */}
          {project.uiSnapshots.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">UI Snapshots</h2>
              <div className="relative">
                {/* Main Image */}
                <div className="bg-accent/5 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                  <img
                    src={project.uiSnapshots[currentSnapshot]}
                    alt={`UI Snapshot ${currentSnapshot + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Navigation Arrows */}
                {project.uiSnapshots.length > 1 && (
                  <>
                    <button
                      onClick={prevSnapshot}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      aria-label="Previous snapshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={nextSnapshot}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      aria-label="Next snapshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {project.uiSnapshots.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {project.uiSnapshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSnapshot(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentSnapshot ? 'bg-accent' : 'bg-accent/30'
                          }`}
                        aria-label={`Go to snapshot ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Hard Problems Solved */}
          {project.hardProblems.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hard Problems Solved</h2>
              <ul className="space-y-3">
                {project.hardProblems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">▸</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Trade-offs */}
          {project.tradeoffs.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Trade-offs</h2>
              <ul className="space-y-3">
                {project.tradeoffs.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">⚖</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ===== COMMENTED OUT SECTIONS (for future use) ===== */}

          {/* What I'd Improve Next */}
          {/* 
          {project.improvements.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">What I'd Improve Next</h2>
              <ul className="space-y-2">
                {project.improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">→</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          */}

          {/* Deep Dive */}
          {/*
          {project.deepDive && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Deep Dive</h2>
              <p className="whitespace-pre-wrap text-foreground/80">{project.deepDive}</p>
            </section>
          )}
          */}

        </div>

        {/* Tags for automated parsers */}
        {project.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-foreground/60 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                  itemProp="keywords"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent text-3xl font-bold z-10"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Architecture diagram enlarged"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
