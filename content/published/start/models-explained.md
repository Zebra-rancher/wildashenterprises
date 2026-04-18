---
title: "Haiku, Sonnet, Opus"
slug: models-explained
track: "Understanding AI"
status: draft
word_count: 455
sources:
  - https://platform.claude.com/docs/en/about-claude/models/overview
  - https://claude.com/resources/tutorials/choosing-the-right-claude-model
  - https://platform.claude.com/docs/en/about-claude/pricing
  - https://www.anthropic.com/news/claude-opus-4-7
  - https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# Haiku, Sonnet, Opus

Claude comes in three sizes. That's not a product gimmick. It's the single most useful thing to understand if you want to use Claude without wasting money or waiting around.

Think of it as three people on your team. Same training, different jobs.

## Haiku

Haiku is the fast one. Small and quick. It's the model you want when the task is easy and you want the answer now.

Simple summaries. Renaming files. Extracting a phone number from a PDF. Sorting a list. Rewriting a sentence. If a sharp high school kid with a clipboard could do it in thirty seconds, use Haiku.

Haiku 4.5 is the current version. It's about five times cheaper than Opus and roughly twice as fast as Sonnet. You can burn through a lot of Haiku calls before the bill gets interesting.

## Sonnet

Sonnet is the default. If you're not sure which one to pick, pick this one. It handles the work that actually fills your day.

Drafting a customer email. Writing a blog post. Reviewing a contract. Coding up a small tool. Pulling insight out of a spreadsheet. Anything where quality matters and the problem isn't exotic.

Sonnet 4.6 is fast enough to feel like chat and smart enough that you rarely outgrow it. It's the daily driver, and most production systems run on it.

## Opus

Opus is the heavy hitter. The consultant you call when you're stuck, not the foreman who runs the shop.

Hard debugging. Architecture decisions. Multi-step plans that need to actually hold together. Strategy work where getting it right matters more than getting it fast. Opus thinks longer and costs more for a reason.

Opus 4.7 is the latest. It's about five times the price of Haiku and slower than both Sonnet and Haiku. Don't run it all day.

## The move most people miss

Plan with Opus. Execute with Sonnet.

The highest-value thing Opus does is figuring out what to do. Once you have a solid plan, execution is mostly mechanical and Sonnet can handle it at a fraction of the cost. Try this the next time you have something complicated on your plate.

In Claude Code and Cowork, you can switch models mid-session with the /model command. In the chat interface, the model is a dropdown at the top of the conversation.

## What to do today

Next time you open Claude, look at which model is selected before you type. If it says Opus and your task is "rewrite this paragraph," downgrade to Sonnet. If it says Sonnet and you're working on a three-week project plan, upgrade to Opus.

That one habit saves you money and gets you better answers. Same team, right person for the job.
