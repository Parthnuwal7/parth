'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  order: number;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

        <div 
          className="overflow-x-auto scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-6 ${!isPaused && sortedProjects.length > 3 ? 'animate-scroll' : ''}`} style={{ width: 'max-content' }}>
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-6 hover:shadow-xl transition-all cursor-pointer flex-shrink-0 w-80"
            >
              {/* Image */}
              <div className="w-full h-48 bg-accent/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

              {/* Description */}
              <p className="text-accent text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-accent/10 text-accent"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs px-2 py-1 text-accent">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:text-foreground transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub →
                  </a>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className="text-sm text-accent hover:text-foreground transition-colors"
                >
                  Details →
                </Link>
              </div>
            </div>
          ))}
          </div>
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center text-accent py-12">
            <p>No projects yet. Add some via the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
}
