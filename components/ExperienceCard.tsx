'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Experience } from '@/data/experience';

const ease = [0.16, 1, 0.3, 1] as const;

export function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [open, setOpen] = useState(false);

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
            <h3 className="text-[17px] font-semibold tracking-tight text-ink-900">{exp.role}</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-faint px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-accent-deep">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {exp.tag}
            </span>
            {!exp.datesOnExpand && (
              <span className="font-mono text-[11px] text-ink-400">{exp.dates}</span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="text-[14px] font-medium text-accent-deep">{exp.org}</p>
            <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden />
            <p className="text-[13px] text-ink-400">{exp.location}</p>
          </div>
          <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">{exp.summary}</p>
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
            <div className="px-6 pb-7 lg:px-7">
              <div className="h-px w-full bg-gradient-to-r from-accent/30 via-paper-200 to-transparent" />
              {exp.datesOnExpand && (
                <p className="mt-5 font-mono text-[11px] tracking-wide text-accent-deep">{exp.dates}</p>
              )}
              <ul className="mt-6 space-y-3.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                      aria-hidden
                    />
                    <p className="max-w-3xl text-[14.5px] leading-relaxed text-ink-700">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
