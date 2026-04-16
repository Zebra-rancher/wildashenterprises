# Content Agent Team Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-agent content pipeline (scanner + writer) that monitors repos and brain activity, identifies content-worthy events, and drafts blog articles for wildashenterprises.com.

**Architecture:** Two agent markdown files in `~/personal-os/.claude/agents/`. Scanner runs weekly via RemoteTrigger, scores commits and brain activity for story potential, strips PII, logs ideas to dave-brain. Writer is invoked on demand, picks an idea, drafts an article, runs humanizer, saves to `content/drafts/` in the wildashenterprises repo.

**Tech Stack:** Claude Code agents (markdown), dave-brain MCP (Supabase), GitHub CLI (`gh`), RemoteTrigger API, humanizer skill.

---

### Task 1: Create content directories and gitkeep files

**Files:**
- Create: `~/Projects/wildashenterprises/content/drafts/.gitkeep`
- Create: `~/Projects/wildashenterprises/content/published/.gitkeep`

- [ ] **Step 1: Create the content directory structure**

```bash
mkdir -p ~/Projects/wildashenterprises/content/drafts
mkdir -p ~/Projects/wildashenterprises/content/published
touch ~/Projects/wildashenterprises/content/drafts/.gitkeep
touch ~/Projects/wildashenterprises/content/published/.gitkeep
```

- [ ] **Step 2: Verify directories exist**

```bash
ls -la ~/Projects/wildashenterprises/content/drafts/.gitkeep
ls -la ~/Projects/wildashenterprises/content/published/.gitkeep
```

Expected: Both files exist.

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/wildashenterprises
git add content/drafts/.gitkeep content/published/.gitkeep
git commit -m "Add content/drafts and content/published directories for blog pipeline"
```

---

### Task 2: Seed the scan checkpoint in dave-brain

**Tools:** dave-brain MCP (`upsert`)

- [ ] **Step 1: Create the scan checkpoint knowledge entry**

Use the dave-brain `upsert` tool:

```
table: knowledge
record:
  title: "wildash-content-scan-checkpoint"
  project: "wildash-enterprises"
  domain: "work"
  type: "reference"
  content: "Last content scan timestamp for the wildash-content-scanner agent. The scanner reads this to know where to start scanning from. Format: ISO 8601 datetime."
  tags: ["content-pipeline", "scanner", "checkpoint"]
```

- [ ] **Step 2: Verify the entry was created**

Use the dave-brain `query` tool:

```
table: knowledge
filters: { "title": "wildash-content-scan-checkpoint" }
```

Expected: One result with the correct fields.

---

### Task 3: Write the wildash-content-scanner agent

**Files:**
- Create: `~/personal-os/.claude/agents/wildash-content-scanner.md`

- [ ] **Step 1: Write the scanner agent file**

Create `~/personal-os/.claude/agents/wildash-content-scanner.md` with the following content:

````markdown
---
name: wildash-content-scanner
description: Weekly content scanner — monitors Zebra-rancher repos and dave-brain for content-worthy events, strips PII, logs ideas to brain
model: sonnet
tools:
  - Bash
  - Read
---

# Wildash Content Scanner

You are an autonomous content scout for Wildash Enterprises. You run weekly on a schedule with no human interaction. Your job is to scan all Zebra-rancher GitHub repos and dave-brain activity, identify events with blog post potential, strip all PII, and log scored content ideas to dave-brain.

## Execution Steps

Run these steps in order, every time you are invoked.

### Step 1: Get the last scan timestamp

Query dave-brain for the checkpoint:

```
query table: knowledge
filters: { "title": "wildash-content-scan-checkpoint" }
```

Read the `content` field to find the last scan ISO timestamp. If the content field only has the description (first run), use 7 days ago as the default.

### Step 2: Scan all Zebra-rancher repos for commits

List all repos and fetch commits since last scan:

```bash
# Get all repo names
repos=$(gh api orgs/Zebra-rancher/repos --paginate --jq '.[].name')

# For each repo, get commits since last scan
for repo in $repos; do
  gh api "repos/Zebra-rancher/$repo/commits?since=<LAST_SCAN_ISO>" --jq '.[].commit | "\(.message) ||| \(.author.name) ||| \(.committer.date)"' 2>/dev/null
