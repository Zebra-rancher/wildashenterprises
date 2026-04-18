---
title: "GitHub Basics"
slug: github-basics
track: "Building Things"
status: draft
word_count: 731
sources:
  - https://docs.github.com/en/get-started/start-your-journey/about-github-and-git
  - https://docs.github.com/en/get-started/start-your-journey/hello-world
  - https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer
---

# GitHub Basics

What a repo is, why it matters, and how to get your work off your laptop.

If you run a small business and someone has told you that you need a GitHub account, your first reaction is probably the same as mine was a few years back. Why does a repair shop owner need anything to do with code?

You don't, in the sense of writing software. You do, in the sense that GitHub is where modern work lives when the work is files that change over time. Once an AI tool writes you a script, a website, or a bundle of instructions, you need somewhere to put it that isn't a folder on one laptop that you might spill coffee on.

## The shop folder analogy

Picture the three-ring binder behind your service counter. Every customer has a tab. Inside each tab are the invoices, the inspection sheets, the notes from last visit, the photos the tech stapled to the paperwork. That binder is the memory of the shop. Lose it, and you lose years.

A GitHub repository is the same idea for a digital project. A repo is a folder that holds every file related to one piece of work, like a website or an automation script you built with Claude. All of it in one tab, with a history attached.

## What a commit is

Here's the piece that actually matters. Every time you save a change to the files in that repo, you write a short note about what you changed and why. GitHub's own docs call these notes commits, and the note itself is a commit message. "Fixed phone number on contact page." "Added new intake form." "Updated oil change prices."

Think of the way an old-school shop staples a receipt to a dated invoice. You can flip back a year later and see exactly what happened, who signed off, what the customer paid. A commit history is the same thing for a file. You can always see the last good version and walk back to it if something breaks.

## The other words worth knowing

A GitHub account is free. You sign up at github.com the same way you'd sign up for any service, email and a password.

A README file is the cover sheet of the repo. It's a plain-text file, usually in Markdown, that explains what the project is. When someone lands on your repo, the README is what they see first. GitHub lets you add one by checking a box when you create the repo, so you don't have to think about it.

That's really the whole starter kit. Account, repo, commit, README. You can build a lot of things knowing only those four words.

## One thing you can do today

Go to github.com and make a free account. Once you're in, click the plus sign in the top right corner, pick "New repository," give it a name like `my-first-repo`, check the box for "Add a README file," and hit "Create repository." You now have a real repo with a commit history.

That's it. You don't have to touch the command line or clone anything to your computer yet. You have a place for your work to live. I also put a GitHub walkthrough video on my [links page](/links) if you want to see someone click through it end to end.

## Why this matters for AI work

Claude Code and every other serious AI coding tool operate on repos, not folders. The moment you want an AI to help you build something real, not just answer a chat question, it needs a repo to read from and write to. Without one, there's no shared ground and no history of what the AI changed for you.

The part that surprised me: once the repo exists, using GitHub with Claude is almost boring. You sign in once, point Claude at the repo, and tell it what to do. It reads the files, makes the changes, and pushes a commit with a clear message. You never type a git command yourself. Claude does the typing. Your job is looking at what it changed and saying yes or no.

The free GitHub account is the ticket in. Once you have a repo, the next move is getting what's in it onto the public internet. That's where [deploy in minutes](/start/deploy-in-minutes) picks up.
