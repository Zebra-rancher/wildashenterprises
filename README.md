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

- **Platform:** Cloudflare Pages (static assets, no edge compute)
- **Cloudflare account ID:** `f4b09f8bd03474fa0fcd492708ba2e0c`
- **Pages project name:** `wildashenterprises`
- **Preview hostname:** `wildashenterprises.pages.dev`
- **Production domains:** `wildash.ai`, `www.wildash.ai`, `wildashenterprises.com`, `www.wildashenterprises.com`
- **Production branch (configured):** `main`
- **Git integration:** ⚠️ **Not connected** (as of 2026-04-16). `source: null` on the project — pushes to `main` do NOT auto-deploy. All 16+ prior deploys were manual Wrangler uploads.
- **Build command (when Git integration is set up):** `npm run build`
- **Build output directory:** `out`

### Current workflow — manual Wrangler deploy

```bash
npm run build
CLOUDFLARE_API_TOKEN=<pages-token> npx wrangler pages deploy out --project-name=wildashenterprises
```

The token must be scoped to the `f4b09f8bd03474fa0fcd492708ba2e0c` account with `Pages: Edit` permissions. Create one at https://dash.cloudflare.com/profile/api-tokens.

### Recommended — wire up Git integration

This is a one-time dashboard-only step (the API can't initiate the GitHub OAuth flow):

1. https://dash.cloudflare.com → **Workers & Pages** → **wildashenterprises** → **Settings** → **Builds & deployments** → **Connect to Git**
2. Authorize Cloudflare's GitHub app and pick `Zebra-rancher/wildashenterprises`
3. Branch: `main`. Build command: `npm run build`. Build output directory: `out`.
4. Save. Next push to `main` will build and deploy automatically.
5. Revoke any manual-deploy API tokens afterward — they're no longer needed.

## Known cleanup

- **`scripts/`** is present but untracked in git — unclear what's in it.

## Stack

- Next.js 16, React 19, TypeScript 5
- Tailwind CSS v4 (CSS custom properties, `@theme inline`)
- Fonts: Fraunces (display) + Plus Jakarta Sans (body) via `next/font/google`
- Content: markdown under `content/published/` (blog posts) and `content/published/start/` (education articles) and `content/projects/` (project detail pages), rendered via `remark` + `remark-html`, parsed with `gray-matter`

## Project structure

```
src/
  app/
    blog/          blog index + [slug] post pages
    start/         education hub + [slug] article pages
    projects/      projects portfolio + [slug] detail pages
    links/         link hub
    contact/       contact form
    layout.tsx     root layout + Nav + Footer + JSON-LD schema
    page.tsx       home
    globals.css    Tailwind v4 theme + reveal animation utilities
  components/
    Nav.tsx        client-side nav with mobile menu
    Footer.tsx
  lib/
    blog.ts        blog post loader
    content.ts     /start article + /projects page loader
content/
  published/       blog markdown + start/ subfolder for education articles
  projects/        project detail markdown (optional, pre-renders on build)
  drafts/          work-in-progress articles (not rendered)
docs/superpowers/
  specs/           design specs
  plans/           implementation plans
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
