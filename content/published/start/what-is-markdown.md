---
title: "What Is Markdown"
slug: what-is-markdown
track: "Building Things"
status: draft
word_count: 609
sources:
  - https://commonmark.org/
  - https://commonmark.org/help/
  - https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
  - https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer
---

# What is Markdown

The `.md` file format is plain text with a handful of punctuation rules that turn into formatting. That's the whole trick. You write a pound sign in front of a line and it becomes a heading. You wrap a word in asterisks and it becomes bold. No buttons to click, no Word document fighting you about fonts.

John Gruber cooked it up in 2004 with Aaron Swartz. The idea was simple. Text should be readable as-is, before any software touches it, and still come out looking right when a browser or an editor renders it.

## The repair order analogy

Think about a handwritten repair order. The tech scribbles the customer concern at the top, underlines the part that matters, puts a list of what needs to happen next. You can read that piece of paper before anyone types it into the computer. It already makes sense.

Markdown is the same idea for digital writing. The raw file is legible. The formatting is just convention, not hidden codes. If you open a Markdown file in Notepad it still reads like notes. If you open it in something that understands the format, the headings get bigger, the bold gets bold, the links turn blue.

## Why it travels so well

A Word document is a zip file full of XML pretending to be a document. It's tied to Microsoft's tooling. Open it in the wrong program and you get a mess or nothing at all.

A Markdown file is just text. Every operating system on earth can read it. Every text editor can edit it. Git can diff it line by line, so you can see exactly what changed between two versions. That portability is why it ended up everywhere that writing and code live in the same place.

## Where it shows up

GitHub runs on it. Every README, every issue, every pull request comment, every discussion thread. They call their version GitHub Flavored Markdown and it uses the `.md` extension.

Claude Skills use it too. A Skill is literally a folder with a file called `SKILL.md` inside, and that file has a YAML header plus Markdown instructions. When I teach Claude how to do a new kind of task, I'm writing a Markdown file. Nothing fancier than that.

Static site generators use it. Most modern blogging tools use it too. Note-taking apps like Obsidian store your notes as `.md` files so you own them forever, no lock-in.

## Try it today

Open any plain text editor. Type this:

```
# My first note

This is a paragraph with a **bold word** in it.

- One thing
- Another thing
- A third thing
```

Save it as `notes.md`. Now paste the contents into a GitHub issue, or open the file in VS Code. You'll see the heading get bigger, the bold word get bold, and the dashes turn into a bulleted list. That's it. That's Markdown.

## Why this matters for AI work

Every time you paste a document into Claude, you're spending tokens. A PDF is expensive. A Word document isn't much better. The layout data, the font information, all the stuff you don't see still gets processed, and it eats into your context budget.

Convert the doc to Markdown first. Most editors will save any file as `.md`, and there are free online converters for PDFs. Same content, fewer tokens, cleaner read for the model. You get more room for actual back-and-forth instead of burning it on formatting noise.

For the next layer, [finding and using skills](/start/finding-and-using-skills) shows what a `.md` file can actually do when you point an AI at it.
