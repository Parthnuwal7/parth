'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [project, setProject] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    techStack: '',
    githubUrl: '',
    order: 0,
  });
  const [details, setDetails] = useState({
    problem: '',
    whatIBuilt: '',
    architecture: '',
    hardProblems: '',
    tradeoffs: '',
    improvements: '',
    deepDive: '',
    demoUrl: '',
    tags: '',
  });
  const [status, setStatus] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      setAuthenticated(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          project: {
            ...project,
            techStack: project.techStack.split(',').map(s => s.trim()),
          },
          details: {
            id: project.id,
            ...details,
            whatIBuilt: details.whatIBuilt.split('|').map(s => s.trim()),
            hardProblems: details.hardProblems.split('|').map(s => s.trim()),
            tradeoffs: details.tradeoffs.split('|').map(s => s.trim()),
            improvements: details.improvements.split('|').map(s => s.trim()),
            tags: details.tags.split(',').map(s => s.trim()),
          },
        }),
      });

      if (response.ok) {
        setStatus('Project saved successfully!');
        setTimeout(() => {
          router.push('/#projects');
        }, 2000);
      } else {
        setStatus('Failed to save project');
      }
    } catch (error) {
      setStatus('Error saving project');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleAuth} className="glass-card p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
          />
          <button
            type="submit"
            className="w-full glass-card px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-all"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add/Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Card Info */}
          <div className="glass-card p-8 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Project Card</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">ID (unique)</label>
              <input
                type="text"
                required
                value={project.id}
                onChange={(e) => setProject({ ...project, id: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                required
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={project.image}
                onChange={(e) => setProject({ ...project, image: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated)</label>
              <input
                type="text"
                required
                value={project.techStack}
                onChange={(e) => setProject({ ...project, techStack: e.target.value })}
                placeholder="Python, FastAPI, PostgreSQL"
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="text"
                value={project.githubUrl}
                onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input
                type="number"
                value={project.order}
                onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="glass-card p-8 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Project Details</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Problem (3-4 lines)</label>
              <textarea
                rows={3}
                value={details.problem}
                onChange={(e) => setDetails({ ...details, problem: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What I Built (pipe-separated bullets)</label>
              <textarea
                rows={3}
                value={details.whatIBuilt}
                onChange={(e) => setDetails({ ...details, whatIBuilt: e.target.value })}
                placeholder="Built API | Implemented caching | Designed schema"
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Architecture Diagram URL</label>
              <input
                type="text"
                value={details.architecture}
                onChange={(e) => setDetails({ ...details, architecture: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hard Problems (pipe-separated)</label>
              <textarea
                rows={3}
                value={details.hardProblems}
                onChange={(e) => setDetails({ ...details, hardProblems: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trade-offs (pipe-separated)</label>
              <textarea
                rows={3}
                value={details.tradeoffs}
                onChange={(e) => setDetails({ ...details, tradeoffs: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Improvements (pipe-separated)</label>
              <textarea
                rows={3}
                value={details.improvements}
                onChange={(e) => setDetails({ ...details, improvements: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Deep Dive (optional)</label>
              <textarea
                rows={5}
                value={details.deepDive}
                onChange={(e) => setDetails({ ...details, deepDive: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Demo URL</label>
              <input
                type="text"
                value={details.demoUrl}
                onChange={(e) => setDetails({ ...details, demoUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={details.tags}
                onChange={(e) => setDetails({ ...details, tags: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full glass-card px-6 py-4 font-medium hover:bg-foreground hover:text-background transition-all"
          >
            Save Project
          </button>

          {status && (
            <p className="text-center text-accent">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}
