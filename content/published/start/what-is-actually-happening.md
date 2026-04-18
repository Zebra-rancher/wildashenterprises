---
title: "What Is Actually Happening"
slug: what-is-actually-happening
track: "Understanding AI"
status: draft
word_count: 495
sources:
  - https://www.anthropic.com/research/tracing-thoughts-language-model
  - https://www.anthropic.com/research
  - https://platform.claude.com/docs/en/about-claude/models/overview
  - https://www.anthropic.com/news/claudes-constitution
  - https://docs.anthropic.com/en/docs/build-with-claude/tool-use
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# What Is Actually Happening

Claude is a very large pattern. It was trained on a massive pile of text by reading one word, guessing the next word, then checking the answer. Billions of times. Across trillions of words. The weights that made it guess better and better are the model.

When you type a message, the same thing happens in reverse. Claude reads your words, uses everything it learned, and writes one word at a time by predicting what should come next. Every response is a long sequence of "and the next word is..." calculations.

That's it. That's the core mechanism. Everything else is layered on top.

## Why this matters

Because it explains behavior that otherwise looks weird.

Claude is confident about things it's wrong about. Pattern matching makes things sound right, not be right. Always check facts, part numbers, URLs, and prices.

Claude is nondeterministic. Ask the same question twice, get two slightly different answers. There's randomness in the next-token selection. That's not a bug. That's how the model stays interesting instead of robotic.

Claude can do math but not always reliably. Symbolic work was never what it was trained to do. Give it a calculator tool and it becomes reliable. That's a tool call, not native ability.

## The agentic loop

A modern Claude session isn't just one pattern-match. It's a loop.

Claude reads your request. It decides what tools to use. It calls a tool. The tool returns data. Claude reads the data and decides the next step. Sometimes it calls another tool. Sometimes it answers you.

This loop is what makes Cowork and Claude Code feel like an assistant instead of a text toy. The model behind it is still predicting the next token. The loop is the structure that makes that useful. See what-is-an-agent for more.

## What's different about Claude

Anthropic publishes research on how Claude actually thinks. In March 2025, they showed that Claude plans ahead internally even though it writes one word at a time. When writing a poem that needs to rhyme, Claude picks the end word first, inside its own head, then generates the line to reach it.

That's not a marketing claim. That's a research result from watching the model's internal activations.

The other thing: Anthropic trains Claude with a written Constitution. Principles about what to refuse and how to be honest under pressure. Other labs do similar work. Anthropic has been the most public about what's in theirs.

## What to do today

Nothing to install. Nothing to set up. This one is just for your mental model.

Next time Claude tells you something that sounds confident, remember it's a pattern completing. Double-check the specific facts. Especially URLs, part numbers, dates, and prices. The general shape will be right. The details need verification.

That one habit separates people who use Claude well from people who get burned by it.
