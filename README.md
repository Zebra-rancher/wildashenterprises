# wildashenterprises.com

Personal site for Wildash Enterprises. Next.js 16 (App Router) → static export → Cloudflare Pages.

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Build

```bash
npm run build
```

`next.config.ts` has `output: "export"`, so the build emits a static site into `out/`. There's no Node server runtime at deploy time.

## Deploy (Cloudflare Pages)

**Current mechanism: unclear — needs verification.** Pick one:

### Option A — Git integration (auto-deploy on push)

If Cloudflare Pages is wired up to this GitHub repo, pushes to `main` build automatically. Verify at:

- https://dash.cloudflare.com → Workers & Pages → wildash project → Settings → Build
- Build command: `npm run build`
- Build output directory: `out`

To check if a recent push deployed, watch: https://dash.cloudflare.com → Workers & Pages → wildash → Deployments.

### Option B — Manual via Wrangler

```bash
npm run build
npx wrangler pages deploy out --project-name=<project-name>
```

Requires `CLOUDFLARE_API_TOKEN` scoped to the right account (account id `f4b09f8bd03474fa0fcd492708ba2e0c`, per the stale `wrangler.json`).

## Known cleanup

- **`wrangler.json` is stale.** It points at `.open-next/worker.js` from a prior attempt to deploy via Cloudflare Workers + `@opennextjs/cloudflare` (commit `e7e55a7`). That path was reverted (`64993f9`) in favor of static export to Pages. The file is unused and can be deleted unless manual Wrangler deploys reference the `name` field.
- **`eslint.config.mjs` doesn't ignore `.open-next/`.** `npm run lint` exits non-zero because the leftover Cloudflare Workers build output contains a `require()` call. Add `".open-next/**"` to `globalIgnores` in the ESLint config to fix.
- **`scripts/`** is present but untracked in git — unclear what's in it.

## Stack

- Next.js 16, React 19, TypeScript 5
- Tailwind CSS v4 (CSS custom properties, `@theme inline`)
- Fonts: Fraunces (display) + Plus Jakarta Sans (body) via `next/font/google`
- Content: blog posts as markdown under `content/blog/`, rendered via `remark` + `remark-html`, parsed with `gray-matter`

## Project structure

```
src/
  app/
    blog/         blog index + [slug] post pages
    start/        beginner education hub (12 stubbed article cards)
    projects/    projects portfolio (7 cards with status badges)
    links/       link hub
    contact/     contact form
    layout.tsx  root layout + Nav + Footer + JSON-LD schema
    page.tsx    home
    globals.css Tailwind v4 theme + reveal animation utilities
  components/
    Nav.tsx     client-side nav with mobile menu
    Footer.tsx
content/blog/   markdown blog posts
docs/superpowers/
  specs/        design specs
  plans/        implementation plans
```

## Design system

"Torchlight & Grit" — dark, warm, serif-forward.

- Background: `#1C1917` (`stone-950`)
- Text: `#F5F0E8` (`parchment`) / `#D6D0C4` (`parchment-dim`)
- Accents: `#D4A853` gold, `#E8C46A` gold-bright, `#B87333` copper, `#8B9A7B` sage
- Display font: Fraunces (serif)
- Body font: Plus Jakarta Sans

Page patterns used across the site:

- Hero containers: `pt-36 pb-24 md:pt-44 md:pb-32`
- Section spacing: `py-24 md:py-32` with `border-t border-stone-800` dividers
- Eyebrow labels: `text-sm tracking-[0.25em] uppercase` in an accent color
- Cards: `border bg-stone-950 p-8 md:p-10 group hover:bg-stone-900 transition-colors duration-500`
- Reveal animations: `.reveal` + `.reveal-delay-{1..5}` classes (defined in `globals.css`) — note only 5 delay buckets exist, cap index math at `(i % 5) + 1` on longer lists

## AI agent notes

See `AGENTS.md` for Next.js agent rules. Skill specs and plans for features live in `docs/superpowers/`.
