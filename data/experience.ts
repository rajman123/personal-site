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
    role: 'Incoming Intern',
    org: 'Apollo Private Wealth',
    location: 'London, UK',
    dates: 'Jun–Jul 2026',
    sort: '2026-06',
    tag: 'Wealth Management',
    summary: 'Multi-family private wealth management firm.',
    bullets: ['Incoming summer intern at a multi-family private wealth management firm.'],
  },
  {
    role: 'Quantitative Developer',
    org: 'Vantage Capital',
    location: 'Dubai, UAE',
    dates: 'Jun 2025 · Dec 2025–Jan 2026 · May–Aug 2026',
    sort: '2026-05',
    tag: 'Investment Analytics',
    summary: 'Investment firm — structured products & portfolio analytics.',
    datesOnExpand: true,
    bullets: [
      'Build structured-product & portfolio analytics tooling for the firm — tracking positions and surfacing the derived metrics advisors rely on.',
      'Validate every derived metric against the source term sheets so the numbers are provably right before they reach an advisor.',
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
