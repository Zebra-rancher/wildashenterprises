# Start Page + Projects Expansion — Design

**Date:** 2026-04-16
**Scope:** Two related front-end changes to wildashenterprises.com — a new `/start` beginner education hub and expanded cards on the existing `/projects` page.

## Goals

1. Create `/start` — a beginner-focused education hub with two woven content tracks ("Understanding AI", "Building Things") presented as a grid of stub article cards. Cards link to `/start/[slug]` routes that do not exist yet; all cards default to "Coming Soon".
2. Refresh `/projects` — replace the current 4 placeholder projects with 7 real projects, each carrying a status badge (Live / Prototype / Personal) in addition to the existing accent color and tags.
3. Add a "Start Learning Here" link to the main nav.

## Non-Goals

- No `/start/[slug]` article pages. The slugs exist only as link targets.
- No MDX wiring, CMS, or content pipeline.
- No new dependencies.
- No redesign of existing sections — this work matches the current Torchlight & Grit system exactly.

## Design System Conformance

All new UI must use existing patterns from `src/app/page.tsx` and `src/app/projects/page.tsx`:

- Container: `mx-auto max-w-6xl px-6`
- Page hero padding: `pt-36 pb-24 md:pt-44 md:pb-32`
- Section padding between major blocks: `py-24 md:py-32`, with `border-t border-stone-800` divider
- Eyebrow label: `text-sm tracking-[0.25em] uppercase` in `text-gold`, `text-copper`, or `text-sage`
- Headings: `font-display` (Fraunces) with `leading-tight`
- Body text: `text-parchment-dim` for secondary, `text-parchment` for primary emphasis
- Card base: `border bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500`
- Animation: `reveal reveal-delay-{1..N}` classes already defined in `globals.css`

## Changes

### 1. `src/components/Nav.tsx`

Insert new nav link between "Home" and "Blog":

```ts
const links = [
  { href: "/", label: "Home" },
  { href: "/start", label: "Start Learning Here" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/links", label: "Links" },
  { href: "/contact", label: "Contact" },
];
```

No other component changes. Mobile menu picks up the new link automatically since it iterates the same array.

### 2. `src/app/start/page.tsx` (NEW)

Client-free server component. Structure:

**Hero section** (matches `/projects` hero structure):
- Eyebrow: `Where to Start` (gold)
- H1: `font-display text-4xl md:text-5xl lg:text-6xl` — headline TBD, placeholder TODO
- Subheading: `text-parchment-dim text-lg` — 2–3 sentence intro in Travis voice, placeholder TODO

**Cards grid** (below hero, with ≥`mt-16`):
- `grid md:grid-cols-2 gap-6`
- 12 cards driven by a single array, interleaved UA/BT/UA/BT/... down the list
- Each card is a `<Link href={`/start/${slug}`}>` so the entire card is clickable
- Card content (in order):
  1. Track badge — small pill, uppercase tracking, `text-xs`:
     - Understanding AI: `text-gold border-gold/30`
     - Building Things: `text-sage border-sage/30`
  2. H2 title — `font-display text-2xl md:text-3xl`, colored to match track (`text-gold` or `text-sage`), with `group-hover:brightness-125 transition-all duration-500`
  3. 1-sentence description — `text-parchment-dim mt-3 leading-relaxed`
  4. Status pill (bottom of card, `mt-6`):
     - Coming Soon: `text-copper/70 border-copper/30`
     - Read: `text-gold border-gold/40` (not used yet; defined so enabling an article is a single-field change)
- Card border uses the track color at `/20` opacity to echo `/projects` pattern
- Cards apply `reveal reveal-delay-{(i%5)+1}` so the grid staggers without overflowing the five defined delays

**Card data** (interleaved, in render order):

| # | Track | Slug | Title (uses slug-derived display title) | Description |
|---|-------|------|----|----|
| 1 | UA | what-is-happening | What Is Actually Happening | AI isn't searching the web. Here's what it's actually doing. |
| 2 | BT | github-basics | GitHub Basics | What a repo is, why it matters, and how to get your work off your laptop. |
| 3 | UA | tokens-and-context | Tokens and Context | Why Claude forgets things, and what you can do about it. |
| 4 | BT | deploy-in-minutes | Deploy in Minutes | How Vercel puts your project on the internet in about 30 seconds. |
| 5 | UA | models-explained | Models Explained | Haiku, Sonnet, Opus — what's the difference and when does it matter. |
| 6 | BT | cloudflare-and-domains | Cloudflare and Domains | What Cloudflare does and why your site needs it. |
| 7 | UA | what-is-an-agent | What Is an Agent | The difference between asking Claude something and having Claude do something. |
| 8 | BT | what-is-markdown | What Is Markdown | The .md file format — why it travels so well and where it shows up. |
| 9 | UA | projects-and-memory | Projects and Memory | How to give Claude a longer memory than a single conversation. |
| 10 | BT | finding-and-using-skills | Finding and Using Skills | How to find Claude skills on GitHub and install them in Claude Code. |
| 11 | UA | chat-vs-cowork | Chat vs. Co-work | Two ways to use Claude. Which one is right for what you're doing. |
| 12 | BT | static-vs-backend | Static vs. Backend | What "static site" means, and when you need a backend. |

