'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export function AboutFull() {
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
              About
            </p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-tightest text-bone-50 max-w-5xl">
              The <span className="display-italic text-accent">long</span> version.
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 lg:px-12 pb-24 lg:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-32 space-y-8">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-bone-300/10 bg-gradient-to-br from-ink-700 to-ink-800">
                  <Image
                    src="/hero-photo.png"
                    alt="Rajveer Gehani"
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                  <Stat label="Based" value="Boston / Dubai" />
                  <Stat label="Class of" value="2028" />
                  <Stat label="Studies" value="Finance + CS" />
                  <Stat label="Recruiting" value="Wealth Mgmt" />
                </div>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-10 lg:space-y-12"
            >
              <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] text-bone-50">
                I'm Rajveer. I study Finance &amp; CS at{' '}
                <span className="display-italic text-accent">Boston College</span>, and on the side I build
                AI agents that take repetitive work off founders' plates.
              </p>

              <Section heading="The work">
                I split time between Boston and Dubai. By day I'm a Finance and CS sophomore at BC,
                recruiting into wealth management. By night and weekend I build software — specifically,
                multi-agent systems that handle the kind of repetitive, judgment-light work that quietly
                eats founders' time. Email triage. Pipeline management. Content production. Research.
                Calendar wrangling. The stuff a smart assistant would handle if you could afford one.
                <br /><br />
                The honest truth: <span className="text-bone-50">if you can describe the workflow, I can probably build it.</span>{' '}
                The ceiling on what we ship together isn't a tech limit — it's how clearly we can verbalize
                what "good" looks like. The discovery call is mostly me asking dumb-on-purpose questions
                until we both see the same thing. Once that's clear, the build is the easy part.
              </Section>

              <Section heading="The bet">
                I think the next decade of small-business advantage comes from owning your own stack of
                agents — not from buying SaaS. The companies who figure this out first will run leaner,
                move faster, and spend less. I'd rather build that for you than read about it in a
                deck five years from now.
              </Section>

              <Section heading="How I work">
                Discovery call → scoped pilot (usually one workflow, two-week sprint) → handoff with full
                docs and a clean exit. You own the code and the agents at the end. No retainer lock-in,
                no SaaS subscription. I bill for the build, not the relationship.
                <br /><br />
                <span className="text-bone-50">If you'd rather I stay involved</span> — maintaining the system as
                your business evolves, adding new agents as new workflows show up, keeping things running
                without you having to think about it — that's available too. You still own everything.
                I just stick around as the engineer who knows where every wire goes.
              </Section>

              <Section heading="Outside the work">
                A few things about me beyond the work:
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Basketball is the constant. I've played competitively my entire life — it's the thing I default to when I need to clear my head.",
                    "Played volleyball through high school, recently started training for muay thai, and I'll watch any UFC card you put in front of me.",
                    "I eat Chipotle more than I'd publicly admit. Sixers ride or die.",
                    "I keep a running list of things that could be automated but aren't yet.",
                    "From Dubai, based in Boston, want to spend my twenties seeing as much of the rest of the world as I can.",
                  ].map((line, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-accent mt-2 shrink-0">
                        0{i + 1}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <div className="pt-6 lg:pt-8 border-t border-bone-300/10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-accent text-bone-50 font-medium px-7 py-4 rounded-full transition-transform duration-500 hover:scale-[1.02]"
                >
                  <span>Book a call</span>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10m0 0L9 4m4 4L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
        <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
        {heading}
      </p>
      <div className="text-bone-200 text-[16px] lg:text-[17px] leading-[1.7]">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-bone-300/15 pl-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-400 mb-2">{label}</p>
      <p className="text-bone-100 text-base">{value}</p>
    </div>
  );
}
