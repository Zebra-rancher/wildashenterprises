# Content Agent Team — Design Spec

**Date**: 2026-04-15
**Project**: wildash-enterprises
**Status**: Approved

## Overview

Two agents that form a content pipeline for wildashenterprises.com. A **scanner** runs weekly on a schedule, watches all Zebra-rancher repos and dave-brain for content-worthy events, strips PII, and logs scored ideas to dave-brain. A **writer** is invoked on demand to draft articles from approved ideas, runs them through the humanizer skill, and saves drafts to the repo.

## Content Pillars

All five are in scope:

1. **Build logs** — "I built X with AI in Y hours"
2. **Lessons learned** — practical insights from running AI in real businesses
3. **How-tos** — actionable guides for SMB owners and trades
4. **Case studies** — real results, anonymized
5. **Opinion/perspective** — Travis's takes on AI in business

## PII Stripping Rules

These rules apply to both agents. All content must be sanitized before logging to brain or writing to drafts.

- Replace all repo names with generic descriptors ("a web project", "an automation tool")
- Replace all business names with generic descriptors ("an auto repair shop", "a side venture")
- Replace human names with generic roles ("a colleague", "a client", "the shop owner")
- Strip API keys, internal URLs, credentials, file paths containing usernames
- Preserve: tech stack names, tools used, problem/solution patterns, timelines, outcomes

## Agent 1: wildash-content-scanner

**Location**: `~/personal-os/.claude/agents/wildash-content-scanner.md`
**Execution**: Scheduled weekly via RemoteTrigger (cron). Runs autonomously, no human interaction.
**Model**: sonnet (cost-efficient for scanning/scoring)

### What it does each run

1. Query dave-brain for the last scan timestamp (knowledge entry: `title: "wildash-content-scan-checkpoint"`, `project: "wildash-enterprises"`)
2. List all repos under Zebra-rancher via `gh api`, fetch commits since last scan for each
3. Query dave-brain for recent activity since last scan:
   - thoughts (decisions, insights captured from sessions)
   - knowledge entries (new reference material)
   - completed tasks
   - project updates
4. For each commit/event, apply PII stripping rules
5. Score each item for story potential using AI judgment (see scoring criteria below)
6. Items scoring above threshold get logged to dave-brain `thoughts` table:
   - `type`: `"content-idea"`
   - `project`: `"wildash-enterprises"`
   - `domain`: `"work"`
   - `content`: sanitized story angle, which pillar it fits, raw material summary
   - `tags`: `["content-idea", "<pillar-name>"]`
7. Update the scan checkpoint timestamp

### Scoring Criteria

AI judgment, not rigid rules. The scanner asks:

- Is there a story here a small business owner would find interesting?
- Does it demonstrate AI solving a real problem?
- Is there enough substance for a blog post (not just a config change or dependency bump)?
- Does it fit the Wildash narrative ("I built this for myself")?
- Could this be told without exposing private details?

### Brain as the window into conversations

The scanner does not access Claude Projects conversations directly. The brain is the scanner's window into session activity. Better brain hygiene (consistent session close captures) = better content ideas. This is intentional — it keeps the pipeline simple and reinforces the habit of saving decisions and insights to brain.

## Agent 2: wildash-content-writer

**Location**: `~/personal-os/.claude/agents/wildash-content-writer.md`
**Execution**: On demand. Human-in-the-loop.
**Model**: sonnet (good writing quality at lower cost; escalate to opus for complex pieces)

### What it does

1. Query dave-brain for content ideas (`type: "content-idea"`, `project: "wildash-enterprises"`)
2. Present the ideas to Travis, he picks one (or brings his own topic)
3. Gather context:
   - Pull the idea's raw material from the thought entry
   - Search brain for related knowledge/thoughts
   - Read Wildash brand positioning from brain knowledge entry
4. Determine output type:
   - **Blog post** → `content/drafts/YYYY-MM-DD-slug.md` with frontmatter
   - **Projects page entry** → suggest addition to the projects page data
5. Draft the article in Travis's voice
6. Run the humanizer skill on the draft
7. Save to `content/drafts/` in the wildashenterprises repo
8. Update the dave-brain thought: change tags to include `"content-drafted"`, add file path reference
9. Present the draft for review

### Draft frontmatter format

```markdown
---
title: "Article Title"
date: 2026-04-15
pillar: build-log | lesson-learned | how-to | case-study | opinion
status: draft
---
```

### Voice rules (Wildash-specific)

- First person, Travis's perspective
- No business names, no repo names, no real human names (PII rules always apply)
- Specific and practical, not abstract thought leadership
- Stories over advice — "here's what I did" beats "here's what you should do"
- Unpolished friendly pirate tone — direct, warm, no corporate speak
- The humanizer skill handles remaining AI tells

### Approval workflow

When Travis approves a draft:
- Move from `content/drafts/` to `content/published/`
- Update brain thought tags to include `"content-published"`
- Commit and deploy

## File Structure

```
wildashenterprises/
├── content/
│   ├── drafts/          # Articles awaiting review
│   └── published/       # Approved articles
└── ...
```

## Integration Flow

```
Weekly cron (RemoteTrigger)
    │
    ▼
wildash-content-scanner
    ├── gh api → all Zebra-rancher repos (commits since last scan)
    ├── dave-brain query → thoughts, knowledge, tasks (since last scan)
    ├── PII strip + score for story potential
    ├── Log ideas → dave-brain thoughts table
    └── Update scan checkpoint

Travis reviews ideas at session start (bootstrap surfaces them)
    │
    ▼
wildash-content-writer (on demand)
    ├── Present ideas from brain
    ├── Gather context from brain
    ├── Draft article in Travis's voice
    ├── Run humanizer skill
    ├── Save to content/drafts/
    └── Update brain thought status

Travis reviews draft
    │
    ▼
Approve → move to content/published/, deploy, update brain
```

## Dependencies

- `content/drafts/` and `content/published/` directories in wildashenterprises repo
- RemoteTrigger cron schedule for scanner (weekly)
- `wildash-content-scan-checkpoint` knowledge entry in dave-brain
- Agent files in `~/personal-os/.claude/agents/`

## Out of Scope

- Blog rendering engine for the Next.js site (separate project)
- Auto-publishing (human approves everything)
- Social media distribution
- Voice guide creation (use existing content-generation workflow later if needed)
- Claude Projects scraping (brain is the window)