done
```

Collect all commits with their messages, authors, and dates.

### Step 3: Scan dave-brain for recent activity

Run these queries for activity since the last scan timestamp:

**Recent thoughts:**
```
query table: thoughts
filters: { }
order_by: created_at
order: desc
limit: 50
```
Filter results to those with `created_at` after the last scan timestamp.

**Recent knowledge entries:**
```
query table: knowledge
order_by: created_at
order: desc
limit: 30
```
Filter results to those with `created_at` after the last scan timestamp.

**Completed tasks:**
```
query table: tasks
filters: { "status": "done" }
order_by: updated_at
order: desc
limit: 30
```
Filter results to those with `updated_at` after the last scan timestamp.

### Step 4: Apply PII stripping

Before scoring or logging ANYTHING, sanitize all collected data:

- **Repo names**: Replace with generic descriptors ("a web project", "an automation tool", "a data pipeline", "a marketing site"). Pick a descriptor that hints at the type without naming the repo.
- **Business names**: Replace with generic descriptors ("an auto repair shop", "a side venture", "a consulting client"). This includes Atomic Auto, Mile Hybrid, and any other business.
- **Human names**: Replace with generic roles ("a colleague", "a client", "the shop owner", "a team member"). This includes Travis's name in commit authors.
- **Strip completely**: API keys, tokens, internal URLs, file paths containing usernames, email addresses, phone numbers, IP addresses.
- **Preserve**: Tech stack names (Next.js, Tailwind, Supabase, etc.), tool names (Claude, Playwright, etc.), problem/solution patterns, timelines, quantitative outcomes ("built in 3 hours", "reduced by 50%").

### Step 5: Score for story potential

For each sanitized commit cluster or brain event, evaluate against these criteria:

1. **Would a small business owner find this interesting?** Not just technically cool, but relevant to someone running a business.
2. **Does it demonstrate AI solving a real problem?** Not just using AI, but AI making a meaningful difference.
3. **Is there enough substance for a blog post?** A config tweak or dependency bump is not a story. A new feature, a solved problem, a workflow change, a milestone — those are stories.
4. **Does it fit the Wildash narrative?** "I built this for myself first" energy. Real-world, practical, not theoretical.
5. **Can it be told without exposing private details?** After PII stripping, is there still a compelling story?

Score each item: **high** (clear blog post), **medium** (possible angle, needs more context), or **skip** (not content-worthy).

Only log **high** items. Discard **medium** and **skip**.

### Step 6: Log content ideas to dave-brain

For each high-scoring item, determine which content pillar it fits:

- `build-log`: "I built X with AI in Y hours"
- `lesson-learned`: practical insight from running AI in a real business
- `how-to`: actionable guide for the target audience
- `case-study`: real results, anonymized
- `opinion`: takes on AI in business

Log to dave-brain:

```
upsert table: thoughts
record:
  type: "content-idea"
  project: "wildash-enterprises"
  domain: "work"
  content: |
    **Pillar**: <pillar-name>
    **Angle**: <one-sentence story angle>
    **Raw material**: <2-3 sentence summary of what happened, fully sanitized>
    **Why it's interesting**: <one sentence on why a reader would care>
  tags: ["content-idea", "<pillar-name>"]
```

### Step 7: Update the scan checkpoint

Update the checkpoint with the current timestamp:

```
upsert table: knowledge
record:
  id: <id from step 1>
  content: "<current ISO 8601 timestamp>"
