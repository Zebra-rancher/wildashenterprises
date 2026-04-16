# Links Page Design

## Overview

Add a curated resources page at `/links` with categorized cards linking to recommended tools, people, and partners.

## Route

`/links` — new file at `src/app/links/page.tsx`

## Navigation

Add "Links" to the nav bar in `src/components/Nav.tsx`, positioned between "Projects" and "Contact".

## Page Structure

1. **Page header** — uppercase label, display font heading, optional subtext. Matches existing page style.
2. **Category sections** — each with an uppercase tracking label and a 2-column card grid (1-column on mobile).

## Categories & Content

### Learning (gold label)
| Title | Description | URL |
|-------|------------|-----|
| AI CRED | The standard for AI fluency assessment | https://www.aicred.ai/ |
| Anthropic Courses | Free courses on Claude AI and development tools | https://anthropic.skilljar.com/ |
| GitHub for Beginners | Video tutorial to get started with GitHub | https://youtu.be/r8jQ9hVA2qs?si=yyzbGY8THRKhHeHm |

### People (copper label)
| Title | Description | URL |
|-------|------------|-----|
| Nate B Jones | AI News & Strategy Daily on YouTube | https://www.youtube.com/@NateBJones |

### Partners (sage label)
| Title | Description | URL |
|-------|------------|-----|
| MOM+POP, Ltd. | Business consulting — Do business. Better. | https://mompop.ltd/ |

## Visual Design

- **Category labels:** uppercase `tracking-[0.25em]` text, colored per category (gold, copper, sage) — same pattern as homepage section labels.
- **Cards:** `bg-stone-950` background, `hover:bg-stone-900` transition, displayed in a `grid-cols-1 md:grid-cols-2` grid with `gap-px bg-stone-800` divider pattern (matching the superpowers list on the homepage).
- **Card content:** Title in `font-display text-xl text-parchment`, description in `text-parchment-dim`. Title shifts to `text-gold` on hover.
- **Links:** Each card is a full clickable area, opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
- **Page border:** Sections separated by `border-t border-stone-800` consistent with other pages.

## Files Changed

1. `src/app/links/page.tsx` — new page component
2. `src/components/Nav.tsx` — add "Links" nav entry

## Metadata

```ts
export const metadata: Metadata = {
  title: "Links",
  description: "Curated tools, people, and partners recommended by Wildash Enterprises.",
};
```
