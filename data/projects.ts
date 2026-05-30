export type ProjectStatus = 'ongoing' | 'live' | 'completed';

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
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

export const projects: Project[] = [
  {
    slug: 'podster',
    title: 'Podster',
    client: 'Production AI podcast tooling',
    year: '2026',
    status: 'live',
    summary:
      'Multi-agent system that turns long-form audio into publish-ready episode pages, transcripts, and clip suggestions.',
    detail:
      'Built with a small team of agents — one transcribes, one researches the guest, one drafts the show page, one critiques the draft. Each agent has a narrow job and a hard contract. The orchestrator decides when to retry, when to escalate, and when to ship. In production today.',
    tags: ['Next.js', 'Claude API', 'Multi-agent', 'Production'],
    placeholder: 'from-orange-900/40 via-amber-900/30 to-rose-900/40',
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
    status: 'ongoing',
    summary:
      'A live dashboard and 24/7 agent ("Bob") that runs my calendar, networking pipeline, and morning briefings end-to-end.',
    detail:
      'The dashboard surfaces tasks, drafts, and outstanding decisions. Bob runs on cron, takes initiative on idle nights (research, summaries), and routes everything through Discord. Screenshots blurred — it has my actual data in it.',
    tags: ['Next.js', 'Claude API', 'Discord bots', 'Cron', 'Multi-agent'],
    placeholder: 'from-emerald-900/40 via-teal-900/30 to-sky-900/40',
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
        { label: 'Discord channels', value: '4 workflow + DMs' },
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
    status: 'live',
    summary:
      'Modular Python stack — morning email routine, executor cron, Discord-driven workflows. Drop-in for solo founders.',
    detail:
      'Workflow-per-channel routing, an executor that picks up tasks from a queue and runs them with full context, retry/checkpoint semantics, and a tick loop that schedules itself. Designed so a non-engineer can read what it did and why.',
    tags: ['Python', 'Claude API', 'Discord', 'Automation'],
    placeholder: 'from-violet-900/40 via-fuchsia-900/30 to-pink-900/40',
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
    slug: 'mindfulbiotinker',
    title: 'Mindfulbiotinker',
    client: 'Editorial brand site + AI-tuned content engine',
    year: '2026',
    status: 'live',
    summary:
      'Brand site for a wellness founder, with a live Instagram feed, drafted protocol pages in her voice, and a brand-partner directory that updates in one data-file edit.',
    detail:
      'A multi-page Next.js editorial site with a live IG showcase that pulls her latest posts hourly, a curated discount-codes directory, and a "My Longevity Era" content page where the protocol descriptions are drafted by Claude using a voice profile distilled from her 344-caption corpus. The newsletter runs as a weekly GitHub Actions cron that drafts in her voice, posts to her newsletter platform, and learns from her edits each week.',
    tags: ['Next.js', 'TypeScript', 'Instagram Graph API', 'Voice tuning', 'Cron'],
    placeholder: 'from-rose-900/30 via-pink-900/20 to-emerald-900/40',
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
