import { projects } from '@/data/projects';

/** A short, human-readable one-liner per project: Problem → Built → Impact. */
const RESUME_BLURBS: Record<string, string> = {
  'wealth-report-automation':
    'Advisers lose hours hand-building client decks → built a document-to-PowerPoint pipeline that auto-composes proposal and annual-review packs from client files → presentation-ready decks in the practice’s own template.',
  'regtech-monitor':
    'Compliance teams had no single view of new GCC regulations → built a verification-first scanner over 100+ official sources using a headless-browser fetch that beats bot protection → auto-generated 184 in-force laws from one jurisdiction’s legal API.',
  'mission-control':
    'Too much of my own day was manual ops → built a dashboard plus an always-on agent ("Bob") that runs calendar, networking, and briefings on cron → a daily-driver system with 12+ recurring routines.',
  'automation-stack':
    'Solo founders can’t hire for repetitive ops → built a modular Python stack — queue, scheduler, executor — driven through Discord → drop-in automation a non-engineer can read and trust.',
  'whatsapp-broker-bot':
    'Dubai brokers live in WhatsApp, not apps → built a multi-tenant Twilio assistant that onboards each broker by phone number and runs DM campaigns → a productized side business, one broker per number.',
  'structured-product-analytics':
    'Database values for structured products were unreliable → built analytics trackers that validate every field and derived metric against the actual term sheet → numbers an advisor can defend to a client.',
  'mindfulbiotinker':
    'A wellness founder needed a brand site plus content in her own voice → built a multi-page Next.js site with a live Instagram feed and a weekly newsletter that drafts from a voice profile and learns from her edits → a content engine that sharpens itself for ~$0.01/week.',
  podster:
    'Turning raw podcast audio into a publish-ready page took hours → built a team of specialized Claude agents (transcribe, research, draft, critique) behind an orchestrator → publish-ready episode pages in ~6 minutes, in production.',
};

const SKILLS: { group: string; items: string[] }[] = [
  { group: 'AI & Agents', items: ['LLM apps', 'Multi-agent systems', 'Tool use', 'Prompt caching', 'Voice / style tuning'] },
  { group: 'Engineering', items: ['Next.js', 'TypeScript', 'React', 'Python', 'Tailwind'] },
  { group: 'Data & Infra', items: ['Data pipelines', 'Web scraping (Playwright)', 'REST + SPARQL', 'Cron / queues', 'VPS · PM2'] },
  { group: 'Domain', items: ['Finance', 'Wealth management', 'Structured products', 'Reg-tech', 'Document automation'] },
];

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">{children}</p>
  );
}

export function Resume() {
  return (
    <div className="mx-auto max-w-page px-6">
      {/* ABOUT */}
      <section id="about" className="py-12 border-t border-paper-100">
        <SectionLabel>About</SectionLabel>
        <div className="mt-5 max-w-prose space-y-4 text-[15px] sm:text-base leading-relaxed text-ink-700">
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
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-12 border-t border-paper-100">
        <SectionLabel>Experience &amp; Projects</SectionLabel>
        <ol className="mt-6 space-y-8">
          {projects.map((p) => (
            <li key={p.slug} className="grid sm:grid-cols-[7.5rem_1fr] gap-1.5 sm:gap-6">
              <div className="font-mono text-[12px] text-ink-400 sm:pt-0.5">{fmtDate(p.date)}</div>
              <div>
                <h3 className="text-[15px] font-semibold text-ink-900 leading-snug">{p.title}</h3>
                <p className="mt-0.5 text-[13px] text-ink-500">{p.client}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-700 max-w-prose">
                  {RESUME_BLURBS[p.slug] ?? p.summary}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                  {p.tags.slice(0, 5).map((t) => (
                    <span key={t} className="font-mono text-[11px] text-ink-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-12 border-t border-paper-100">
        <SectionLabel>Skills</SectionLabel>
        <div className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-7">
          {SKILLS.map((s) => (
            <div key={s.group}>
              <p className="text-[13px] font-semibold text-ink-900 mb-2.5">{s.group}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="text-[12.5px] text-ink-700 border border-paper-200 rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-12 border-t border-paper-100">
        <SectionLabel>Contact</SectionLabel>
        <div className="mt-5 max-w-prose">
          <p className="text-[15px] sm:text-base leading-relaxed text-ink-700">
            Have a workflow that should be automated, or just want to talk shop? Grab a 30-minute slot,
            or reach me directly.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <a
              href="https://calendly.com/rajveergehani/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink-900 text-paper text-[13px] font-medium px-4 py-2 rounded-full hover:bg-ink-700 transition-colors"
            >
              Book a call on Calendly
              <span className="text-[11px] opacity-70">↗</span>
            </a>
          </div>

          <div className="mt-7 grid sm:grid-cols-3 gap-y-3 gap-x-6">
            <ContactRow label="Email" value="gehani@bc.edu" href="mailto:gehani@bc.edu" />
            <ContactRow label="LinkedIn" value="rajveer-gehani" href="https://linkedin.com/in/rajveer-gehani" />
            <ContactRow label="GitHub" value="@rajman123" href="https://github.com/rajman123" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-paper-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-wide text-ink-400">
          © {new Date().getFullYear()} Rajveer Gehani · Boston / Dubai
        </p>
        <p className="font-mono text-[11px] tracking-wide text-ink-400">
          Press <kbd className="text-ink-700">⌘K</kbd> to navigate
        </p>
      </footer>
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
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1">{label}</p>
      <p className="text-[14px] text-ink-900 group-hover:underline underline-offset-2 decoration-ink-300">
        {value}
        {external && <span className="ml-1 text-[11px] text-ink-400">↗</span>}
      </p>
    </a>
  );
}
