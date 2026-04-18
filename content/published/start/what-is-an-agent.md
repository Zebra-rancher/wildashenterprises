---
title: "What Is an Agent"
slug: what-is-an-agent
track: "Understanding AI"
status: draft
word_count: 639
sources:
  - https://www.anthropic.com/engineering/building-effective-agents
  - https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer
---

The difference between asking Claude something and having Claude do something.

Picture two kinds of help in a shop. The first is when I stand at the parts counter and ask the guy behind it a question. He answers, I walk out, I go do the work myself. The second is when I hand him a work order and say get the truck back on the road by Friday. He pulls parts, calls the customer, schedules the tech, orders what's missing. He doesn't come back to me for every decision. He comes back when the job is done or when he hits something only I can answer.

Both are useful. They are not the same thing.

A regular chat with Claude is the first guy. You ask, it answers, you go do the thing. An agent is the second guy. You give it a goal, it picks the steps, it uses tools to actually do the work, and it checks its own progress along the way.

## What makes it an agent

Anthropic's own definition is pretty clean. An agent is a system where the model "dynamically directs its own processes and tool usage, maintaining control over how they accomplish tasks." Another way they put it: an agent is "LLMs using tools based on environmental feedback in a loop."

Three things have to be true.

It has a goal, not just a question. "Book me a flight" is a goal. "What's a good airline" is a question.

It has tools. A tool is any function the model can call to do something in the real world. Read a file. Search the web. Send an email. Query a database. Without tools, a chat model can only talk. With tools, it can act.

It runs in a loop. The agent makes a move, looks at what happened, decides the next move. That loop is the whole game. A worker who never checks their work isn't an agent, they're a hazard.

One flavor of agent worth knowing about is the orchestrator, whose job is mostly to route work to other agents or tools instead of doing everything itself. For example, an orchestrator might get a research question and hand it to a web-search agent instead of trying to answer from memory, then stitch the result back into the main conversation.

## What you can do today

Open Claude and give it a task that requires an action, not an answer. "Read the last three emails from my accountant and summarize what she needs from me." If you're using a surface where Claude has tools (Claude Code, Claude with MCP servers, Cowork in the browser), watch what it does. It will open the inbox, read the messages, and come back with the summary. That's an agent doing a small job end to end. If you're in a surface where Claude doesn't have tools yet, the same prompt will just get you a polite explanation of why it can't. Same model, different surface, totally different outcome. The tools are the difference.

## Why this matters for AI work

Most of the people I talk to are still using Claude like a search bar. They type, they read, they copy the answer somewhere else, they do the work themselves. That's fine for quick questions. It's the wrong shape for anything repetitive. The minute your question becomes "handle this kind of task from now on," you want an agent, not a chat. Agents are also where the real payoff is for a small business. One good agent can eat a whole task you used to dread, and it gets better as you give it more context to work with. Which is why the next thing worth reading is [Projects and Memory](/start/projects-and-memory). An agent with no memory is a worker with amnesia. Useful once. Not useful twice.