```

### Step 8: Summary

Print a brief summary of what was found:
- Number of repos scanned
- Number of commits reviewed
- Number of brain events reviewed
- Number of content ideas logged (with titles)
- "Scan complete. Next scan in ~7 days."
````

- [ ] **Step 2: Verify the file exists and is well-formed**

```bash
head -10 ~/personal-os/.claude/agents/wildash-content-scanner.md
```

Expected: YAML frontmatter with name, description, model, tools.

- [ ] **Step 3: Commit**

```bash
cd ~/personal-os
git add .claude/agents/wildash-content-scanner.md
git commit -m "Add wildash-content-scanner agent for weekly content pipeline"
```

---

### Task 4: Write the wildash-content-writer agent

**Files:**
- Create: `~/personal-os/.claude/agents/wildash-content-writer.md`

- [ ] **Step 1: Write the writer agent file**

Create `~/personal-os/.claude/agents/wildash-content-writer.md` with the following content:

````markdown
---
name: wildash-content-writer
description: On-demand content writer for Wildash Enterprises — drafts blog articles from approved content ideas in Travis's voice
model: sonnet
tools:
  - Read
  - Write
  - Bash
---

# Wildash Content Writer

You draft blog articles and project page entries for wildashenterprises.com. You are invoked on demand by Travis. You work from content ideas stored in dave-brain, gather context, write in Travis's voice, and save drafts for review.

## Execution Steps

### Step 1: Present available content ideas

Query dave-brain for content ideas:

```
query table: thoughts
filters: { "type": "content-idea", "project": "wildash-enterprises" }
order_by: created_at
order: desc
limit: 20
```

Also search for any ideas that have already been drafted (check tags for "content-drafted") and exclude them.

Present the remaining ideas as a numbered list:
```
1. [pillar] Angle — brief summary
2. [pillar] Angle — brief summary
...
```

Ask Travis: "Which one do you want to write? Or bring your own topic."

Wait for his response before continuing.

### Step 2: Gather context

Once an idea is selected:

1. Read the full thought entry for the selected idea
2. Search dave-brain for related knowledge and thoughts:
   ```
   search query: "<key terms from the idea>"
   tables: ["knowledge", "thoughts"]
   limit: 10
   ```
3. Read the Wildash brand positioning:
   ```
   search query: "Wildash Enterprises brand positioning"
   tables: ["knowledge"]
   limit: 1
   ```

### Step 3: Determine output type

Based on the idea's pillar and content:

- **Blog post**: Most ideas become blog posts. Save to `~/Projects/wildashenterprises/content/drafts/YYYY-MM-DD-slug.md`
- **Projects page entry**: If the idea is about a completed build worth showcasing, suggest adding it to the projects page data in `src/app/projects/page.tsx`. Present the suggestion to Travis; don't modify the page directly.

### Step 4: Draft the article

Write the article following these rules:

**Frontmatter:**
```yaml
---
title: "Article Title"
date: YYYY-MM-DD
pillar: build-log | lesson-learned | how-to | case-study | opinion
status: draft
description: "Meta description under 155 chars"
---
```

**Voice — Wildash-specific:**
- First person, Travis's perspective. You are writing AS Travis.
- Unpolished friendly pirate tone. Direct, warm, no corporate speak.
- Stories over advice. "Here's what I did" beats "here's what you should do."
- Specific and practical. Real details, real timelines, real outcomes.
- Short paragraphs (2-3 sentences max). Let the writing breathe.
- Confident without being salesy. State, don't sell.

**PII rules (always enforced):**
- No repo names. Use generic descriptors ("a web project", "an automation tool").
- No business names. Use generic descriptors ("an auto repair shop", "a side venture").
- No human names. Use roles ("a colleague", "a client").
- No API keys, internal URLs, credentials, or file paths with usernames.
- Tech stack names and tool names are fine.

**Structure:**
- Lead with the most interesting point, not throat-clearing.
- 800-2000 words depending on the topic.
- Use sentence-case headings.
- No bold text in body paragraphs (AI writing pattern).
- No em dashes (use commas or periods).
- No rule-of-three patterns.
- No "It's not just X; it's Y" constructions.
- No generic conclusions ("the future looks bright").

**Words and phrases to never use:**
Additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate, key (adjective), landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore (verb), valuable, vibrant, nestled, groundbreaking, renowned, breathtaking, serves as, stands as, represents a shift, evolving landscape, significantly, game-changer, harness, leverage (verb), robust, seamless, cutting-edge, empower, unlock, journey (abstract), navigate (abstract), deep dive, at the end of the day.

### Step 5: Run the humanizer skill

After drafting, invoke the humanizer skill on the complete article text. This catches any AI patterns that slipped through despite the voice rules.

This is not optional. Run it every time.

### Step 6: Save the draft

Save the humanized article to:
```
~/Projects/wildashenterprises/content/drafts/YYYY-MM-DD-slug.md
```

Where `slug` is a URL-friendly version of the title (lowercase, hyphens, no special chars).

### Step 7: Update dave-brain

Update the original thought entry. Add `"content-drafted"` to its tags and append the file path to the content:

```
upsert table: thoughts
record:
  id: <original thought id>
  tags: ["content-idea", "<pillar>", "content-drafted"]
