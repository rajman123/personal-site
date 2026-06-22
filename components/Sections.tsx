'use client';

import { motion } from 'motion/react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ExperienceCard } from '@/components/ExperienceCard';
import { EXPERIENCE } from '@/data/experience';

const ease = [0.16, 1, 0.3, 1] as const;

const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'R', 'Excel (macros)', 'HTML/CSS', 'LaTeX'] },
  { group: 'AI & Agents', items: ['Claude Code', 'Claude Cowork', 'Agentic AI workflows', 'Multi-agent systems', 'Tool use', 'Prompt caching'] },
  { group: 'Build & Data', items: ['Next.js', 'React', 'Tailwind', 'Playwright (scraping)', 'Cron / queues', 'VPS · PM2'] },
  { group: 'Finance & Domain', items: ['Wealth management', 'Private banking', 'Compliance / reg-tech', 'Structured products', 'Portfolio allocation'] },
];

const INTERESTS = [
  'Basketball (Paul George)',
  'Choir (8+ yrs)',
  'UFC',
  'Boxing',
  'Volleyball',
  'Anime',
  'Reality TV',
  'Self-improvement reading',
  'Life coach in-training',
  'Chipotle enthusiast',
];

const AFFILIATIONS = [
  'Asset & Wealth Management Association',
  'Stride Leadership Program',
  'South Asian Student Association',
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-deep"
    >
      <span className="inline-block h-px w-8 bg-accent/60" />
      {children}
    </motion.p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className="mt-5 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.02] tracking-tightest text-ink-900"
    >
      {children}
    </motion.h2>
  );
}

