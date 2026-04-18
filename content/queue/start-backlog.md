# /start Backlog

Queue for wildash-reference-writer. Work top-down. One card per row. When a draft is approved and published, mark `status: published` and move to the next unblocked row.

Priority ordering logic: low voice-risk first to calibrate the agent, then ramp difficulty. Highest-traffic concepts fronted inside each tier.

## P0 — Pilot (calibrate the agent before scaling)

| Slug | Title | Track | Status | Notes |
|---|---|---|---|---|
| start/what-is-markdown | What Is Markdown | Building Things | review | Easiest to verify. Concrete, definitional. If agent voice works here, scale up. Pilot approved 2026-04-17; Travis publishes manually. |

## P1 — High traffic, low risk

| Slug | Title | Track | Status | Notes |
|---|---|---|---|---|
| start/what-is-an-agent | What Is an Agent | Understanding AI | review | Differentiates the site. Bridges to services page. Approved 2026-04-17; Travis publishes manually. |
| start/tokens-and-context | Tokens and Context | Understanding AI | review | Pain point everyone hits. Tie to the Dad blog post. Approved 2026-04-17; Travis publishes manually. |
| start/github-basics | GitHub Basics | Building Things | drafting | Procedural. Links page already has a video. |

## P2 — Current and search-friendly

| Slug | Title | Track | Status | Notes |
|---|---|---|---|---|
| start/models-explained | Models Explained | Understanding AI | queued | Haiku/Sonnet/Opus search traffic. Anchor with a trades analogy. |
| start/chat-vs-cowork | Chat vs. Co-work | Understanding AI | queued | Few good explainers exist. SEO opportunity. |
| start/deploy-in-minutes | Deploy in Minutes | Building Things | queued | Vercel how-to. Verify UI against live docs. |

## P3 — Procedural, tool-dependent

| Slug | Title | Track | Status | Notes |
|---|---|---|---|---|
| start/projects-and-memory | Projects and Memory | Understanding AI | queued | Claude Projects specifics. Cite Anthropic docs. |
| start/cloudflare-and-domains | Cloudflare and Domains | Building Things | queued | DNS basics for non-technical owners. |
| start/finding-and-using-skills | Finding and Using Skills | Building Things | queued | Bleeding edge. Revisit docs at draft time. |

## P4 — Conceptual bridge

| Slug | Title | Track | Status | Notes |
|---|---|---|---|---|
| start/static-vs-backend | Static vs. Backend | Building Things | queued | Definitional. Use the shop analogy — front counter vs. back office. |

## P5 — Last, hardest, save for when voice is locked

| Slug | Title | Track | Status | Notes |
|---|---|---|---|---|
| start/what-is-actually-happening | What Is Actually Happening | Understanding AI | queued | Headline card. How LLMs work without dumbing down or going academic. Draft only after P0-P4 are shipped and voice is calibrated. |

## Cross-links to wire after drafting

- what-is-an-agent → projects-and-memory (agents need memory)
- tokens-and-context → projects-and-memory (why memory matters)
- github-basics → deploy-in-minutes (repo to live site)
- deploy-in-minutes → cloudflare-and-domains (custom domain)
- what-is-markdown → finding-and-using-skills (skills are .md files)
- models-explained → chat-vs-cowork (which model runs where)
- static-vs-backend → deploy-in-minutes (what you're actually deploying)

## Status legend

- `queued` — ready for the agent to pull
- `drafting` — agent is working on it
- `review` — draft in content/drafts/start/, waiting for Travis
- `published` — live on wildashenterprises.com/start/{slug}
