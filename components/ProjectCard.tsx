'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '@/data/projects';

const ease = [0.16, 1, 0.3, 1] as const;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const STATUS_LABEL: Record<Project['status'], string> = {
  ongoing: 'Ongoing',
  live: 'Live',
  completed: 'Completed',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const lf = project.longForm;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease }}
      className={`group relative rounded-2xl border transition-all duration-500 ${
        open
          ? 'border-accent/30 bg-white shadow-glow'
          : 'border-paper-200 bg-paper-50 hover:border-accent/25 hover:bg-white hover:shadow-glow'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-5 px-6 py-5 text-left lg:px-7 lg:py-6"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-[17px] font-semibold tracking-tight text-ink-900">
              {project.title}
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-faint px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-accent-deep">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {STATUS_LABEL[project.status]}
            </span>
            <span className="font-mono text-[11px] text-ink-400">{fmtDate(project.date)}</span>
          </div>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            {project.summary}
          </p>
        </div>

        <span
          className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
            open
              ? 'rotate-45 border-accent bg-accent text-white'
              : 'border-paper-200 text-ink-400 group-hover:border-accent/40 group-hover:text-accent-deep'
          }`}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="space-y-7 px-6 pb-7 lg:px-7">
              <div className="h-px w-full bg-gradient-to-r from-accent/30 via-paper-200 to-transparent" />

              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent-deep">
                {project.client}
              </p>

              <Block heading="Overview">{lf.overview}</Block>
              <Block heading="Architecture">{lf.architecture}</Block>

              {lf.decisions?.length > 0 && (
                <div>
                  <Label>Key decisions</Label>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {lf.decisions.map((d) => (
                      <div
                        key={d.title}
                        className="rounded-xl border border-paper-200 bg-paper-50 p-4"
                      >
                        <p className="text-[13.5px] font-semibold text-ink-900">{d.title}</p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{d.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lf.metrics && lf.metrics.length > 0 && (
                <div>
                  <Label>By the numbers</Label>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {lf.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-accent/15 bg-accent-faint/40 px-4 py-3"
                      >
                        <p className="text-[18px] font-semibold tracking-tight text-accent-deep">
                          {m.value}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-400">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>Stack</Label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {lf.techStack.flatMap((g) => g.items).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-paper-200 bg-white px-3 py-1 text-[12px] text-ink-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-deep">{children}</p>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{heading}</Label>
      <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-ink-700">{children}</p>
    </div>
  );
}
