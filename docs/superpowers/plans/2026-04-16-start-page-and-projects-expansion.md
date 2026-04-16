# /start Page and /projects Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a new `/start` beginner education hub with 12 "Coming Soon" article cards across two tracks, add "Start Learning Here" to the main nav, and replace the existing `/projects` cards with 7 real projects carrying colored status badges.

**Architecture:** Static-export Next.js 16 App Router pages. Both pages are server components driven by module-scope arrays — no client state, no fetches. Card styles reuse the existing Torchlight & Grit system (`bg-stone-950`, `border` + accent opacity, `reveal` animations, `font-display` headings). The nav is the only existing client component touched.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind CSS v4 with CSS custom properties for colors, Fraunces + Plus Jakarta Sans via `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-04-16-start-page-and-projects-expansion-design.md`

**Testing note:** This repo has no test suite (`package.json` scripts: `dev`, `build`, `start`, `lint`). Verification is performed via `npm run lint`, `npm run build`, and manual dev-server checks. No test files are added — the spec explicitly calls this out.

**Commit strategy:** The user requested a single final commit with the message `feat: scaffold /start page and expand /projects cards`. Tasks 1–3 stage changes and verify via lint/build; Task 4 performs the single commit.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/Nav.tsx` | Modify | Add "Start Learning Here" link to the `links` array |
| `src/app/start/page.tsx` | Create | `/start` hero + 12-card grid, server component |
| `src/app/projects/page.tsx` | Modify | Replace projects array (4→7), add `status` field + `statusStyles` map, render status pill |

No new components are extracted. The `/start` and `/projects` card markup stays inline inside each page component — both pages are self-contained, and the markup diverges enough (status pill placement, track badge, two-color variation) that a shared card component would be premature abstraction.

---

## Task 1: Add "Start Learning Here" to the main nav

**Files:**
- Modify: `src/components/Nav.tsx:7-13`

- [ ] **Step 1: Update the `links` array**

Open `src/components/Nav.tsx` and replace the `links` array (currently lines 7–13) with this:

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

No other changes in this file — the desktop `<nav>` and mobile menu both iterate `links`, so the new entry renders in both.

- [ ] **Step 2: Run lint to verify no TypeScript/ESLint errors**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run lint
```

Expected: exits 0 with no errors. If ESLint reports issues, fix them before continuing.

---

## Task 2: Create `/start` page with hero + 12-card grid

**Files:**
- Create: `src/app/start/page.tsx`

- [ ] **Step 1: Create the directory**

Run:
```bash
mkdir -p /Users/travisdecker/Projects/wildashenterprises/src/app/start
```

- [ ] **Step 2: Write `src/app/start/page.tsx` with the full page**

Create the file with this exact content:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start Learning Here",
  description:
    "Two tracks for people new to building with AI — understanding what's going on, and actually shipping things.",
};

type Track = "Understanding AI" | "Building Things";
type CardStatus = "coming-soon" | "read";

type StartCard = {
  slug: string;
  title: string;
  description: string;
  track: Track;
  status: CardStatus;
};

// Cards are interleaved UA/BT/UA/BT/... intentionally — we want both tracks
// visible as the reader scrolls, not siloed into two separate lists.
const cards: StartCard[] = [
  {
    slug: "what-is-happening",
    title: "What Is Actually Happening",
    description: "AI isn't searching the web. Here's what it's actually doing.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "github-basics",
    title: "GitHub Basics",
    description:
      "What a repo is, why it matters, and how to get your work off your laptop.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "tokens-and-context",
    title: "Tokens and Context",
    description: "Why Claude forgets things, and what you can do about it.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "deploy-in-minutes",
    title: "Deploy in Minutes",
    description:
      "How Vercel puts your project on the internet in about 30 seconds.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "models-explained",
    title: "Models Explained",
    description:
      "Haiku, Sonnet, Opus — what's the difference and when does it matter.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "cloudflare-and-domains",
    title: "Cloudflare and Domains",
    description: "What Cloudflare does and why your site needs it.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "what-is-an-agent",
    title: "What Is an Agent",
    description:
      "The difference between asking Claude something and having Claude do something.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "what-is-markdown",
    title: "What Is Markdown",
    description:
      "The .md file format — why it travels so well and where it shows up.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "projects-and-memory",
    title: "Projects and Memory",
    description:
      "How to give Claude a longer memory than a single conversation.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "finding-and-using-skills",
    title: "Finding and Using Skills",
    description:
      "How to find Claude skills on GitHub and install them in Claude Code.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "chat-vs-cowork",
    title: "Chat vs. Co-work",
    description:
      "Two ways to use Claude. Which one is right for what you're doing.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "static-vs-backend",
    title: "Static vs. Backend",
    description: "What \"static site\" means, and when you need a backend.",
    track: "Building Things",
    status: "coming-soon",
  },
];

const trackBorder: Record<Track, string> = {
  "Understanding AI": "border-gold/20",
  "Building Things": "border-sage/20",
};

const trackTitle: Record<Track, string> = {
  "Understanding AI": "text-gold",
  "Building Things": "text-sage",
};

