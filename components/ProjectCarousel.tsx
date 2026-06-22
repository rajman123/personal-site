'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { projects } from '@/data/projects';
import { StatusBadge } from './StatusBadge';

export function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 400;
    el.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between gap-8 mb-12 lg:mb-16"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
              <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
              01 / Recent Projects
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tightest text-bone-50">
              Recent <span className="display-italic">projects</span>.
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full border border-bone-300/20 text-bone-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-bone-300/20 disabled:hover:text-bone-200 transition-colors flex items-center justify-center"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M13 8H3m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full border border-bone-300/20 text-bone-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-bone-300/20 disabled:hover:text-bone-200 transition-colors flex items-center justify-center"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <Link
              href="/work"
              className="ml-2 group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-200 hover:text-accent transition-colors"
            >
              See more
              <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        className="relative overflow-x-auto pb-6 scrollbar-thin"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-6 lg:gap-8 px-6 lg:px-12 pl-6 lg:pl-12 max-w-[calc(100vw)] [&>*:last-child]:mr-6 lg:[&>*:last-child]:mr-12">
          {projects.slice(0, 4).map((p, i) => (
            <CarouselCard key={p.slug} project={p} index={i} />
          ))}
          <Link
            href="/work"
            data-card
            className="group shrink-0 w-[300px] lg:w-[360px] rounded-2xl border border-dashed border-bone-300/15 hover:border-accent/50 transition-colors flex flex-col items-center justify-center gap-3 px-8 text-center bg-ink-800/30"
            style={{ scrollSnapAlign: 'start' }}
          >
            <span className="font-display text-3xl text-bone-100 group-hover:text-accent transition-colors">
              See all projects
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone-400">
              Full case studies →
            </span>
          </Link>
        </div>
      </div>

      <div className="md:hidden mt-8 px-6 flex justify-end">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-200"
        >
          See more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}

function CarouselCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      data-card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group shrink-0 w-[300px] lg:w-[420px] bg-ink-800/60 backdrop-blur-sm border border-bone-300/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-colors duration-500"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${project.placeholder} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-bone-200/60 uppercase mb-2">
              Screenshot pending
            </p>
            <p className="font-display text-3xl text-bone-100/90">{project.title}</p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="absolute top-4 left-4">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest text-bone-200/60">
          {project.year}
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="font-display text-2xl lg:text-3xl text-bone-50 tracking-tight">{project.title}</h3>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4">
          {project.client}
        </p>
        <p className="text-bone-200 leading-relaxed text-[15px] mb-5 line-clamp-3">{project.summary}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-widest text-bone-300 px-2.5 py-1 rounded-full border border-bone-300/15"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href="/work"
          className="group/btn inline-flex items-center gap-2 text-sm text-bone-200 hover:text-accent transition-colors"
        >
          See more
          <span className="font-mono text-xs transition-transform duration-400 group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