export function Sections() {
  return (
    <div className="relative">
      {/* ── PROJECTS (its own section — collapsible cards) ── */}
      <section id="projects" className="relative mx-auto max-w-page px-6 lg:px-10 py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
        <Heading>Projects</Heading>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-5 max-w-prose text-[15px] leading-relaxed text-ink-500"
        >
          Things I’ve built and shipped. Click any card to expand the full breakdown.
        </motion.p>

        <div className="mt-10 space-y-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE (its own section) ── */}
      <section id="experience" className="relative mx-auto max-w-page px-6 lg:px-10 py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
        <Heading>Experience</Heading>

        {/* ── Education — highlighted glass row (not collapsible) ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="glass mt-10 overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-accent-faint/50 via-paper-50 to-white px-6 py-6 lg:px-7 shadow-glow"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-deep">
                Education
              </p>
              <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-ink-900">
                Boston College, Carroll School of Management
              </h3>
              <p className="mt-1 text-[14px] text-ink-500">Chestnut Hill, MA</p>
            </div>
            <span className="shrink-0 rounded-full bg-accent-faint px-3 py-1 font-mono text-[11px] tracking-wide text-accent-deep">
              Expected May 2028
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-ink-700">
            B.S. in Management (Finance concentration) + double major in Computer Science ·{' '}
            <span className="font-medium text-accent-deep">Major GPA 3.7</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
              Coursework
            </span>
            {['Fundamentals of Finance', 'Financial Accounting', 'Statistics', 'Marketing Principles'].map(
              (c) => (
                <span
                  key={c}
                  className="rounded-full border border-paper-200 bg-white/70 px-3 py-1 text-[12px] text-ink-700"
                >
                  {c}
                </span>
              ),
            )}
          </div>
        </motion.div>

        {/* ── Collapsible experience cards ── */}
        <div className="mt-4 space-y-4">
          {EXPERIENCE.map((e, i) => (
            <ExperienceCard key={`${e.org}-${e.role}`} exp={e} index={i} />
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative mx-auto max-w-page px-6 lg:px-10 py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
        <Heading>Skills</Heading>
        <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
            >
              <p className="mb-3 text-[14px] font-semibold text-ink-900">{s.group}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-paper-200 bg-white px-3.5 py-1.5 text-[13px] text-ink-700 transition-colors hover:border-accent/40 hover:text-accent-deep"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Independent-Investor highlight callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="glass relative mt-12 overflow-hidden rounded-2xl border border-accent/15 bg-gradient-to-br from-accent-faint/55 via-paper-50 to-white px-7 py-8 lg:px-9 shadow-glow"
        >
          <div
            className="glow-blob drift-slow"
            style={{
              top: '-40%',
              right: '-8%',
              width: '22vw',
              height: '22vw',
              opacity: 0.35,
              background: 'radial-gradient(circle, #a5b4fc, transparent 70%)',
            }}
          />
          <div className="relative flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-deep">
                Independent Investor
              </p>
              <p className="mt-2 text-[clamp(2rem,5vw,3rem)] font-semibold leading-none tracking-tightest text-ink-900">
                <span className="text-gradient">$40k → $140k+</span>
              </p>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-ink-600">
              Grew a personal portfolio from ~$40k to $140k+ over{' '}
              <span className="font-medium text-accent-deep">6+ years</span> on Interactive Brokers
              — self-directed, across market cycles.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── INTERESTS ── */}
      <section id="interests" className="relative mx-auto max-w-page px-6 lg:px-10 py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
        <Heading>Interests</Heading>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {INTERESTS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-paper-200 bg-white px-3.5 py-1.5 text-[13px] font-light text-ink-600 transition-colors hover:border-accent/40 hover:text-accent-deep"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
            Affiliations
          </span>
          <span className="text-ink-700">{AFFILIATIONS.join('  ·  ')}</span>
        </motion.div>
      </section>

      {/* ── ABOUT (copy kept verbatim from the original site) ── */}
      <section id="about" className="relative mx-auto max-w-page px-6 lg:px-10 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
        <Eyebrow>About</Eyebrow>
        <Heading>
          The <span className="text-gradient">long</span> version.
        </Heading>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-8 max-w-prose space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-ink-700"
        >
          <p>
            I’m a Finance &amp; CS sophomore at Boston College, originally from Dubai and based in
            Boston. I’m deep into markets and investing — and on the side I design, build, and ship AI
            systems for real, paying clients.
          </p>
          <p>
            My work is mostly multi-agent tooling and automation: regulatory-change monitoring for a GCC
            fintech, wealth-report generation for a London advisory practice, analytics for an
            investment firm, plus my own products. If a workflow can be described, I can usually build
            it — and I care about handing over something clean enough to trust.
          </p>
        </motion.div>
      </section>

      {/* ── CONTACT (Calendly CTA kept) ── */}
      <section id="contact" className="relative mx-auto max-w-page px-6 lg:px-10 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-200 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-3xl border border-accent/15 bg-gradient-to-br from-accent-faint/60 via-paper-50 to-white px-7 py-12 lg:px-14 lg:py-16"
        >
          <div
            className="glow-blob drift"
            style={{
              top: '-30%',
              right: '-5%',
              width: '30vw',
              height: '30vw',
              opacity: 0.4,
              background: 'radial-gradient(circle, #a5b4fc, transparent 70%)',
            }}
          />
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.02] tracking-tightest text-ink-900">
            Have a workflow that should be <span className="text-gradient">automated?</span>
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-600">
            Grab a 30-minute slot and let’s talk through it, or reach me directly. The first call is
            mostly me asking the right questions until we both see the same thing.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="https://calendly.com/rajveergehani/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-glow transition-all duration-500 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-glow-lg"
            >
              Book a call on Calendly
              <span className="transition-transform duration-500 group-hover:translate-x-0.5">↗</span>
            </a>
            <a
              href="mailto:gehani@bc.edu"
              className="inline-flex items-center gap-2 rounded-full border border-paper-200 bg-white/70 px-7 py-3.5 text-sm font-medium text-ink-700 transition-colors hover:border-accent/40 hover:text-accent-deep"
            >
              Email me
            </a>
          </div>

          <div className="mt-11 grid gap-y-4 gap-x-8 border-t border-accent/10 pt-8 sm:grid-cols-3">
            <ContactRow label="Email" value="gehani@bc.edu" href="mailto:gehani@bc.edu" />
            <ContactRow label="LinkedIn" value="rajveer-gehani" href="https://linkedin.com/in/rajveer-gehani" />
            <ContactRow label="GitHub" value="@rajman123" href="https://github.com/rajman123" />
          </div>
        </motion.div>

        <footer className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper-100 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-wide text-ink-400">
            © {new Date().getFullYear()} Rajveer Gehani · Boston / Dubai
          </p>
          <p className="font-mono text-[11px] tracking-wide text-ink-400">
            Press <kbd className="text-accent-deep">⌘K</kbd> to navigate
          </p>
        </footer>
      </section>
    </div>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group block"
    >
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">{label}</p>
      <p className="text-[14px] text-ink-900 underline-offset-2 group-hover:text-accent-deep group-hover:underline">
        {value}
        {external && <span className="ml-1 text-[11px] text-ink-400">↗</span>}
      </p>
    </a>
  );
}