const trackBadge: Record<Track, string> = {
  "Understanding AI": "text-gold border-gold/30",
  "Building Things": "text-sage border-sage/30",
};

const statusBadge: Record<CardStatus, string> = {
  "coming-soon": "text-copper/70 border-copper/30",
  read: "text-gold border-gold/40",
};

const statusLabel: Record<CardStatus, string> = {
  "coming-soon": "Coming Soon",
  read: "Read",
};

export default function StartPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-4">
          Where to Start
        </p>
        {/* TODO: replace placeholder headline with final Travis-voice copy */}
        <h1 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
          You don&apos;t need a CS degree.
          <br />
          <span className="text-parchment-dim">You need a starting point.</span>
        </h1>
        {/* TODO: replace placeholder intro with final Travis-voice copy */}
        <p className="reveal reveal-delay-2 text-parchment-dim text-lg mt-6 max-w-2xl leading-relaxed">
          Two tracks, woven together. One is about understanding what AI is
          actually doing under the hood so you stop feeling lost. The other is
          the practical stuff — GitHub, Vercel, domains, the words you keep
          hearing but nobody defined for you. Read them in any order.
        </p>

        {/* Card grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <Link
              key={card.slug}
              href={`/start/${card.slug}`}
              className={`reveal reveal-delay-${(i % 5) + 1} border ${trackBorder[card.track]} bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500 flex flex-col`}
            >
              <span
                className={`self-start text-xs tracking-[0.2em] uppercase border px-3 py-1 ${trackBadge[card.track]}`}
              >
                {card.track}
              </span>
              <h2
                className={`font-display text-2xl md:text-3xl leading-tight mt-6 ${trackTitle[card.track]} group-hover:brightness-125 transition-all duration-500`}
              >
                {card.title}
              </h2>
              <p className="text-parchment-dim mt-3 leading-relaxed">
                {card.description}
              </p>
              <span
                className={`self-start mt-6 text-xs tracking-[0.2em] uppercase border px-3 py-1 ${statusBadge[card.status]}`}
              >
                {statusLabel[card.status]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run lint**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run lint
```

Expected: exits 0 with no errors.

- [ ] **Step 4: Run the production build to confirm static export succeeds**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run build
```

Expected: build completes successfully. In the route table, `/start` appears as a static route (`○` or similar static indicator depending on Next's output format). No TypeScript errors, no "Html should not be imported outside of pages/_document" or similar errors.

- [ ] **Step 5: Start the dev server and visually verify**

Run (background):
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run dev
```

Open `http://localhost:3000/start`. Verify:
1. Nav shows "Start Learning Here" between Home and Blog, and it's highlighted gold (active state) while on `/start`.
2. Hero renders with gold "Where to Start" eyebrow, display-font headline, and dim-parchment intro.
3. Grid shows 12 cards in the interleaved order listed in the `cards` array (row 1: "What Is Actually Happening" + "GitHub Basics"; row 2: "Tokens and Context" + "Deploy in Minutes"; etc).
4. Understanding AI cards have gold titles + gold border badge. Building Things cards have sage titles + sage border badge.
5. All 12 cards show a copper "Coming Soon" pill at the bottom.
6. Hover on any card darkens background to `stone-900` and brightens the title.
7. Clicking a card navigates to `/start/<slug>` (404 expected — this is the intended behavior until articles ship).
8. Mobile (≤768px via devtools): single-column grid, nav collapses into hamburger, tapping reveals "Start Learning Here".

Stop the dev server when done.

---

## Task 3: Expand `/projects` to 7 cards with status badges

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Replace the entire file contents**

Open `src/app/projects/page.tsx` and replace the full file with this:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Travis has built or helped build — proof that this stuff actually works.",
};

type Status = "Live" | "Prototype" | "Personal";
type Accent = "gold" | "copper" | "sage";

type Project = {
  name: string;
  description: string;
  tags: string[];
  status: Status;
  accent: Accent;
};

// TODO: tighten copy voice pass — descriptions below are spec-derived placeholders
const projects: Project[] = [
  {
    name: "Family Finance Tracker",
    description:
      "Personal finance and FIRE planning tool built for real family use. FastAPI, PostgreSQL, Next.js, runs on a home server.",
    tags: ["Python", "Next.js", "Supabase"],
    status: "Live",
    accent: "gold",
  },
  {
    name: "EV Partner Resource Hub",
    description:
      "Tech support and resource site for EV business partners.",
    tags: ["Next.js", "TypeScript"],
    status: "Live",
    accent: "copper",
  },
  {
    name: "Malcolm's Personal Site",
    description:
      "Personal site built with and for a teenager learning to put his work on the web.",
    tags: ["Next.js", "Vercel"],
    status: "Live",
    accent: "sage",
  },
  {
    name: "Olive's Bug Guide",
    description:
      "Portland native bug identification guide, built as a family AI project. 23 bugs, all local.",
    tags: ["Next.js", "Vercel"],
    status: "Live",
    accent: "gold",
  },
  {
    name: "The Game Master",
    description:
      "Drop any book in. Play inside the story as a D&D campaign with persistent NPCs and consequences. Enhanced with a voice skill from GitHub.",
    tags: ["Claude Code", "RAG", "ChromaDB"],
    status: "Personal",
    accent: "copper",
  },
  {
    name: "Family Counseling Space",
    description:
      "A shared Claude Project used as a persistent space for family conversation and reflection.",
    tags: ["Claude Projects"],
    status: "Personal",
    accent: "sage",
  },
  {
    name: "AquaTrack",
    description:
      "Crowdsourced water quality monitoring for outdoor swimmers. Scan a test strip, pin results on a community map.",
    tags: ["React Native", "Supabase", "Mapbox"],
    status: "Prototype",
    accent: "gold",
  },
];

const accentColors: Record<Accent, string> = {
  gold: "text-gold border-gold/20",
  copper: "text-copper border-copper/20",
  sage: "text-sage border-sage/20",
};

const tagColors: Record<Accent, string> = {
  gold: "text-gold/70",
  copper: "text-copper/70",
  sage: "text-sage/70",
};

const statusStyles: Record<Status, string> = {
  Live: "text-sage border-sage/40",
  Prototype: "text-copper border-copper/40",
  Personal: "text-parchment-dim border-stone-700",
};

export default function ProjectsPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-4">
          Projects
        </p>
        <h1 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
          Proof, not promises.
        </h1>
        <p className="reveal reveal-delay-2 text-parchment-dim text-lg mt-6 max-w-2xl">
          Everything here was built by one person with AI. Not a dev team. Not a
          consulting engagement. Just a guy who got tired of doing everything
          manually.
        </p>

        {/* Projects grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className={`reveal reveal-delay-${(i % 5) + 1} border ${accentColors[project.accent]} bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500`}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs tracking-wide uppercase ${tagColors[project.accent]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className={`shrink-0 text-xs tracking-[0.2em] uppercase border px-3 py-1 ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
              <h2
                className={`font-display text-2xl md:text-3xl leading-tight ${accentColors[project.accent].split(" ")[0]} group-hover:brightness-125 transition-all duration-500`}
              >
                {project.name}
              </h2>
              <p className="text-parchment-dim mt-4 leading-relaxed">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run lint
```

Expected: exits 0 with no errors.

- [ ] **Step 3: Run the build**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run build
```

Expected: build succeeds. `/projects` still appears as a static route in the route summary.

- [ ] **Step 4: Start the dev server and visually verify**

Run (background):
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run dev
```

Open `http://localhost:3000/projects`. Verify:
1. Seven cards render in this order: Family Finance Tracker, EV Partner Resource Hub, Malcolm's Personal Site, Olive's Bug Guide, The Game Master, Family Counseling Space, AquaTrack.
2. Each card shows the correct status pill with correct color:
   - Live → sage text + sage/40 border (cards 1–4)
   - Personal → parchment-dim text + stone-700 border (cards 5, 6)
   - Prototype → copper text + copper/40 border (card 7)
3. Accent cycle gold → copper → sage → gold → copper → sage → gold across the 7 cards (title color + border).
4. Status pill sits on the same row as the tags, right-aligned; on narrow cards the tags wrap under rather than the pill disappearing (thanks to `shrink-0` on the pill).
5. Hover still darkens the card and brightens the title.
6. Mobile (≤768px): single-column, the pill and tags still share the top row.

Stop the dev server when done.

---

## Task 4: Single commit per user-specified message

**Files:** None (committing staged changes from Tasks 1–3)

- [ ] **Step 1: Run lint + build one more time as a final gate**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && npm run lint && npm run build
```

Expected: both succeed. If either fails, stop and fix before committing.

- [ ] **Step 2: Review the diff**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && git status && git diff --stat
```

Expected: three files listed:
- Modified: `src/components/Nav.tsx`
- Modified: `src/app/projects/page.tsx`
- New/untracked: `src/app/start/page.tsx`

No other files should show up. If `out/`, `.next/`, or any unrelated file appears, stop — `.gitignore` should already exclude those; investigate before adding anything.

- [ ] **Step 3: Stage and commit**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && git add src/components/Nav.tsx src/app/projects/page.tsx src/app/start/page.tsx && git commit -m "$(cat <<'EOF'
feat: scaffold /start page and expand /projects cards

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit succeeds. The first line of the commit message matches the user's exact request (`feat: scaffold /start page and expand /projects cards`).

- [ ] **Step 4: Verify the commit landed**

Run:
```bash
cd /Users/travisdecker/Projects/wildashenterprises && git log --oneline -3
```

Expected: the new commit is at the top, above the earlier spec-doc commit (`docs: design spec for /start page and /projects expansion`).

---

## Done

All tasks complete when:
1. `npm run lint` passes
2. `npm run build` passes
3. `/start` renders 12 cards with correct track colors and "Coming Soon" pills
4. `/projects` renders 7 cards with correctly colored status pills
5. Nav shows "Start Learning Here" on desktop and mobile
6. A single commit titled `feat: scaffold /start page and expand /projects cards` sits at HEAD
