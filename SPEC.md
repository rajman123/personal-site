# Personal Website — Design Spec

**Date:** 2026-05-04
**Owner:** Rajveer Gehani
**Repo target:** `github.com/rajman123/<repo-name-tbd>` (personal account, NOT vgehani-code)
**Domain target:** `rajveergehani.com` (acquire when ~80% built)
**v1 timeline:** 2-3 evenings of build work, then iterate

## 1. Purpose & Audience

A personal website that serves two audiences with one design, B-primary:

- **Primary (B):** Potential AI-agent clients in Rajveer's existing warm-lead network (largely sourced through Dubai/family connections). The site reinforces credibility *after* an introduction; it is not cold-traffic acquisition. Visitors arrive having already heard about Rajveer from a trusted source.
- **Secondary:** A resume-link target — a single URL Rajveer can put on a CV or send to a recruiter that shows he ships real work alongside his BC '28 Finance + CS background.

The design must pass the "Google him" test: when a warm lead Googles Rajveer's name, the site should make him look more legitimate than they expected, not less.

## 2. Goals (v1)

- Convert warm leads into discovery calls (primary CTA: **Book a call** via Calendly)
- Capture interested-but-not-ready visitors via email signup (secondary CTA)
- Showcase 3 case studies as concrete proof-of-execution
- Ship within ~2-3 evenings of focused work, then iterate live

**Non-goals for v1:** SEO/cold-traffic optimization, blog/CMS, multi-language, pricing pages, client login, payment integration.

## 3. Visual Direction

Dark mode by default. Polished, considered typography. Generous whitespace. Subtle motion on hover/scroll (Framer Motion). Image-forward — case studies carry meaning through screenshots and tags, not paragraphs of prose.

**Reference anchor:** `brittanychiang.com` (single-page dark portfolio, sticky nav, smooth scroll) — leveled up with more visual polish and motion. Less text than typical dev portfolios; the user has explicitly rejected text-heavy sites.

**Type pairing:** one sans-serif for prose (e.g., Inter or Geist Sans) + one monospace for code/tech tags (e.g., JetBrains Mono or Geist Mono).

**Color base:**
- Background: near-black with very subtle warm-dark gradient
- Foreground: off-white prose, muted gray for secondary text
- Accent: a single vivid accent color (TBD during build — likely electric blue or warm amber, picked against the photo)

**Motion:** restrained. Hover lifts on cards, subtle fade-in on scroll, no parallax tricks or autoplay video.

## 4. Structure

**Single-page application** with a sticky top nav. Nav links smooth-scroll to in-page sections (no full page reloads). On mobile, nav collapses to a hamburger.

### 4.1 Hero
- Hero photo (clean dark-gradient backdrop) on one side, text on the other (stacked on mobile)
- Headline: short, declarative one-liner — to be finalized during build, working draft: *"I build AI agents that run real workflows."*
- Subhead (1 sentence): *"BC '28 — Finance + CS. Currently building autonomous tooling for founders who want to ship without hiring."* (working draft, refine in build)
- Two CTAs: primary `Book a call` (scrolls to Contact / opens Calendly modal) and secondary `See work` (scrolls to Work)

### 4.2 Work
- Three case study cards in a grid (responsive: 3-up on desktop, 1-up on mobile):
  1. **Podster** — production AI-driven podcast tooling (real client, vgehani-code/podster). Tags: Next.js, Claude API, multi-agent, production.
  2. **Mission Control + Bob** — autonomous personal AI system; screenshots blurred to protect personal data. Tags: Next.js, Claude API, Discord bots, cron, multi-agent.
  3. **Multi-agent automation stack** — morning email routine, executor cron, Discord-driven workflow. Tags: Python, Claude API, Discord, automation.
- Each card: hero image (~16:9), 2-sentence summary, 3-4 tech tags, expand-to-read-more inline (no modal — accordion-style in-place expansion)
- Card hover state: subtle lift + accent border

