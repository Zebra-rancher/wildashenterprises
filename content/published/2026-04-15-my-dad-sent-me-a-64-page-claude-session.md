---
title: "My Dad Sent Me a 64-Page Claude Session"
date: 2026-04-15
slug: my-dad-sent-me-a-64-page-claude-session
category: lessons-learned
tags: [beginners, context-windows, claude-projects, oauth]
hero: /images/blog/dad-claude-workbench.jpg
excerpt: "My dad is building a website with AI. He didn't know about context windows, Projects, or OAuth. He learned the hard way so you don't have to."
status: draft
---

My dad is 80 years old and he's building a website. Not handing it off to someone. Building it. He's been at it with Claude Chat for a few weeks, doing exactly what any motivated person does: fires it up, starts talking, and keeps going.

Last week he messaged me frustrated. Claude wasn't erroring out or crashing. It just started saying no. Refusing to help. Repeating itself instead of moving forward.

He sent me the session to look at. It was 64 pages long.

---

## The armless robot

I had to explain this without making him feel like an idiot. Because he's not. He taught himself how to talk to an AI to build something from scratch. Most people half his age won't try that. He figured out how to use a powerful tool and dove in headfirst. That's the right instinct.

But there's a mechanical fact he didn't know about. Most people don't know it until something breaks.

I told him: you've been building with an armless robot and wondering why it can't open the door.

Claude is genuinely smart. But it only knows what's in front of it right now. It has no memory. It doesn't carry forward everything you've ever told it. It works inside a window, a context window, and that window has a size.

Jack Clark, one of the co-founders of Anthropic, the company that makes Claude, put it well in a conversation with Ezra Klein: "It's like you've had a thing that has spent its entire life living in a library and has never been outside. And now you've unleashed it into the world, and all it has are its book smarts. But it doesn't really have street smarts."

[Watch the full conversation here.](https://youtu.be/lIJelwO8yHQ?t=638)

That's the thing nobody tells you when you sign up for Claude. You're not talking to something that knows you. You're talking to something that knows a lot, but only about what's on the whiteboard right now.

In 1982, an IBM PC fell off a truck and my dad brought it home. I was seven. I'd ride the bus to the mall, buy a game, come home, and spend hours in DOS just to get it to run. CONFIG.SYS, AUTOEXEC.BAT, memory managers — nobody taught me that. I just had to figure it out or the game didn't work. That's how I learned. Now I'm working in Claude Code and the CLI every day, and it's CD/ and command-line all over again. Forty years later, full circle. All of it traces back to that machine and the dad who brought it home.

I'm not an engineer. I'm a master automotive technician. I've spent my career explaining and repairing complex things that engineers built. Turns out that's exactly the skill set this moment needs. You don't need to understand how the engine was designed. You need someone who can pop the hood, tell you what's actually happening, and show you how to work with it.

---

## What a context window actually is

Think of it like a whiteboard in a meeting room.

When you start a new Claude session, the whiteboard is blank. Everything you type, your questions, Claude's answers, the back-and-forth, gets written on it. Claude can only see what's on the whiteboard. That's all it knows.

The whiteboard has a size. Once it fills up, older stuff gets pushed off the edge. Claude literally cannot see it anymore. It's not in the room. It's gone.

When my dad had a 64-page session, the whiteboard had probably been full for 40 of those pages. Claude was answering based on whatever fit in the current window. No wonder things got weird.

---

## Chat vs Projects: the other thing nobody explains

Here's the part that made my dad's eyes open up.

There are two ways to use Claude. Chat is what most people start with. You open it, you talk, you close it. Next time you open it, Claude has no idea who you are or what you were working on. The whiteboard got erased. You're starting over.

Claude Projects is different. You set it up once with context about your work: who you are, what you're building, what tone you want, what decisions you've already made. That information lives in the project and gets loaded into every conversation. It's not memory in the human sense, but it's close enough to matter.

My dad was building a website in Chat. Which meant every time he opened a new session, he had to re-explain what the site was, what he'd already built, what he wanted next. He didn't. So he just kept the same session open and kept going. And going. Sixty-four pages.

If he'd been in a Project, he could have written down the core context once, started fresh sessions as often as he needed, and Claude would have had what it needed every time. The whiteboard stays blank but the job folder is always there.

---

## The security scare that wasn't

While he was setting all this up, he hit another wall.

Claude was walking him through deploying his site. At some point it suggested connecting GitHub to Vercel. Both tools showed him a button: "Sign in with Google."

He didn't trust it. He thought signing in with Google meant Google got access to his code, his accounts, maybe everything. So he went around it. Created separate accounts on both platforms, new emails, new passwords, the whole thing. Took an hour. Added friction he's still dealing with.

Here's what actually happens when you click "Sign in with Google": Google confirms you are who you say you are and sends a token to the site. The site never sees your password. Google doesn't get access to your GitHub repos or your Vercel projects. It's actually more secure than creating a new password you might reuse or forget.

The button that looked like a trap was the safe door. The manual route he took was the one with more risk.

This isn't a knock on him. The instinct to be cautious with your accounts is correct. But "I don't understand this so I'll avoid it" is different from "I understand this and it's risky." He had the right instinct pointed at the wrong target.

---

## Why this matters more than people realize

Every word you send to Claude costs compute. Every token, roughly three-quarters of a word, requires processing. When you run a 64-page session, you're not just confusing yourself. You're burning compute that has real energy costs behind it.

I told my dad: if everyone learning AI worked this way, the inefficiency would be staggering. Not because he did anything wrong. Nobody told him there was a better way.

That's the gap I'm trying to close.

---

## What to do instead

Set up a Project for any ongoing work. Website, business plan, marketing, whatever you're building. Write two or three paragraphs of context at the start: what it is, where you are, what matters. That's your job folder.

Then start fresh sessions for each task. Homepage. Contact page. Color choices. One thing at a time.

Before you end a session where something important was decided, copy the key output to a note. Then start a new session and paste in only what's relevant to the next step.

Claude is less like a colleague you have a long relationship with, and more like a very smart contractor you're briefing for a specific job. The Project is the job folder they carry. Each session is a new meeting. Brief them, let them work, start fresh next time.

---

## He's still building

He's still at it. He's starting new sessions now, which is progress. He's not using Projects yet. I've told him to. He's going to read this post and probably text me something like "okay okay I'll try it."

That image at the top of this post is what I imagine it looks like from the inside: an older guy at a workbench, soldering iron in hand, the Claude robot standing there, a PCB project on the corkboard. Figuring it out one session at a time. At 80. While most of his peers are trying to figure out their iPad settings. The only problem is that robot has no arms. That's Chat. Switch to Projects and you give it hands. Or better yet, use Cowork — that's Claude with direct access to your computer and your files. Which means it can actually do things, not just tell you how. Just make sure you know what you're doing before you hand it the keys.

The tools are incredible. They're also unintuitive in ways nobody explains. The gap between "using AI" and "using AI well" isn't about being smart. It's about knowing a handful of mechanical facts that change everything.

Context windows are one of them. Projects are another. And sometimes the button that looks like a trap is the safe door.

Dad, if you're reading this: I love you. You're 80 and you're building a website with AI. That's not normal. That's extraordinary. But it's not surprising. You're the reason I'm here doing any of this in the first place. Now set up a Project. Your son has been doing this for a while now and he's trying to save you the headaches he already had. You don't have to learn everything the hard way. That's literally why I exist.

---

*If you're new to this and something feels off, there's probably a simple explanation. That's exactly what I work on. Reach out.*
