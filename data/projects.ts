export type ProjectStatus = 'ongoing' | 'live' | 'completed';

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** ISO date (YYYY-MM-DD) used to sort projects newest → oldest. */
  date: string;
  status: ProjectStatus;
  summary: string;
  detail: string;
  tags: string[];
  placeholder: string; // tailwind gradient classes (used as fallback when no screenshots)
  /** Optional showcase images under /public/screenshots/. First image is the hero. */
  screenshots?: { src: string; alt: string; caption?: string }[];
  // Long-form content for /work deep-dive page
  longForm: {
    overview: string;
    architecture: string;
    decisions: { title: string; body: string }[];
    metrics?: { label: string; value: string }[];
    techStack: { category: string; items: string[] }[];
  };
};

const projectsRaw: Project[] = [
  {
    slug: 'ai-assistant-package',
    title: 'Personal 24/7 AI Assistant Setup Package',
    client: 'Productized private AI agent + command centre for clients',
    year: '2026',
    date: '2026-06-25',
    status: 'ongoing',
    summary:
      'Gives a client their own private, always-on AI chief-of-staff plus a live command-centre dashboard — it answers emails, books and arranges things, and keeps them on top of every business they run, all on infrastructure they own.',
    detail:
      'A productized personal AI operations partner. It works like a human executive assistant — drafting and answering emails, booking meetings and travel, chasing follow-ups, and delivering a daily brief — backed by a Mission Control dashboard that gives one view across everything the client owns or runs. For each client I build bespoke tools tailored to the specific parts of their life and business, seed the agent from their own documents, deploy it to their own server and Claude subscription, and hand it over built to run itself.',
    tags: ['Next.js', 'Claude API', 'Multi-agent', 'Custom tooling', 'VPS deployment', 'Client handoff'],
    placeholder: 'from-emerald-200/50 via-sky-200/40 to-indigo-200/50',
    longForm: {
      overview:
        'A packaged “personal AI chief-of-staff” for executives and founders stretched across too many things at once. Each client gets a private, always-on agent plus a Mission Control dashboard tailored to their world — every business line, meeting, and metric they care about — running on infrastructure they own, so their data never leaves their server. It is the same 24/7 system I run for myself, productized so a busy operator can offload the overhead and stay on top of everything, everywhere, at once.',
      architecture:
        'A repeatable build with a bespoke layer per client. The Mission Control template (a self-contained dashboard + agent runtime) is cloned and shaped to the client: dashboard tabs and data model their actual businesses, and the agent’s memory is seeded from their own documents (CV, company profile) so it boots already knowing who they are and how they work. On top of that base I build custom tools for the specific friction points in each client’s life — a holdings cockpit for a diversified investor, a daily operations digest for an operating company, a meetings-and-travel coordinator — then deploy the whole thing to the client’s own VPS and Claude subscription behind a reverse proxy, with self-healing crons and a health monitor that alerts them the moment anything needs a look.',
      decisions: [
        {
          title: 'Works like a human assistant, not a chatbot',
          body:
            'The agent doesn’t wait to be asked. It drafts and answers emails, books and rearranges meetings, coordinates travel and logistics, chases the follow-ups that fall through the cracks, and pushes a morning brief — with a draft-and-confirm guardrail on anything it sends, so the client stays in control while the day-to-day overhead simply disappears.',
        },
        {
          title: 'A custom toolset per client, not a template',
          body:
            'Every client’s life has different friction. So on top of the shared base I build tools tailored to their world — a cockpit tile per business they own, a daily data digest for their operating company, a networking and follow-up tracker, a document-to-brief pipeline — the pieces that actually move the needle for that specific person.',
        },
        {
          title: 'Runs on the client’s own infrastructure',
          body:
            'Their VPS, their Claude subscription. The agent’s data — especially sensitive business or health data — never leaves their server. For the executives this is built for, that data sovereignty is the selling point, not a footnote.',
        },
        {
          title: 'Low-maintenance by design',
          body:
            'Self-healing crons plus a health monitor that alerts the client on failure — never a silent one — and a maintenance guide so they’re self-sufficient after handoff. The whole point is that it keeps running, and keeps them on top of everything, without me.',
        },
      ],
      metrics: [
        { label: 'Runs on', value: 'Client’s own VPS + Claude' },
        { label: 'Onboarding', value: 'Seeded from client docs' },
        { label: 'Custom tools', value: 'Built per client’s life' },
        { label: 'After handoff', value: 'Low-maintenance, self-healing' },
      ],
      techStack: [
        { category: 'Dashboard', items: ['Next.js', 'Express', 'JSON-file storage'] },
        { category: 'Assistant', items: ['Claude API', 'Email + calendar', 'Memory files', 'Cron'] },
        { category: 'Custom tooling', items: ['Per-client tools', 'Data digests', 'Travel + meeting coordination'] },
        { category: 'Infra', items: ['Client VPS', 'pm2 + nginx', 'Health monitor'] },
      ],
    },
  },
  {
    slug: 'creator-growth-analytics',
    title: 'Creator Growth Analytics',
    client: 'Data-driven growth analytics & ideation agents for a roster of creators',
    year: '2026',
    date: '2026-07-05',
    status: 'live',
    summary:
      'A data-driven growth engine for creators: full analytics audits that score every post with a predictive “Brain Score,” plus always-on ideation agents that run hours of daily trend research and turn it into ready-to-shoot post ideas.',
    detail:
      'Runs full, data-driven audits of a creator’s account — scoring every post with a model trained on their own results — and pairs them with ideation agents that do hours of automated market research every day, then act as a chatbot surfacing content ideas tuned to trends changing daily. The creator can converse with it to turn a live trend into a specific, ready-to-shoot post. Built as a productized service now scaling across a roster of creator clients.',
    tags: ['Python', 'Predictive analytics', 'Instagram', 'Ideation agents', 'Trend research', 'Computer vision'],
    placeholder: 'from-fuchsia-200/50 via-rose-200/40 to-amber-200/50',
    longForm: {
      overview:
        'A productized, data-driven growth service for social-media creators, now scaling across a roster of clients. Two engines: full analytics audits that turn a creator’s own platform data into a decision-ready report — what’s working, why, and what to make next — and always-on ideation agents that research the market every day and hand the creator fresh, on-trend ideas on demand. Everything is grounded in the creator’s real numbers, not generic advice.',
      architecture:
        'Two systems sharing one data spine. The audit pipeline runs collect → score → see → report: the heart is a predictive “Brain Score,” a per-post model whose weights are learned from the creator’s own posts (which content traits lift their follows), so it grades what a post achieved and predicts how a draft will do before it goes live — while a visual stage frame-samples Reel recordings to read the first-frame and on-screen-text hooks that drive reach. Alongside it, ideation agents run hours of automated market and trend research daily across platforms, synthesize what’s breaking out, and expose it as a chatbot the creator can talk to — turning a live trend into a specific post concept, hook, and caption in a back-and-forth. A trend radar flags the moment a relevant format or sound starts breaking, with a ready-to-shoot brief attached.',
      decisions: [
        {
          title: 'Score the recipe, not just the outcome',
          body:
            'The Brain Score predicts from the content traits a creator controls — format, hook, a save/send call-to-action, caption style — validated against their real follows. So a creator can score a draft before posting, not just grade it afterward.',
        },
        {
          title: 'An ideation partner that never runs out of ideas',
          body:
            'The ideation agents do hours of trend research every day so the creator doesn’t have to. Instead of a static content calendar, the creator converses with the agent — “what should I post about this week?” — and walks away with specific, on-trend concepts built around what’s actually breaking out right now.',
        },
        {
          title: 'Calibrate to the creator’s own data',
          body:
            'Every benchmark is learned from their account, never an industry average. That surfaces the most valuable finding: the gap between who a creator thinks they reach and who actually engages — and which of their content types quietly out-performs the rest.',
        },
        {
          title: 'Never fabricate a figure',
          body:
            'Every number in the report is the creator’s real data. Where a metric can’t be sourced cleanly it’s flagged, not guessed — because a wrong number in a paid deliverable is worse than a missing one.',
        },
      ],
      metrics: [
        { label: 'Posts scored per audit', value: '~100' },
        { label: 'Ideation research', value: 'Hours, daily, automated' },
        { label: 'Brain Score', value: 'Trained on creator’s own data' },
        { label: 'Deliverable', value: 'Audit + live ideation chatbot' },
      ],
      techStack: [
        { category: 'Analytics', items: ['Python', 'Feature-lift model', 'Percentile scoring'] },
        { category: 'Ideation', items: ['Daily trend-research agents', 'Conversational chatbot', 'Trend radar'] },
        { category: 'Visual', items: ['ffmpeg frame sampling', 'Hook / first-frame analysis'] },
        { category: 'Output', items: ['WeasyPrint PDF', 'Interactive report', 'Sortable tables'] },
      ],
    },
  },
  {
    slug: 'podster',
    title: 'Podster',
    client: 'Production AI podcast tooling',
    year: '2025',
    date: '2025-09-15',
    status: 'live',
    summary:
      'Multi-agent system that turns long-form audio into publish-ready episode pages, transcripts, and clip suggestions.',
    detail:
      'Built with a small team of agents — one transcribes, one researches the guest, one drafts the show page, one critiques the draft. Each agent has a narrow job and a hard contract. The orchestrator decides when to retry, when to escalate, and when to ship. In production today.',
    tags: ['Next.js', 'Claude API', 'Multi-agent', 'Production'],
    placeholder: 'from-orange-300/50 via-amber-200/40 to-rose-200/50',
    screenshots: [
      { src: '/screenshots/podster-landing.png', alt: 'Podster — Podcasts, faster.', caption: 'The reader UI — pick a profile, get summaries tuned to what you care about.' },
    ],
    longForm: {
      overview:
        'Podster is a production AI tool that takes raw podcast audio and produces a publish-ready episode page in minutes — transcript, summary, clip suggestions, guest bio, and SEO metadata. It runs as a small team of specialized Claude agents coordinated by an orchestrator that knows when to retry, when to escalate, and when to ship.',
      architecture:
        'The system is intentionally agentic, not monolithic. Each agent has one narrow job and a hard input/output contract. Audio comes in → Transcriber agent produces a clean transcript → Research agent looks up the guest → Show-page Drafter writes the publishable content → Critic agent reads the draft against quality criteria and either approves or sends it back with notes. The orchestrator owns retry policy, budget, and the final ship/no-ship call.',
      decisions: [
        {
          title: 'Why agents instead of one big prompt',
          body:
            "Long prompts that try to do everything become impossible to evaluate or improve. With narrow agents, when a draft is bad I know exactly which agent to fix. When the Critic flags an issue, the fix path is one agent's prompt — not the whole pipeline.",
        },
        {
          title: 'Critic agent as a gate, not a suggestion',
          body:
            'Most pipelines treat critique as advisory. Ours blocks the ship. The Critic has veto power until its objections are addressed or explicitly overridden. Quality went up the day this changed.',
        },
        {
          title: 'Hard JSON contracts between agents',
          body:
            "No free-form handoffs. Each agent's output is validated against a schema before the next agent sees it. When something breaks, it breaks loudly and locally.",
        },
      ],
      metrics: [
        { label: 'Time per episode', value: '~6 min' },
        { label: 'Manual editing required', value: 'minimal' },
        { label: 'Status', value: 'In production' },
      ],
      techStack: [
        { category: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind'] },
        { category: 'Agents', items: ['Claude API', 'Tool use', 'Prompt caching'] },
        { category: 'Infra', items: ['Vercel', 'Background queues', 'Object storage'] },
      ],
    },
  },
  {
    slug: 'mission-control',
    title: 'Mission Control + Bob',
    client: 'Personal autonomous AI system',
    year: '2026',
    date: '2026-04-20',
    status: 'live',
    summary:
      'A live dashboard and 24/7 agent ("Bob") that runs my calendar, networking pipeline, and morning briefings end-to-end.',
    detail:
      'The dashboard surfaces tasks, drafts, and outstanding decisions. Bob runs on cron, takes initiative on idle nights (research, summaries), and routes everything through Discord. Screenshots blurred — it has my actual data in it.',
    tags: ['Next.js', 'Claude API', 'Discord bots', 'Cron', 'Multi-agent'],
    placeholder: 'from-emerald-200/50 via-teal-200/40 to-sky-200/50',
    screenshots: [
      { src: '/screenshots/multi-automation-stack.png', alt: 'Discord channel-per-agent architecture', caption: 'Each Discord channel = a specialized agent. One channel runs the WhatsApp broker bot, one ghost-writes the monthly newsletter, one delivers the 4:15pm ET market close brief, one handles WM recruiting. All orchestrated from a single VPS via webhooks + cron + PM2 — each agent with its own memory, prompts, and execution context.' },
    ],
    longForm: {
      overview:
        'Mission Control is a personal Next.js dashboard that surfaces everything I need to action: tasks, drafts the agent has prepared, networking follow-ups, calendar conflicts. Behind it runs Bob — an always-on agent that wakes up on cron, takes initiative on idle hours, and routes work through Discord channels organized by workflow.',
      architecture:
        'A queue + tick-loop pattern. Bob (the executor) reads from a JSON-backed queue, claims a task, runs it with full repo context, and writes results back. A separate tick process schedules recurring work (call prep at 9am, networking review at 2pm, weekly summary Sunday 8pm). Discord bots provide the interactive surface — every workflow has its own channel, so context stays clean.',
      decisions: [
        {
          title: 'Channel-per-workflow over single inbox',
          body:
            'Early version had one Discord DM. It got noisy fast. Splitting into one channel per workflow (recruiting, podster, automations, etc.) means I can mute or focus on one thread at a time without losing the others.',
        },
        {
          title: 'Memory as files, not a database',
          body:
            'The agent persists everything to a flat file system in /memory. Easier to inspect, easier to edit by hand when the agent learns something wrong, easier to back up. Databases would have been overkill.',
        },
        {
          title: 'Pre-approval before non-trivial actions',
          body:
            'The agent drafts and proposes; I approve. This guardrail caught at least three would-be regrets in the first month — including one near-miss email send.',
        },
      ],
      metrics: [
        { label: 'Cron jobs running', value: '12+' },
        { label: 'Discord channels', value: 'workflow + DMs' },
        { label: 'Status', value: 'Ongoing daily-driver' },
      ],
      techStack: [
        { category: 'Frontend', items: ['Next.js', 'React', 'Tailwind'] },
        { category: 'Agent runtime', items: ['Claude API', 'Python tick loop', 'Cron'] },
        { category: 'Interfaces', items: ['Discord bots (MCP)', 'Email', 'Google Sheets'] },
      ],
    },
  },
  {
    slug: 'automation-stack',
    title: 'Multi-agent automation stack',
    client: 'Founder workflow toolkit',
    year: '2026',
    date: '2026-04-10',
    status: 'live',
    summary:
      'Modular Python stack — morning email routine, executor cron, Discord-driven workflows. Drop-in for solo founders.',
    detail:
      'Workflow-per-channel routing, an executor that picks up tasks from a queue and runs them with full context, retry/checkpoint semantics, and a tick loop that schedules itself. Designed so a non-engineer can read what it did and why.',
    tags: ['Python', 'Claude API', 'Discord', 'Automation'],
    placeholder: 'from-violet-200/50 via-fuchsia-200/40 to-pink-200/50',
    longForm: {
      overview:
        'The automation stack is the Python plumbing that powers Mission Control + Bob, packaged so the patterns can be lifted into other founders\' workflows. Daily morning recap, weekly summary, networking ping reviews, and ad-hoc task execution all run on the same primitives.',
      architecture:
        'Three pieces: a queue library that knows about tasks + their state, a tick scheduler that adds new tasks based on time/cron rules, and an executor that pops tasks off the queue and runs them with full Claude context. Everything writes to flat JSON for inspectability — when something goes wrong, you can read the queue and see exactly what happened.',
      decisions: [
        {
          title: 'Flat JSON over a database',
          body:
            'For a founder-scale tool, the file system is the database. You can grep it, diff it, back it up to git. The day you outgrow it, swap in SQLite without changing the API.',
        },
        {
          title: 'Every task has a checkpoint cadence',
          body:
            'Long-running tasks (1+ hour) checkpoint progress every 10 minutes. If the executor dies mid-task, it can resume from the last checkpoint. This pattern caught more crashes than any try/except ever did.',
        },
        {
          title: 'Discord is the UI',
          body:
            "No web UI means no auth, no sessions, no frontend builds. Discord handles identity, notifications, and history for free — and works on every device the founder already has.",
        },
      ],
      metrics: [
        { label: 'Routines running daily', value: '6+' },
        { label: 'Lines of Python', value: '~2k' },
        { label: 'Status', value: 'Live, productionized' },
      ],
      techStack: [
        { category: 'Runtime', items: ['Python 3.12', 'Claude API', 'Cron'] },
        { category: 'Storage', items: ['Flat JSON', 'Memory files'] },
        { category: 'Interfaces', items: ['Discord bots (MCP)', 'Email (Gmail API)'] },
      ],
    },
  },
  {
    slug: 'regtech-monitor',
    title: 'Horizon Scanner',
    client: 'Regulatory horizon-scanning platform for a GCC fintech',
    year: '2026',
    date: '2026-06-05',
    status: 'ongoing',
    summary:
      'A live horizon-scanning engine that automatically catches every new and amended regulation the moment it is published — across 25+ GCC supervisors, central banks, exchanges, and global standards bodies — and classifies what actually matters.',
    detail:
      'A horizon-scanning system that compiles and monitors financial regulations from dozens of official sources across the Gulf and global hub cities. Every feed is live-verified; bot-protected sources are reached with a headless-browser fetch pipeline instead of brittle RSS.',
    tags: ['Python', 'Playwright', 'Web scraping', 'APIs', 'Next.js'],
    placeholder: 'from-sky-200/50 via-indigo-200/40 to-slate-200/50',
    longForm: {
      overview:
        'A regulatory-change monitoring platform for a GCC fintech. The brief: give a compliance team a single, trustworthy view of new and amended financial regulations across the Gulf plus a dozen international hub cities — pulling from supervisors, financial-intelligence units, ministries, exchanges, and official law platforms.',
      architecture:
        'A verification-first ingestion pipeline. Each regulator source is mapped to a live-verified feed — API, SPARQL endpoint, or document page — and classified by how it can be harvested. Where RSS exists and works, it is used; where sources sit behind bot protection (the common case in this region), a Playwright headless-browser fetch bypasses the 403s. A proof-of-concept auto-generated 184 in-force laws from one jurisdiction’s public legal API directly into the client’s sheet format.',
      decisions: [
        {
          title: 'Live-verify every single source link',
          body:
            'For a compliance product, a stale or wrong link is worse than no link. Every regulator feed in the deliverable was opened and confirmed live before it shipped — no inferring a URL from a pattern.',
        },
        {
          title: 'Playwright fetch over RSS where needed',
          body:
            'Regional regulator sites are heavily bot-protected and their RSS is mostly empty or blocked. A headless-browser fetch became the validated workhorse — it sees what a human browser sees, so the feed actually populates.',
        },
        {
          title: 'Hand the client an adaptation playbook, not a black box',
          body:
            'Alongside the feeds I shipped an initial-build playbook, a tech-team adaptation guide with tested API/SPARQL queries per jurisdiction, and a manual-collection map of verified document pages — so their engineers can extend it without me.',
        },
      ],
      metrics: [
        { label: 'Regulator sources mapped', value: '100+' },
        { label: 'Jurisdictions', value: '13+' },
        { label: 'PoC laws auto-generated', value: '184' },
      ],
      techStack: [
        { category: 'Ingestion', items: ['Python', 'Playwright', 'REST + SPARQL'] },
        { category: 'Verification', items: ['Live link checks', 'Source classification'] },
        { category: 'Surface', items: ['Next.js', 'Google Sheets export', 'CSV'] },
      ],
    },
  },
  {
    slug: 'wealth-report-automation',
    title: 'Strategy & Meeting Report Automation',
    client: 'Automated reporting for a London wealth-management practice',
    year: '2026',
    date: '2026-06-12',
    status: 'ongoing',
    summary:
      'Composes a wealth-management practice’s strategy proposals and post-meeting review decks straight from client documents — a pre-meeting plan before the conversation and a meeting report after.',
    detail:
      'Reads a client’s underlying documents and auto-composes presentation-ready PowerPoint decks: a pre-meeting proposal and a post-meeting annual-review pack, built off the practice’s real template with charts rendered as images.',
    tags: ['Python', 'python-pptx', 'Claude API', 'Document parsing'],
    placeholder: 'from-amber-200/50 via-stone-200/40 to-emerald-200/50',
    longForm: {
      overview:
        'Report-generation automation for a London wealth-advisory practice. Advisers spend hours hand-building client decks; this composes them automatically from the client’s own documents — a PRE proposal deck before the meeting and a POST annual-review deck after — formatted to the practice’s house template.',
      architecture:
        'A document-to-deck pipeline. Client source documents are parsed and structured, the relevant figures and narrative are drafted with Claude, and the output is assembled into a .pptx built off the practice’s real template. Charts are rendered as images and placed into the slides so formatting stays pixel-stable across machines.',
      decisions: [
        {
          title: 'Build off the real template, not a clone',
          body:
            'The deck has to look like theirs, not "close enough". The generator writes into the practice’s actual .pptx template so brand, fonts, and layout match what advisers already send clients.',
        },
        {
          title: 'Charts as images, not native chart objects',
          body:
            'Native PowerPoint charts drift and break across versions. Rendering each chart to an image and placing it keeps every generated deck visually identical and predictable.',
        },
        {
          title: 'Surface document conflicts instead of guessing',
          body:
            'When source documents disagree, the system flags the conflict for the adviser rather than silently picking a number — the adviser stays accountable for what the client sees.',
        },
      ],
      techStack: [
        { category: 'Generation', items: ['Python', 'python-pptx', 'Claude API'] },
        { category: 'Inputs', items: ['Document parsing', 'Template binding'] },
        { category: 'Output', items: ['PPTX', 'Chart-as-image rendering'] },
      ],
    },
  },
  {
    slug: 'structured-product-analytics',
    title: 'Structured-product analytics',
    client: 'Structured-product & portfolio analytics tooling for an investment firm',
    year: '2026',
    date: '2026-01-20',
    status: 'live',
    summary:
      'Structured-product and portfolio analytics tooling for an investment firm — tracks structured products and validates derived metrics against the actual term sheets.',
    detail:
      'A suite of trackers for structured products and accumulators plus an intelligence hub, with a hard rule that every field semantic and derived metric is cross-checked against the underlying term sheet rather than inferred from the database.',
    tags: ['Python', 'Financial analysis', 'Data validation'],
    placeholder: 'from-slate-200/50 via-blue-200/40 to-cyan-200/50',
    longForm: {
      overview:
        'Analytics tooling for an investment firm covering structured products and accumulators, plus a shared intelligence hub. The work centers on getting the numbers provably right — tracking positions and surfacing the derived metrics an advisor needs, validated against source documents.',
      architecture:
        'A typed data layer feeds product trackers and the intelligence hub. The defining principle is validation-against-source: rather than trusting whatever value sits in the database, each field label and derived metric is cross-checked against the actual term sheet (the product’s offering/KIID document) before it is shown or shipped.',
      decisions: [
        {
          title: 'Validate against the term sheet, never the database alone',
          body:
            'Database values can be mislabeled or stale. Every structured-product field semantic and computed metric is reconciled against the underlying term sheet, so a wrong assumption gets caught before it reaches a client view.',
        },
        {
          title: 'Separate trackers, shared data contracts',
          body:
            'Structured products and accumulators have different lifecycles, so they get their own trackers — but both speak the same typed data contracts, which keeps the intelligence hub consistent across product types.',
        },
      ],
      techStack: [
        { category: 'Analytics', items: ['Python', 'Pandas', 'Financial math'] },
        { category: 'Integrity', items: ['Term-sheet validation', 'Typed schemas'] },
        { category: 'Surface', items: ['Trackers', 'Intelligence hub'] },
      ],
    },
  },
  {
    slug: 'whatsapp-broker-bot',
    title: 'WhatsApp broker assistant',
    client: 'AI WhatsApp assistant for Dubai real-estate brokers',
    year: '2026',
    date: '2026-02-15',
    status: 'live',
    summary:
      'Multi-tenant AI WhatsApp assistant for Dubai real-estate brokers — onboarding, lead handling, and DM campaigns, one broker per number.',
    detail:
      'A WhatsApp-native assistant built on Twilio that identifies each broker by their phone number, onboards them through a questionnaire, and runs DM campaigns — productized as a multi-tenant side business.',
    tags: ['Python', 'Twilio', 'WhatsApp', 'Claude API', 'Multi-tenant'],
    placeholder: 'from-green-200/50 via-lime-200/40 to-emerald-200/50',
    longForm: {
      overview:
        'A WhatsApp assistant for Dubai real-estate brokers — my own side business. Brokers live in WhatsApp, so the product meets them there: it onboards a broker through a questionnaire, then helps handle leads and run outbound DM campaigns, all from their existing number.',
      architecture:
        'A multi-tenant Twilio + WhatsApp service. Each broker is identified by the Twilio number they message through, so one deployment serves many brokers with isolated context. An onboarding questionnaire captures each broker’s profile, and a campaign system drives outbound DMs. Claude handles the conversational layer.',
      decisions: [
        {
          title: 'Broker identity = Twilio number',
          body:
            'Keying each tenant off the inbound Twilio number means no login, no app install — the broker just texts, and the system already knows who they are and which context to load.',
        },
        {
          title: 'Onboarding questionnaire before automation',
          body:
            'The bot is only as good as what it knows about the broker. A structured onboarding pass collects that up front, so every later message and campaign is grounded in the broker’s actual listings and style.',
        },
      ],
      techStack: [
        { category: 'Messaging', items: ['Twilio', 'WhatsApp Business'] },
        { category: 'Brain', items: ['Claude API', 'Per-tenant context'] },
        { category: 'Runtime', items: ['Python', 'VPS', 'PM2'] },
      ],
    },
  },
  {
    slug: 'mindfulbiotinker',
    title: 'Mindfulbiotinker',
    client: 'Editorial brand site + AI-tuned content engine',
    year: '2025',
    date: '2025-11-10',
    status: 'live',
    summary:
      'Brand site for a wellness founder, with a live Instagram feed, drafted protocol pages in her voice, and a brand-partner directory that updates in one data-file edit.',
    detail:
      'A multi-page Next.js editorial site with a live IG showcase that pulls her latest posts hourly, a curated discount-codes directory, and a "My Longevity Era" content page where the protocol descriptions are drafted by Claude using a voice profile distilled from her 344-caption corpus. The newsletter runs as a weekly GitHub Actions cron that drafts in her voice, posts to her newsletter platform, and learns from her edits each week.',
    tags: ['Next.js', 'TypeScript', 'Instagram Graph API', 'Voice tuning', 'Cron'],
    placeholder: 'from-rose-200/50 via-pink-200/40 to-emerald-200/50',
    screenshots: [
      { src: '/screenshots/mindfulbiotinker-home.png', alt: 'Mindfulbiotinker homepage', caption: 'Homepage — editorial hero, live Instagram showcase, brand-voice across the site.' },
      { src: '/screenshots/mindfulbiotinker-longevity-era.png', alt: 'My Longevity Era page', caption: 'My Longevity Era — protocol cards drafted in her voice from the caption corpus. Blush wallpaper, alternating image/body layout.' },
      { src: '/screenshots/mindfulbiotinker-brands.png', alt: 'Discount Codes / brand partners', caption: 'Discount Codes — data-driven brand directory. New partners ship in one data.ts edit.' },
    ],
    longForm: {
      overview:
        'Mindfulbiotinker is a production editorial site for a wellness founder building a longevity-focused brand out of Dubai. Live at mindfulbiotinker.com. The work spans three surfaces: the marketing site itself (multi-page Next.js, custom design system, live Instagram feed), a brand-partner directory where each entry updates in a single data-file edit, and a weekly newsletter automation that drafts in her voice and learns from her edits over time.',
      architecture:
        'Three loosely-coupled subsystems sharing a typed data layer. The Next.js site is fully static-generated, with the Instagram showcase hydrated from a JSON file refreshed hourly by a Python cron. The discount-codes page is data-driven — adding a brand is one entry in data.ts plus a scraped logo. The weekly newsletter runs as a GitHub Actions workflow that hits the IG Graph API, drafts via Claude (Sonnet 4.5 with prompt caching on the voice profile), posts to ConvertKit/Kit as a draft, and persists the original draft + a diff-extracted lesson file back to the repo each Sunday — so the system measurably drifts toward her voice each week with no fine-tuning.',
      decisions: [
        {
          title: 'Voice profile before pen-on-paper',
          body:
            "Before drafting a single line of copy, I distilled her 344-caption Instagram corpus into a written voice profile — opener moves, em-dash cadence, vocab signatures, AI-tell phrases to avoid. The profile is saved both as a memory file and as scripts/voice-profile.md in the site repo, so every future generated draft loads it and stays consistent even if anyone else picks up the project later.",
        },
        {
          title: 'Locked row format for partners',
          body:
            "The /brands page is a pure data-driven list. Adding a partner is one entry in data.ts plus a scraped logo — no design decisions per row. The row layout, code-pill alignment, action button variants, and image slot are all locked in the component, which means partner adds ship in ~2 minutes on git push. The same locked format pattern carried over to /longevity-era for protocol cards.",
        },
        {
          title: 'Learning loop, not fine-tuning',
          body:
            "Each Sunday before drafting the new newsletter, the workflow pulls last week's SENT broadcast from Kit, diffs it against the saved AI draft, and asks Claude to extract concrete editing patterns (\"shortens intros\", \"drops sign-offs that start with 'Stay'\"). Those patterns are appended to scripts/edit-lessons.md and baked into the next prompt as few-shot guidance. No fine-tuning, no model state to manage — just an accumulating in-context style guide that gets sharper as the system learns her preferences.",
        },
      ],
      metrics: [
        { label: 'Surfaces shipped', value: '4 pages + automation' },
        { label: 'Caption corpus', value: '344 posts · 308 KB' },
        { label: 'Brand partners listed', value: '9' },
        { label: 'Newsletter run-rate', value: '~$0.01/week' },
      ],
      techStack: [
        { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind'] },
        { category: 'Content engine', items: ['Claude Sonnet 4.5', 'Prompt caching', 'Voice profile'] },
        { category: 'Integrations', items: ['Instagram Graph API', 'ConvertKit V3', 'Discord webhooks'] },
        { category: 'Infra', items: ['GitHub Actions cron', 'Linux cron (hourly IG pull)'] },
      ],
    },
  },
];

/** Canonical project order used everywhere (home + /work).
 *  Client work leads, newest → oldest by `date`; the two personal tooling
 *  builds (automation stack + Mission Control / Bob) are pinned to the bottom,
 *  just below Podster. */
const BOTTOM_PINNED = ['automation-stack', 'mission-control'];
export const projects: Project[] = [...projectsRaw]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .sort((a, b) => {
    const ai = BOTTOM_PINNED.indexOf(a.slug);
    const bi = BOTTOM_PINNED.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0; // both unpinned → keep date order
    if (ai === -1) return -1; // a stays above pinned b
    if (bi === -1) return 1; // b stays above pinned a
    return ai - bi; // both pinned → BOTTOM_PINNED order
  });
