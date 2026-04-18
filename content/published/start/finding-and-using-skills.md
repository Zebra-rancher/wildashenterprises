---
title: "Finding and Using Skills"
slug: finding-and-using-skills
track: "Understanding AI"
status: draft
word_count: 620
sources:
  - https://code.claude.com/docs/en/skills
  - https://support.claude.com/en/articles/12512180-use-skills-in-claude
  - https://support.claude.com/en/articles/12512198-how-to-create-custom-skills
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
  - https://github.com/anthropics/skills
  - https://github.com/anthropics/claude-code
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# Finding and Using Skills

A Skill is a folder. That's literally it. A folder with a file called SKILL.md that tells Claude "here's how to do this specific task." When the task matches, Claude reads the folder and follows the instructions.

This is the feature that makes Claude go from generic to specific. Without Skills, Claude writes generic emails and generic reports. Point it at a Skill that captures how YOU write, and it writes like you.

## Where Skills come from

Built in. Claude ships with Skills for common document work. PowerPoint, Word docs, Excel, PDFs. These load when the task matches their description.

Plugins. Claude Code has a plugin registry. Plugins can bundle multiple Skills plus MCPs and commands. You install with one command.

User-written. You can write your own. A SKILL.md file placed in ~/.claude/skills/ on your machine is available across every project.

## What they look like in my shop

I have a Skill called shopware-canned-job-urls. When I ask "give me the edit link for the 30k service canned job," Claude loads the Skill, which knows the URL pattern for my Shop-Ware tenant, and hands me back a direct link. Forty seconds saved every time.

Another: tesla-parts-lookup. When I say "I need the front drive unit for a 2021 Model Y," it knows to hit the Tesla EPC site and return part number and price. Same idea. Repetitive domain knowledge packaged once, used forever.

## Two Skills worth installing today

/humanizer takes AI-written text and strips out the tells. The hedging, the em dashes, the words like "leverage" and "robust." Every piece of writing I publish runs through it. Including this one.

/convo turns any Claude Code session into a voice conversation. You talk, Claude talks back. I used it to play a D&D campaign inside a novel with the Claude Code Game Master project. Install it once, then realize voice is already here and you never noticed.

Both ship with the anthropic-skills plugin. One install, both available.

## Writing your own

Start with the skill-creator Skill. Ask Claude to help you make a new Skill for something you do repeatedly. It asks you questions, fills out the SKILL.md file, and tests it.

The minimum viable Skill is thirty lines. A name, a description, and instructions in plain English. No code required.

Good candidates: customer response templates, repetitive data lookups, brand-voice checks, domain-specific calculations. Anything you explain to Claude more than twice.

## Installing Skills

Four ways, from easiest to most technical.

Inside Claude itself. Go to Settings > Customize > Skills in the web or desktop app. Upload a zipped Skill folder, or ask Claude to build one with the skill-creator Skill and it writes and installs the files for you. No terminal required. This is the path if you don't live in code.

Through the plugin registry in Claude Code. Run /plugin and search. Best for installing Skills someone else already published.

Drop a Skill folder into ~/.claude/skills/ on your machine. Restart your session. Done.

Inside a project, put it in .claude/skills/ at the project root. Only available in that project, which is the right scope when the Skill is specific to one codebase.

## What to do today

Find one task you ask Claude to do at least once a week. Something with a specific format or a specific source. Write it down.

Ask Claude to turn it into a Skill. Give it a name, let it handle the file structure, save it to ~/.claude/skills/. The next time you need it, Claude will use it without being asked.

This is the step that turns Claude from a clever chat window into a real tool for your business.
