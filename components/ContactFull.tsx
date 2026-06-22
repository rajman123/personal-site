'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { SocialIcons } from './SocialIcons';

export function ContactFull() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === 'submitting') return;
    setState('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      setState('sent');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <section className="relative pt-36 lg:pt-48 pb-12 lg:pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-6">
              <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
              Contact
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-tightest text-bone-50 mb-8 max-w-5xl">
              Let's <span className="display-italic text-accent">talk</span>.
            </h1>
            <p className="text-bone-200 text-lg lg:text-xl max-w-2xl leading-relaxed">
              30-minute intro call. Tell me what's eating your week — I'll tell you honestly whether AI
              agents can take it off your plate, or whether you'd be better off solving it another way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <div className="rounded-2xl overflow-hidden border border-bone-300/10 bg-ink-800/50 backdrop-blur-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b border-bone-300/10 bg-ink-900/50">
                  <div className="flex items-center gap-2">
                    <span className="block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-bone-300">
                      Calendly — Intro call · 30 min
                    </span>
                  </div>
                  <a
                    href="https://calendly.com/rajveergehani/intro-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline"
                  >
                    Open in new tab ↗
                  </a>
                </div>
                <iframe
                  src="https://calendly.com/rajveergehani/intro-call?hide_gdpr_banner=1&background_color=f7f6f2&text_color=1a1613&primary_color=d97706"
                  title="Schedule a call with Rajveer"
                  width="100%"
                  height="780"
                  frameBorder={0}
                  className="block w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-32 space-y-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 mb-3">
                    Or just follow along
                  </p>
                  <p className="text-bone-200 text-[15px] leading-relaxed mb-5">
                    Occasional updates when I ship something worth talking about. No newsletter cadence
                    theatre.
                  </p>
                  <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === 'submitting' || state === 'sent'}
                      placeholder="you@example.com"
                      className="bg-ink-800 border border-bone-300/15 focus:border-accent rounded-full px-5 py-3 text-bone-50 placeholder:text-bone-400 outline-none transition-colors text-[15px]"
                    />
                    <button
                      type="submit"
                      disabled={state === 'submitting' || state === 'sent'}
                      className="bg-accent text-bone-50 font-medium rounded-full px-5 py-3 hover:scale-[1.02] active:scale-[0.99] transition-transform duration-300 disabled:opacity-60"
                    >
                      {state === 'submitting'
                        ? 'Sending…'
                        : state === 'sent'
                        ? "✓ You're on the list"
                        : state === 'error'
                        ? 'Try again'
                        : 'Subscribe'}
                    </button>
                  </form>
                </div>

                <div className="space-y-3 pt-8 border-t border-bone-300/10">
                  <ContactLine
                    label="Email"
                    value="gehani@bc.edu"
                    href="mailto:gehani@bc.edu"
                  />
                  <ContactLine label="GitHub" value="@rajman123" href="https://github.com/rajman123" />
                  <ContactLine
                    label="LinkedIn"
                    value="rajveer-gehani"
                    href="https://linkedin.com/in/rajveer-gehani"
                  />
                </div>

                <div className="pt-6 border-t border-bone-300/10 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400">
                    Find me
                  </p>
                  <SocialIcons variant="contact" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactLine({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex items-center justify-between text-sm hover:text-accent transition-colors"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 group-hover:text-accent transition-colors">
        {label}
      </span>
      <span className="text-bone-100 group-hover:text-accent transition-colors flex items-center gap-2">
        {value}
        <span className="font-mono text-xs opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
          →
        </span>
      </span>
    </a>
  );
}
