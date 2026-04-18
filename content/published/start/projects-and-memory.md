---
title: "Projects and Memory"
slug: projects-and-memory
track: "Understanding AI"
status: draft
word_count: 528
sources:
  - https://support.claude.com/en/articles/9517075-what-are-projects
  - https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features
  - https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context
  - https://www.anthropic.com/news/memory
  - https://docs.anthropic.com/en/docs/claude-code/memory
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# Projects and Memory

Claude forgets you every time you close the tab. Not because it's broken. That's how the default chat works.

If you've ever had to re-explain your business, your tools, or your preferences to Claude three times in one afternoon, this is why. Each conversation is a blank slate. No notes from yesterday. No history.

For a small business owner, that feels like hiring a new counter person every morning. Every returning customer has to explain themselves again. You can't run a shop that way, and you can't build a real working relationship with an AI that way either.

The good news: you don't have to. There are three ways to give Claude a longer memory, and they stack.

## Projects

A Project is a folder inside claude.ai. You create one, upload the stuff Claude should always know about, and every conversation you start inside that Project shows up with that context already loaded.

I have a Project called Atomic Auto. Inside it sits my price sheet, a handful of SOPs, and notes on how I talk to customers. Every time I ask Claude to draft a response, it already knows the shop tone and won't quote retail when I meant wholesale.

Projects also get their own memory, separate from everything else. Client work stays out of family stuff. Shop work stays out of the consulting side.

Projects are available on any paid plan. Go to claude.ai/projects and click "+ New Project."

## Memory

Claude now has a built-in memory feature for regular chats outside of Projects. It rolled out to every user, free tier included. Claude decides what's worth remembering as you talk. Preferences, how you work. That comes back in future chats.

You can also just tell it: "remember that I run an auto shop in Portland." Done. It writes that to the memory summary and picks it up next time.

Memory is editable. Settings > Capabilities shows you everything Claude thinks it knows about you. You can edit it or turn it off entirely. There's also Incognito mode when you want a one-off chat that never gets saved.

Memory and Projects are different tools. Memory is the running portrait of you across all your chats. Projects are the filing cabinets for specific work. Use both.

## CLAUDE.md for heavier work

If you're using Claude Code or Cowork, memory lives in a file you can read. It's called CLAUDE.md. It sits in your working folder, and Claude reads it first every session. You edit it like any other text file. This is the version I use for engineering-type work because I want to see and control exactly what's in the context.

## What to do today

Pick one thing you explain to Claude over and over. Make a Project for it. Drop in two or three files it should know about. Write two sentences of Project instructions. Tone and role. What not to do.

That's the setup. Next time you open a chat in that Project, the re-explaining stops.

If you haven't read the piece on tokens and context yet, read that next. It explains why forgetting is the default, not a bug.