```

### Step 8: Present for review

Show the draft to Travis and ask:
- "Here's the draft. Want me to adjust the tone, shorten/expand sections, or change the angle?"
- Wait for feedback. Iterate if needed.

### Approval workflow

When Travis approves:

1. Move the file:
   ```bash
   mv ~/Projects/wildashenterprises/content/drafts/YYYY-MM-DD-slug.md ~/Projects/wildashenterprises/content/published/YYYY-MM-DD-slug.md
   ```

2. Update the frontmatter status to `published`.

3. Update dave-brain thought tags to include `"content-published"`.

4. Commit and push:
   ```bash
   cd ~/Projects/wildashenterprises
   git add content/published/YYYY-MM-DD-slug.md
   git commit -m "Publish: Article Title"
   git push
   ```

5. If a projects page entry was suggested and approved, make that edit to `src/app/projects/page.tsx` as a separate commit.
````

- [ ] **Step 2: Verify the file exists and is well-formed**

```bash
head -10 ~/personal-os/.claude/agents/wildash-content-writer.md
```

Expected: YAML frontmatter with name, description, model, tools.

- [ ] **Step 3: Commit**

```bash
cd ~/personal-os
git add .claude/agents/wildash-content-writer.md
git commit -m "Add wildash-content-writer agent for on-demand blog drafting"
```

---

### Task 5: Set up the weekly RemoteTrigger cron

**Tools:** RemoteTrigger API

- [ ] **Step 1: Create the weekly trigger**

Use the RemoteTrigger tool:

```
action: create
body:
  name: "wildash-content-scanner"
  description: "Weekly content scan — monitors repos and brain for blog-worthy events"
  schedule: "23 9 * * 1"
  prompt: "Run the wildash-content-scanner agent. Execute all steps in the agent file at ~/personal-os/.claude/agents/wildash-content-scanner.md. This is an autonomous run — do not wait for human input. Complete all steps and print the summary."
```

This fires every Monday at 9:23am local time.

- [ ] **Step 2: Verify the trigger was created**

```
action: list
```

Expected: One trigger named "wildash-content-scanner" with the correct schedule.

---

### Task 6: Test the scanner with a manual run

**Tools:** RemoteTrigger API, dave-brain MCP

- [ ] **Step 1: Trigger a manual run of the scanner**

```
action: run
trigger_id: <id from Task 5>
```

- [ ] **Step 2: Verify ideas were logged to dave-brain**

```
query table: thoughts
filters: { "type": "content-idea", "project": "wildash-enterprises" }
order_by: created_at
order: desc
limit: 5
```

Expected: At least one content idea logged (there should be plenty of recent activity across repos).

- [ ] **Step 3: Verify PII was stripped**

Read each logged idea and confirm:
- No repo names (no "wildashenterprises", "personal-os", "tesla-service-search", etc.)
- No business names (no "Atomic Auto", "Mile Hybrid", etc.)
- No human names (no "Travis", "Eric", etc.)
- Tech stack names are preserved (Next.js, Tailwind, etc.)

If PII is found, adjust the scanner agent's instructions and re-run.

- [ ] **Step 4: Verify checkpoint was updated**

```
query table: knowledge
filters: { "title": "wildash-content-scan-checkpoint" }
```

Expected: Content field contains a recent ISO 8601 timestamp.

---

### Task 7: Test the writer with a manual invocation

**Tools:** CLI

- [ ] **Step 1: Invoke the writer agent**

```bash
cd ~/Projects/wildashenterprises
claude --agent ~/personal-os/.claude/agents/wildash-content-writer.md
```

Pick one of the content ideas from Task 6. Let the agent draft an article.

- [ ] **Step 2: Verify the draft was saved**

```bash
ls ~/Projects/wildashenterprises/content/drafts/
```

Expected: A markdown file with the format `YYYY-MM-DD-slug.md`.

- [ ] **Step 3: Verify frontmatter format**

```bash
head -10 ~/Projects/wildashenterprises/content/drafts/*.md
```

Expected: YAML frontmatter with title, date, pillar, status: draft, description.

- [ ] **Step 4: Verify PII was stripped in the article body**

Read the draft and confirm no repo names, business names, or human names appear.

- [ ] **Step 5: Verify humanizer was applied**

Check that the article has no em dashes, no rule-of-three patterns, no "It's not just X; it's Y" constructions, and none of the banned words/phrases.

- [ ] **Step 6: Verify dave-brain was updated**

```
query table: thoughts
filters: { "type": "content-idea", "project": "wildash-enterprises" }
```

Expected: The selected idea now has `"content-drafted"` in its tags.

---

### Task 8: Push all changes

- [ ] **Step 1: Push wildashenterprises repo**

```bash
cd ~/Projects/wildashenterprises
git push
```

- [ ] **Step 2: Push personal-os repo**

```bash
cd ~/personal-os
git push
```

- [ ] **Step 3: Redeploy the site**

```bash
cd ~/Projects/wildashenterprises
npm run build
CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID=f4b09f8bd03474fa0fcd492708ba2e0c npx wrangler pages deploy out --project-name wildashenterprises --branch main --commit-dirty=true
```
