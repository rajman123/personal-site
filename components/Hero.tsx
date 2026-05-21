'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const rise = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 lg:pt-32 px-6 lg:px-12 overflow-hidden"
    >
      {/* Decorative section number */}
      <div className="absolute top-24 lg:top-32 left-6 lg:left-12 font-mono text-[10px] tracking-[0.3em] text-bone-400 uppercase">
        00 / Intro
      </div>

      <div className="absolute top-24 lg:top-32 right-6 lg:right-12 font-mono text-[10px] tracking-[0.3em] text-bone-400 uppercase text-right">
        BC '28 — Boston / Dubai
      </div>

      <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <motion.p
            variants={rise}
            className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6 lg:mb-8"
          >
            <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
            Currently available
          </motion.p>

          <motion.h1
            variants={rise}
            className="font-display text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95] tracking-tightest text-bone-50 mb-8"
          >
            I build <span className="display-italic text-accent">AI agents</span>
            <br />
            that run real
            <br />
            workflows.
          </motion.h1>

          <motion.p
            variants={rise}
            className="text-lg lg:text-xl text-bone-200 max-w-xl leading-relaxed mb-10 lg:mb-12"
          >
            Boston College <span className="font-mono text-sm text-bone-300">'28</span> — Finance + CS.
            Currently building autonomous tooling for founders who want to ship without hiring.
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-accent text-ink-900 font-medium px-7 py-4 rounded-full overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
            >
              <span className="relative z-10">Book a call</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 text-bone-100 font-medium px-7 py-4 rounded-full border border-bone-300/30 hover:border-accent hover:text-accent transition-colors duration-400"
            >
              <span>See work</span>
              <span className="font-mono text-xs text-bone-300 group-hover:text-accent">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 order-1 lg:order-2 relative"
        >
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
            {/* Backdrop accent gradient */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-2xl"
            />
            {/* Photo frame */}
            <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-ink-700 to-ink-800 ring-1 ring-bone-300/10">
              <Image
                src="/hero-photo.png"
                alt="Rajveer Gehani"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-center"
              />
              {/* Subtle vignette */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent"
              />
            </div>
            {/* Editorial caption */}
            <div className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 bg-ink-800/95 backdrop-blur ring-1 ring-bone-300/10 rounded-xl px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-300 mb-1">Currently shipping</p>
              <p className="font-display text-lg text-bone-50">Podster — Mission Control</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-bone-400 uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-10 bg-gradient-to-b from-bone-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
