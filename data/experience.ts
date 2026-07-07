export type Experience = {
  role: string;
  org: string;
  location: string;
  dates: string;
  /** ISO-ish sort key (YYYY-MM), newest first. */
  sort: string;
  tag: string;
  summary: string; // one-line org descriptor shown collapsed
  bullets: string[]; // detail revealed on expand
  /** When true, dates are hidden in the collapsed header and shown only on expand. */
  datesOnExpand?: boolean;
};

/** Real resume entries, newest first. */
export const EXPERIENCE: Experience[] = [
  {
    role: 'Intern',
    org: 'Apollo Private Wealth',
    location: 'London, UK',
    dates: 'Jun–Jul 2026',
    sort: '2026-06',
    tag: 'Wealth Management',
    summary: 'Multi-family private wealth management practice serving high-net-worth clients.',
    bullets: [
      'Summer intern at a multi-family private wealth practice advising high-net-worth families.',
      "Built a reporting-automation system that composes the practice's client strategy proposals and post-meeting review decks straight from client documents — a pre-meeting plan before the conversation and an annual-review pack after — formatted to the firm's house template.",
      'Supported advisers across the client lifecycle: preparing meeting materials, running investment and market research, and turning client documents into client-ready analysis.',
      'Contributed to portfolio review and client-reporting workflows, helping the practice deliver a more consistent, higher-quality client experience.',
    ],
  },
  {
    role: 'Intern',
    org: 'Vantage Capital',
    location: 'Dubai, UAE',
    dates: 'Jun 2025 · Dec 2025–Jan 2026 · May–Aug 2026',
    sort: '2026-05',
    tag: 'Investment Analytics',
    summary: 'Investment firm — structured products & portfolio analytics.',
    datesOnExpand: true,
    bullets: [
      "Attended 5 of the firm's strategy sessions — held each quarter and half-year to set business-development direction — and sat in on live client calls across the investment team.",
      "Built a structured-product tracker delivered to the firm's clients: tracks positions and surfaces the derived metrics advisors rely on, with every field and metric validated against the source term sheets so the numbers are provably right before they reach a client.",
      'Ran extensive equity research on the AI build-out — identifying companies and complementary industries positioned to benefit as the AI and technology cycle runs hot.',
      'Researched defensive, substitute industries that outperform when the tech/AI sector sells off — building a hedge against the sector’s volatility for client portfolios.',
      'Supported portfolio construction, investment-thesis work, and client-ready reporting across a fast-moving market backdrop.',
    ],
  },
  {
    role: 'Intern',
    org: 'Secretariat',
    location: 'Dubai, UAE',
    dates: 'May–Aug 2025',
    sort: '2025-05',
    tag: 'Consulting',
    summary: 'Global consulting firm specializing in compliance, investigations & disputes.',
    bullets: [
      "Redesigned the firm's hourly billing system in Excel with automated macros that generate client-ready invoices — cutting weekly reporting time in half and producing utilization summaries still in use today.",
      'Built LLM & multi-agent automations for client document intake, data entry, and research, and trained staff on them — cutting day-to-day task time by 200%+ weekly.',
      "Wrote market-research memos on evolving cryptocurrency regulation, helping high-profile clients build compliance strategies under Dubai's shifting regulatory frameworks.",
    ],
  },
  {
    role: 'Mentor',
    org: 'John M. Barry Boys & Girls Club (PULSE)',
    location: 'Newton, MA',
    dates: 'Sep 2025–May 2026',
    sort: '2025-09',
    tag: 'Leadership',
    summary: 'Youth-development non-profit (ages 6–18).',
    bullets: [
      'Mentored ~100 children (7–15) across academics and emotional growth; contributed to the Athletics and Teen Education departments incl. social-media marketing and tutoring.',
      'Resolved interpersonal conflicts using structured communication and de-escalation, keeping a safe, inclusive environment.',
    ],
  },
  {
    role: 'Intern',
    org: 'Bank of Singapore — Private Bank',
    location: 'Dubai, UAE',
    dates: 'Jul–Aug 2023',
    sort: '2023-07',
    tag: 'Private Banking',
    summary: 'Asian private bank for high-net-worth wealth management.',
    bullets: [
      'Sat in on ~10 client and internal meetings across asset-class allocation, client discussions, onboarding, and operations — learning banker rationale and strategy.',
      'Built 3 allocation models for growth, balanced, and capital-preservation risk profiles (factoring monetary policy, commodities, and sector views), distributed to bankers for portfolio discussions.',
    ],
  },
  {
    role: 'Assistant Coach',
    org: 'NBA Basketball School',
    location: 'Dubai, UAE',
    dates: 'Dec 2022–May 2024',
    sort: '2022-12',
    tag: 'Leadership',
    summary: 'NBA-affiliated player-development club.',
    bullets: [
      'Developed athletic fundamentals, teamwork, and discipline for kids (7–12), with emphasis on personal growth.',
      'Helped design lesson plans and drills and worked 1:1 to build skill and confidence.',
    ],
  },
];