All 12 cards have `status: "coming-soon"` for now.

**Metadata export:**
```ts
export const metadata: Metadata = {
  title: "Start Learning Here",
  description: "Two tracks for people new to building with AI — understanding what's going on, and actually shipping things.",
};
```

### 3. `src/app/projects/page.tsx` (REPLACE projects array)

Replace the existing `projects` array with 7 entries. Keep the `accent` rotation (gold → copper → sage → gold → copper → sage → gold) so visual variety is preserved. Add a new `status` field ("Live" | "Prototype" | "Personal") and a status pill rendered in the top-right of the card header area.

**New status color map:**
```ts
const statusStyles: Record<string, string> = {
  Live: "text-sage border-sage/40",
  Prototype: "text-copper border-copper/40",
  Personal: "text-parchment-dim border-stone-700",
};
```

**Projects:**

| # | Name | Status | Accent | Tags | Description |
|---|------|--------|--------|------|-------------|
| 1 | Family Finance Tracker | Live | gold | Python, Next.js, Supabase | Personal finance and FIRE planning tool built for real family use. FastAPI, PostgreSQL, Next.js, runs on a home server. |
| 2 | EV Partner Resource Hub | Live | copper | Next.js, TypeScript | Tech support and resource site for EV business partners. |
| 3 | Malcolm's Personal Site | Live | sage | Next.js, Vercel | Personal site built with and for a teenager learning to put his work on the web. |
| 4 | Olive's Bug Guide | Live | gold | Next.js, Vercel | Portland native bug identification guide, built as a family AI project. 23 bugs, all local. |
| 5 | The Game Master | Personal | copper | Claude Code, RAG, ChromaDB | Drop any book in. Play inside the story as a D&D campaign with persistent NPCs and consequences. Enhanced with a voice skill from GitHub. |
| 6 | Family Counseling Space | Personal | sage | Claude Projects | A shared Claude Project used as a persistent space for family conversation and reflection. |
| 7 | AquaTrack | Prototype | gold | React Native, Supabase, Mapbox | Crowdsourced water quality monitoring for outdoor swimmers. Scan a test strip, pin results on a community map. |

Card layout changes:
- Add a status pill adjacent to the tags row (right-aligned on the first line)
- Description text is marked with a `{/* TODO: tighten voice pass */}` comment above each card's `description` entry since copy may evolve

**Grid adjustment:**
- Current `md:grid-cols-2` is kept. 7 cards means the last row has one card; that's fine and echoes the asymmetric feel of the rest of the site.

## Data Flow

Both pages are fully static — arrays are declared at module scope, rendered directly. No fetches, no client state, no hydration beyond the existing `Nav` client component. The static export (`out: export` in `next.config.ts`) continues to work unchanged.

## Error Handling

Not applicable — purely presentational static pages. Broken slug links on `/start/[slug]` resolve to Next.js's default 404 (the dynamic segment doesn't exist yet), which is the intended behavior for "Coming Soon" cards.

## Testing

Manual verification checklist:
1. `npm run build` succeeds with no TypeScript errors
2. `npm run dev` — visit `/start`, confirm 12 cards render in UA/BT alternating order, all show "Coming Soon"
3. Nav shows "Start Learning Here" between Home and Blog on desktop and mobile menu
4. Active nav state (gold) shows when on `/start`
5. `/projects` shows 7 cards, each with a correctly colored status pill
6. Hover states work on both pages (bg-stone-950 → bg-stone-900, brightness on title)
7. Mobile: single-column grid on both pages at `<768px`
8. Click a `/start` card — lands on a 404 (expected until articles ship)

No automated tests are added. This is a static content change; existing test infra doesn't cover pages.

## Risks & Open Questions

- **Card density on `/start`:** 12 cards is more than `/projects` has ever had. If it feels overwhelming we may later add a track filter. Not in this scope.
- **Slug/title mismatch:** The spec uses short slugs but card titles read more like headlines. The table above locks the mapping; any rewording happens in implementation.
- **Status vs. accent confusion:** Three colored accents (gold/copper/sage) + three status colors (sage/copper/parchment-dim) could muddy the palette. The status pill is a small bordered element with a color that reads as meta-info, not a card-level accent. Verify visually in implementation and adjust opacity if it competes with the title color.

## Commit Message

`feat: scaffold /start page and expand /projects cards`
