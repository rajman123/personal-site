'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { projects, type Project } from '@/data/projects';
import { StatusBadge } from './StatusBadge';

export function ProjectShowcase() {
  return (
    <>
      <PageHeader />
      <ProjectIndex />
      {projects.map((p, i) => (
        <ProjectSection key={p.slug} project={p} index={i} />
      ))}
    </>
  );
}

function PageHeader() {
  return (
    <section className="relative pt-36 lg:pt-48 pb-12 lg:pb-20 px-6 lg:px-12">
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
            Three real projects. The architecture, the decisions behind it, and what surprised me along the
            way. If something here looks like it could solve a problem you're chewing on,{' '}
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

function ProjectIndex() {
  const [active, setActive] = useState<string>(projects[0].slug);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    projects.forEach((p) => {
      const el = document.getElementById(p.slug);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.25) {
              setActive(p.slug);
            }
          });
        },
        { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="hidden lg:block sticky top-24 z-30 mx-auto max-w-7xl px-12 mb-8">
      <div className="flex items-center gap-2 bg-ink-800/70 backdrop-blur-md border border-bone-300/10 rounded-full p-1.5 w-fit">
        {projects.map((p, i) => {
          const isActive = active === p.slug;
          return (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors ${
                isActive ? 'bg-ink-700 text-bone-50' : 'text-bone-300 hover:text-bone-50'
              }`}
            >
              <span className="text-accent">0{i + 1}</span>
              {p.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
  return (
    <section
      id={project.slug}
      className="relative py-20 lg:py-32 px-6 lg:px-12 border-t border-bone-300/10 scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 lg:mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400">
                  0{index + 1} / {String(projects.length).padStart(2, '0')}
                </span>
                <StatusBadge status={project.status} />
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-tightest text-bone-50 mb-3">
                {project.title}
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-6">
                {project.client}
              </p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-bone-100 text-lg lg:text-xl leading-relaxed mb-6">
                {project.longForm.overview}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-widest text-bone-300 px-2.5 py-1 rounded-full border border-bone-300/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshots — hero + caption grid. Falls back to gradient placeholder if none. */}
          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="mb-16 lg:mb-24 space-y-6 lg:space-y-8">
              {/* Hero shot */}
              <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-bone-300/10 bg-ink-800">
                <img
                  src={project.screenshots[0].src}
                  alt={project.screenshots[0].alt}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
                {project.screenshots[0].caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 bg-gradient-to-t from-ink-900/95 via-ink-900/70 to-transparent">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-300/85">
                      {project.screenshots[0].caption}
                    </p>
                  </figcaption>
                )}
              </figure>

              {/* Secondary shots — 2-column grid if 2+ extras */}
              {project.screenshots.length > 1 && (
                <div className={`grid gap-4 lg:gap-6 ${project.screenshots.length === 2 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {project.screenshots.slice(1).map((s, i) => (
                    <figure key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-bone-300/10 bg-ink-800">
                      <img
                        src={s.src}
                        alt={s.alt}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      {s.caption && (
                        <figcaption className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 bg-gradient-to-t from-ink-900/95 via-ink-900/70 to-transparent">
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-300/85">
                            {s.caption}
                          </p>
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              className={`relative aspect-[16/8] rounded-2xl bg-gradient-to-br ${project.placeholder} overflow-hidden mb-16 lg:mb-24 ring-1 ring-bone-300/10`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-bone-200/60 uppercase mb-3">
                    Screenshot pending
                  </p>
                  <p className="font-display text-5xl lg:text-7xl text-bone-100/90">{project.title}</p>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                }}
              />
            </div>
          )}

          {/* Metrics */}
          {project.longForm.metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-16 lg:mb-24">
              {project.longForm.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-ink-800/40 border border-bone-300/10 rounded-xl p-5 lg:p-6"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 mb-2">
                    {m.label}
                  </p>
                  <p className="font-display text-2xl lg:text-3xl text-bone-50">{m.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Architecture */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-24">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                Architecture
              </p>
              <h3 className="font-display text-3xl lg:text-4xl text-bone-50 leading-tight">How it works</h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-bone-200 text-[16px] lg:text-[17px] leading-relaxed">
                {project.longForm.architecture}
              </p>
            </div>
          </div>

          {/* Decisions */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-24">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-3">Decisions</p>
              <h3 className="font-display text-3xl lg:text-4xl text-bone-50 leading-tight">
                Why this, not that
              </h3>
            </div>
            <div className="lg:col-span-8 space-y-8">
              {project.longForm.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="border-l-2 border-accent/30 pl-6 lg:pl-8 hover:border-accent transition-colors"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                    0{i + 1}
                  </p>
                  <h4 className="font-display display-italic text-2xl lg:text-3xl text-bone-50 mb-3">
                    {d.title}
                  </h4>
                  <p className="text-bone-200 leading-relaxed text-[15px]">{d.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-3">Stack</p>
              <h3 className="font-display text-3xl lg:text-4xl text-bone-50 leading-tight">Tools</h3>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {project.longForm.techStack.map((cat) => (
                <div key={cat.category}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 mb-3 pb-3 border-b border-bone-300/10">
                    {cat.category}
                  </p>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-bone-100 text-[15px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