### 4.3 About
- Short paragraph (~50 words). Working draft: *"I'm Rajveer. I study Finance and CS at Boston College, and on the side I build AI agents that take repetitive work off founders' plates. I split time between Boston and Dubai, and I'm currently taking on a small number of summer engagements."*
- Small portrait photo or signature mark (TBD — may reuse hero photo at smaller scale)

### 4.4 Contact
- Calendly inline embed (intro call, 30 min) — primary mechanism
- Email signup form below — secondary mechanism. Working copy: *"Or just follow along — occasional updates when I ship something."*
- Footer: minimal. Email link, GitHub link (`rajman123`), copyright.

## 5. Content Inventory

| Item | Source | Status |
|---|---|---|
| Hero photo (clean background) | Original DSC00684.jpg, processed via rembg + dark-gradient composite | In progress (background subagent) — output: `/root/website-build/assets/rajveer-photo-v1-clean.png` |
| Podster screenshots | To be captured from production app | TODO during build |
| Mission Control screenshots (blurred) | Capture from `http://72.61.71.98:3000`, blur personal data per Fiverr precedent | TODO during build |
| Multi-agent stack visual | Likely a stylized diagram or terminal capture | TODO during build |
| Calendly link | Rajveer setting up now | Pending |
| Email subscriber sink | Form → email-to-Rajveer + log to Google Sheet | TODO during build |
| Domain | `rajveergehani.com` via Namecheap or Cloudflare (~$12/yr) | Defer until ~80% built |

## 6. Tech Stack

- **Framework:** Next.js (App Router). Reason: Rajveer already maintains the Mission Control app in Next, so he can edit this site himself going forward without learning a new framework. Astro would be a marginally better technical fit for a static portfolio, but familiarity wins for a site Rajveer will own long-term.
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion (`motion` package).
- **Hosting:** Vercel (free tier, auto-deploy from GitHub, custom domain support).
- **Repo:** GitHub under `rajman123/` (personal account). Repo name to be decided during plan phase — likely `personal-site` or `rajveergehani.com`.
- **Email signup backend (v1):** Server action that sends Rajveer an email and appends the address to a Google Sheet. Graduate to Buttondown or ConvertKit after 10+ subscribers.
- **Calendly:** inline iframe embed; account created by Rajveer.

## 7. Out of Scope (deferred)

- Blog / writing section (defer until Rajveer has 2-3 posts in mind)
- Newsletter tooling beyond simple form (defer until 10+ subscribers)
- Analytics beyond Vercel's built-in (defer until needed)
- Pricing / package pages (intentionally absent — discovery call first)
- Multi-language / Arabic localization (defer; consider for v2 if Dubai pipeline grows)
- Bookmarks watcher / dynamic content (orthogonal — not part of website project)

## 8. Open Items

- **Tagline copy** — finalize during build with Rajveer's input
- **Accent color** — pick during build against the actual photo
- **Repo name** — decide during plan phase
- **Calendly link** — Rajveer setting up; will be wired in once received
- **Photo cleanup result** — verify quality before using; if rembg fails to produce a clean cut on Rajveer's curly hair, fall back to either a different model or a manual edit pass

## 9. Success Criteria for v1

The website is "v1-done" when:
- All 4 sections render correctly on desktop and mobile
- Calendly booking works end-to-end (test booking → confirmation email received)
- Email signup form delivers to Rajveer's inbox and logs to the sheet
- Three case studies are populated with real screenshots and final copy
- Hero photo is clean and matches the site's aesthetic
- Site is deployed to Vercel and accessible at a `vercel.app` URL (custom domain pointed after Rajveer buys it)
- A real warm lead can be sent the URL without Rajveer feeling embarrassed about anything they'll see

## 10. After v1

- Buy `rajveergehani.com` and point it at the Vercel deployment
- Add new case studies as Rajveer ships client work over the summer
- Replace placeholder photo with a professional headshot
- Consider adding a writing/blog section once there's content to populate it
- Track conversion (calls booked / signup rate) and iterate
