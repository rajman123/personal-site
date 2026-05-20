'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export function AboutTeaser() {
  return (
    <section className="relative py-24 lg:py-40 px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6">
            <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
            02 / About
          </p>

          <p className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-tight text-bone-50 max-w-4xl">
            I'm Rajveer. I study Finance &amp; CS at{' '}
            <span className="display-italic text-accent">Boston College</span>, and on the side I build AI
            agents that take repetitive work off founders' plates.
          </p>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 mt-10 font-mono text-xs uppercase tracking-widest text-bone-200 hover:text-accent transition-colors"
          >
            More about me
            <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
