'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { projects, type Project } from '@/data/projects';
import { StatusBadge } from './StatusBadge';

const PER_PAGE = 4;

export function ProjectShowcase() {
  // `projects` is already sorted newest → oldest in data/projects.ts.
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(projects.length / PER_PAGE));
  const current = page > pageCount - 1 ? pageCount - 1 : page;
  const start = current * PER_PAGE;
  const visible = projects.slice(start, start + PER_PAGE);

  return (
    <>
      <PageHeader />
      <section className="relative px-6 lg:px-12 pb-28 lg:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} number={start + i + 1} />
            ))}
          </div>

          {pageCount > 1 && (
            <Pagination page={current} pageCount={pageCount} onChange={setPage} />
          )}
        </div>
      </section>
    </>
  );
}

function PageHeader() {
  return (
    <section className="relative pt-36 lg:pt-48 pb-12 lg:pb-16 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6">
            <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
            Work — {new Date().getFullYear()}
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-tightest text-bone-50 mb-8 max-w-5xl">
            Things I'm <span className="display-italic text-accent">currently</span>
            <br />
            shipping in production.
          </h1>
          <p className="text-bone-200 text-lg lg:text-xl max-w-2xl leading-relaxed">
            Real projects — current and shipped, newest first. If something here looks like it could solve a
            problem you're chewing on,{' '}
            <a href="/contact" className="text-accent hover:underline">
              let's talk
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  number,
}: {
  project: Project;
  index: number;
  number: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-ink-800/50 backdrop-blur-sm border border-bone-300/10 rounded-xl p-5 lg:p-6 hover:border-accent/40 transition-colors duration-300"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400">
            {String(number).padStart(2, '0')}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-bone-400">
          {project.year}
        </span>
      </div>

      <h2 className="font-display text-2xl lg:text-3xl text-bone-50 tracking-tight leading-tight mb-1.5">
        {project.title}
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3 line-clamp-1">
        {project.client}
      </p>
      <p className="text-bone-200 leading-relaxed text-[14px] mb-4 line-clamp-2">
        {project.summary}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="font-mono text-[9px] uppercase tracking-widest text-bone-300 px-2 py-0.5 rounded-full border border-bone-300/15"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) {
  const go = (p: number) => {
    onChange(Math.min(Math.max(0, p), pageCount - 1));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mt-12 lg:mt-16 flex items-center justify-center gap-2" aria-label="Project pages">
      <button
        onClick={() => go(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="w-10 h-10 rounded-full border border-bone-300/20 text-bone-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-bone-300/20 disabled:hover:text-bone-200 transition-colors flex items-center justify-center"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M13 8H3m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {Array.from({ length: pageCount }).map((_, i) => {
        const isActive = i === page;
        return (
          <button
            key={i}
            onClick={() => go(i)}
            aria-current={isActive ? 'page' : undefined}
            className={`min-w-10 h-10 px-3 rounded-full font-mono text-xs transition-colors flex items-center justify-center ${
              isActive
                ? 'bg-accent text-ink-900 border border-accent'
                : 'border border-bone-300/20 text-bone-200 hover:border-accent hover:text-accent'
            }`}
          >
            {i + 1}
          </button>
        );
      })}

      <button
        onClick={() => go(page + 1)}
        disabled={page === pageCount - 1}
        aria-label="Next page"
        className="w-10 h-10 rounded-full border border-bone-300/20 text-bone-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-bone-300/20 disabled:hover:text-bone-200 transition-colors flex items-center justify-center"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </nav>
  );
}
