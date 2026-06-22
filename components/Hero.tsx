'use client';

import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

// next/image's optimizer needs `sharp` (absent in this env) and its `unoptimized`
// path drops the configured basePath. A plain <img> with the basePath prefix is
// the robust, deploy-safe way to serve this transparent cutout.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Ambient gradient field */}
      <div className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div
          className="glow-blob drift"
          style={{
            top: '-8%',
            left: '8%',
            width: '46vw',
            height: '46vw',
            background:
              'radial-gradient(circle at 30% 30%, #c7d2fe, transparent 70%)',
          }}
        />
        <div
          className="glow-blob drift-slow"
          style={{
            bottom: '-12%',
            right: '4%',
            width: '52vw',
            height: '52vw',
            background:
              'radial-gradient(circle at 60% 40%, #e0e7ff, transparent 68%)',
          }}
        />
        <div
          className="glow-blob"
          style={{
            top: '30%',
            right: '26%',
            width: '24vw',
            height: '24vw',
            opacity: 0.4,
            background:
              'radial-gradient(circle, #a5b4fc, transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-page px-6 lg:px-10 py-28 lg:py-0">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-8">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06, ease }}
              className="text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-tightest text-ink-900"
            >
              Rajveer
              <br />
              <span className="text-gradient">Gehani</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease }}
              className="mt-6 max-w-md text-[17px] sm:text-lg leading-relaxed text-ink-500"
            >
              Boston College · Finance&nbsp;+&nbsp;CS. I design, build &amp; ship
              <span className="text-ink-900 font-medium"> AI systems for real clients</span> —
              multi-agent tooling that takes the repetitive work off your plate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://calendly.com/rajveergehani/intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent text-white text-sm font-medium px-6 py-3 shadow-glow transition-all duration-500 hover:-translate-y-0.5 hover:shadow-glow-lg hover:bg-accent-deep"
              >
                Book a call
                <span className="transition-transform duration-500 group-hover:translate-x-0.5">↗</span>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-paper-200 bg-white/60 text-sm font-medium text-ink-700 px-6 py-3 transition-colors hover:border-accent/40 hover:text-accent-deep"
              >
                About me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-5 text-[13px] text-ink-400"
            >
              <a href="mailto:gehani@bc.edu" className="hover:text-accent-deep transition-colors">Email</a>
              <a href="https://linkedin.com/in/rajveer-gehani" target="_blank" rel="noopener noreferrer" className="hover:text-accent-deep transition-colors">LinkedIn ↗</a>
              <a href="https://github.com/rajman123" target="_blank" rel="noopener noreferrer" className="hover:text-accent-deep transition-colors">GitHub ↗</a>
            </motion.div>
          </div>

          {/* Cutout photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[90%] sm:w-[74%] lg:w-[118%] max-w-[560px]">
              {/* glow disc behind subject */}
              <div
                className="absolute inset-x-[6%] bottom-[2%] top-[10%] rounded-[40%] blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(129,140,248,0.55), rgba(99,102,241,0.15) 55%, transparent 72%)',
                }}
              />
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}/hero-cutout.png`}
                  alt="Rajveer Gehani"
                  width={908}
                  height={828}
                  className="relative w-full h-auto drop-shadow-[0_24px_50px_rgba(79,70,229,0.28)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="block h-3 w-3 rotate-45 border-b border-r border-accent/50"
        />
      </motion.div>
    </section>
  );
}
