---
title: "Tokens and Context"
slug: tokens-and-context
track: "Understanding AI"
status: draft
word_count: 557
sources:
  - https://platform.claude.com/docs/en/build-with-claude/context-windows
  - https://platform.claude.com/docs/en/resources/glossary
  - https://wildashenterprises.com/blog/2026-04-15-my-dad-sent-me-a-64-page-claude-session
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer
---

Why Claude forgets things, and what you can do about it.

Picture a tech working a job with one clipboard. Everything goes on that clipboard: notes about the car, questions from the service writer, the running estimate. It has a set amount of paper. Once it fills up, the oldest pages fall off the back. The tech is still sharp. But if it isn't on the clipboard in front of him, he can't use it.

That's Claude in a session. It isn't broken or tired. It's just working off what's currently on the clipboard.

## What a token actually is

A token is a chunk of text the model reads as one piece. Sometimes that's a whole word, sometimes it's half a word or even a stray comma. Anthropic's own docs put it at roughly 3.5 English characters per token on average. Your sentences get chopped into these little pieces before the model ever sees them, and every piece costs a slot.

The context window is the total number of slots available. Current Claude models run either a 200,000-token window or a 1,000,000-token window, depending on which one you're using. That number covers everything: your messages, Claude's replies, any files you pasted in, and the response it's about to write. All of it shares the same clipboard.

## When the clipboard fills up

On the API, newer Claude models throw a clean error when you go over. In a chat interface like Claude.ai, the older stuff quietly rolls off the back and disappears from the model's view. You keep typing, Claude keeps answering, and neither of you gets a warning that the first half of the conversation is gone.

This is the wall my dad hit. He'd been building a website in a single Claude Chat session for weeks. No error, no warning. Claude just started refusing things and repeating itself. By the time he sent me the session, it was 64 pages long and the top third had already slid off the clipboard before Claude ever got to his latest question. I wrote the whole story up here: [My Dad Sent Me a 64-Page Claude Session](/blog/2026-04-15-my-dad-sent-me-a-64-page-claude-session).

There's also a second effect Anthropic flags in their docs. They call it context rot. Even when everything still technically fits, accuracy and recall get worse as the window fills up. More context is not automatically better. A tidy clipboard beats a cluttered one.

## One thing you can do today

Start a fresh session when you switch tasks. Not every three messages, just when the topic actually changes. If you were troubleshooting a booking form and now you want to write a customer email, open a new chat. Paste in a sentence or two of background that matters. Leave the rest behind.

That one habit will save you more trouble than any clever prompt.

## Why this matters for AI work

A bloated session leaves Claude half-blind. Give it a cleaner clipboard and the answers get sharper, because the model actually has room to think about your question instead of picking through old scrollback. Once you feel that difference, the next question is obvious. How do I keep the stuff I actually want Claude to remember from one session to the next? That's where Projects comes in, and that's the next stop. Read [Projects and Memory](/start/projects-and-memory) when you're ready.
