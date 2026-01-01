'use client';

import Link from 'next/link';
import { useRef, useState, useEffect, useCallback } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  order: number;
  liveUrl: string;
  specialTag: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 (first real card in cloned array)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const projectCount = sortedProjects.length;

  // Create infinite scroll array: [last, ...all, first]
  // Index 0 = clone of last, Index 1 to projectCount = real cards, Index projectCount+1 = clone of first
  const displayProjects = projectCount > 0
    ? [sortedProjects[projectCount - 1], ...sortedProjects, sortedProjects[0]]
    : [];

  // Card width + gap for scroll amount
  const cardWidth = 320 + 20; // w-80 = 320px, gap-5 = 20px

  // Scroll to center a specific card index
  const scrollToIndex = useCallback((index: number, smooth: boolean = true) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      // Scroll position to center the card
      const scrollPosition = (index * cardWidth) + 20 - (containerWidth / 2) + 160;
      scrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: smooth ? 'smooth' : 'instant'
      });
    }
  }, [cardWidth]);

  // Initialize: scroll to first real card on mount
  useEffect(() => {
    if (projectCount > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToIndex(1, false);
      }, 100);
    }
  }, [projectCount, scrollToIndex]);

  // Track if we're in the middle of a wrap-around
  const isWrapping = useRef(false);
  const wrapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When currentIndex changes, scroll to center that card and handle wrapping
  useEffect(() => {
    if (projectCount === 0) return;

    // Clear any pending wrap timeout
    if (wrapTimeoutRef.current) {
      clearTimeout(wrapTimeoutRef.current);
    }

    // Reset isWrapping if index is in valid range
    if (currentIndex >= 1 && currentIndex <= projectCount) {
      isWrapping.current = false;
    }

    // Skip scroll if we're in the middle of wrapping
    if (isWrapping.current) return;

    // Normalize index if it went too far out of bounds (rapid clicking)
    if (currentIndex < 0) {
      setCurrentIndex(projectCount);
      return;
    }
    if (currentIndex > projectCount + 1) {
      setCurrentIndex(1);
      return;
    }

    // First, scroll to the target (could be a clone)
    scrollToIndex(currentIndex);

    // Handle wrap-around after scroll animation completes
    wrapTimeoutRef.current = setTimeout(() => {
      // If we scrolled to the clone at the beginning (index 0), instantly jump to last real card
      if (currentIndex === 0) {
        isWrapping.current = true;
        scrollToIndex(projectCount, false);
        setCurrentIndex(projectCount);
        setTimeout(() => { isWrapping.current = false; }, 50);
      }
      // If we scrolled to the clone at the end (index projectCount+1), instantly jump to first real card
      else if (currentIndex === projectCount + 1) {
        isWrapping.current = true;
        scrollToIndex(1, false);
        setCurrentIndex(1);
        setTimeout(() => { isWrapping.current = false; }, 50);
      }
    }, 400);

    return () => {
      if (wrapTimeoutRef.current) {
        clearTimeout(wrapTimeoutRef.current);
      }
    };
  }, [currentIndex, projectCount, scrollToIndex]);

  // Auto-slideshow: advance to next card every 4 seconds
  useEffect(() => {
    if (isPaused || projectCount === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, projectCount]);

  // Resume slideshow after inactivity
  const resumeSlideshow = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1000); // Resume after 1 second of no interaction
  }, []);

  // Pause slideshow
  const pauseSlideshow = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  // Left arrow: go to previous card
  const scrollLeftHandler = () => {
    pauseSlideshow();
    isWrapping.current = false; // Reset wrap state on click
    setCurrentIndex(prev => {
      const next = prev - 1;
      // Clamp to valid range including clones
      return Math.max(0, next);
    });
    resumeSlideshow();
  };

  // Right arrow: go to next card
  const scrollRightHandler = () => {
    pauseSlideshow();
    isWrapping.current = false; // Reset wrap state on click
    setCurrentIndex(prev => {
      const next = prev + 1;
      // Clamp to valid range including clones
      return Math.min(projectCount + 1, next);
    });
    resumeSlideshow();
  };

  // Get the "real" index for highlighting (1 to projectCount are real cards)
  const getRealIndex = (index: number) => {
    if (index === 0) return projectCount; // Clone of last
    if (index === projectCount + 1) return 1; // Clone of first
    return index;
  };

  return (
    <section id="projects" className="py-12 md:py-20 px-0 md:px-10 bg-gray-200 dark:bg-black/90">
      <div className="mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center dark:text-white">Projects</h2>

        {/* Carousel container with arrows on sides */}
        <div className="relative">
          {/* Left blur gradient overlay */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)'
            }}
          />

          {/* Right blur gradient overlay */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
            }}
          />

          {/* Left Arrow */}
          <button
            onClick={scrollLeftHandler}
            className="glass-card p-2 md:p-3 hover:scale-110 transition-transform"
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20
            }}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRightHandler}
            className="glass-card p-2 md:p-3 hover:scale-110 transition-transform"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20
            }}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Scrollable carousel with snap */}
          <div
            ref={scrollRef}
            className="overflow-x-scroll overflow-y-hidden py-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={pauseSlideshow}
            onMouseLeave={resumeSlideshow}
            onTouchStart={pauseSlideshow}
            onTouchEnd={resumeSlideshow}
          >
            <div
              className="flex gap-5 px-5 items-center"
              style={{ width: 'max-content' }}
            >
              {displayProjects.map((project, index) => {
                // Determine if this card should be focused
                // Handle clones: when currentIndex is at clone, highlight both clone and corresponding real card
                const isFocused =
                  index === currentIndex ||
                  // If we're at clone at end (projectCount+1), also highlight first real card (index 1)
                  (currentIndex === projectCount + 1 && index === 1) ||
                  // If we're at clone at start (0), also highlight last real card (index projectCount)
                  (currentIndex === 0 && index === projectCount) ||
                  // Vice versa: if we're at first real card, also highlight clone at end
                  (currentIndex === 1 && index === projectCount + 1) ||
                  // If we're at last real card, also highlight clone at start
                  (currentIndex === projectCount && index === 0);

                return (
                  <div
                    key={`${project.id}-${index}`}
                    className={`glass-card p-8 transition-all duration-300 cursor-pointer flex-shrink-0 snap-center w-80
                      ${isFocused
                        ? 'md:w-96 md:scale-105 shadow-2xl border-2 border-accent z-10'
                        : 'md:w-80 md:scale-85 opacity-50 hover:opacity-70 border border-accent/30'
                      }`}
                    style={{ height: '480px' }}
                  >
                    {/* Special Tag */}
                    {project.specialTag && (() => {
                      const tag = project.specialTag.toLowerCase();
                      const isLive = tag.includes('deployed') || tag.includes('live');
                      const isPython = tag.includes('python') || tag.includes('library');

                      let colorClass = 'bg-accent/20 text-accent border-accent/40'; // default
                      if (isLive) {
                        colorClass = 'bg-green-500/20 text-green-400 border-green-500/40';
                      } else if (isPython) {
                        colorClass = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
                      }

                      return (
                        <div className="mb-3">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${colorClass}`}>
                            {project.specialTag}
                          </span>
                        </div>
                      );
                    })()}

                    {/* Image */}
                    <div className={`w-full ${project.specialTag ? 'h-40' : 'h-48'} bg-accent/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden`}>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-contain"
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
                    <div className="flex justify-between items-center gap-2 mt-auto">
                      {/* Left side - GitHub */}
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card px-3 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all inline-flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
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
                            className="glass-card px-3 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all inline-flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Link
                          </a>
                        )}
                      </div>
                      {/* Right side - Details */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="glass-card px-3 py-2 text-sm font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
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
