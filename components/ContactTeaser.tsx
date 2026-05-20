'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export function ContactTeaser() {
  return (
    <section className="relative py-24 lg:py-40 px-6 lg:px-12 border-t border-bone-300/10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-10 items-end"
        >
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6">
              <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
              03 / Contact
            </p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tightest text-bone-50">
              Got a workflow that's<br />
              eating your week?
              <br />
              <span className="display-italic text-accent">Let's talk.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4 flex flex-col items-start gap-5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-accent text-ink-900 font-medium px-7 py-4 rounded-full overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
            >
              <span>Book a call</span>
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10m0 0L9 4m4 4L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <p className="text-bone-300 text-sm max-w-xs">
              30-minute intro call. I'll tell you honestly whether AI agents can take it off your plate.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
