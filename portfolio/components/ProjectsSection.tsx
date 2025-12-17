'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';

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
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  
  // Duplicate projects for infinite scroll effect
  const displayProjects = sortedProjects.length > 0 ? [...sortedProjects, ...sortedProjects] : [];

  const resumeAutoScroll = () => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 300); // Resume after 300ms of no interaction
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setIsDragging(true);
    startX.current = e.touches[0].pageX;
    if (scrollRef.current) {
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX;
    const walk = (startX.current - x) * 2; // Multiply for faster scroll
    scrollRef.current.scrollLeft = scrollLeft.current + walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    resumeAutoScroll();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    setIsDragging(true);
    startX.current = e.pageX;
    if (scrollRef.current) {
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX.current - x) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current + walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    resumeAutoScroll();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      resumeAutoScroll();
    } else {
      // Just hovering without dragging, resume immediately
      resumeAutoScroll();
    }
  };

  return (
    <section id="projects" className="py-12 md:py-20 px-0 md:px-10">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Projects</h2>

        <div 
          ref={scrollRef}
          className="overflow-x-scroll overflow-y-hidden py-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => {
            if (resumeTimeout.current) {
              clearTimeout(resumeTimeout.current);
            }
            if (!isDragging) setIsPaused(true);
          }}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div 
            className={`flex gap-5 px-5 ${sortedProjects.length > 0 ? 'animate-scroll' : ''} ${isPaused ? 'paused' : ''}`} 
            style={{ 
              '--num-cards': sortedProjects.length,
              width: 'max-content' 
            } as React.CSSProperties}
          >
          {displayProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="glass-card p-8 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer flex-shrink-0 w-80 h-120"
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
              <div className="flex gap-25">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card px-4 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className="glass-card px-4 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all"
                >
                  Details
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
