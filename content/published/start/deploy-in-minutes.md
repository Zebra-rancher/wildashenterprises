---
title: "Deploy a Site in Minutes"
slug: deploy-in-minutes
track: "Getting Things Online"
status: draft
word_count: 490
sources:
  - https://developers.cloudflare.com/pages/
  - https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
  - https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
  - https://pages.cloudflare.com/
  - https://vercel.com/docs
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# Deploy a Site in Minutes

Getting a site on the internet used to be a weekend project. It's now a coffee break. Here's the current state of play for a small business owner who wants a real website live today.

## The stack that costs nothing

Cloudflare Pages hosts static sites for free. Unlimited bandwidth, free HTTPS, global delivery, custom domain support, 500 builds per month on the free tier. That last number is more than you will use.

Vercel is the other one most people pick. Similar deal, different flavor. If you build with Next.js, Vercel is the default path. If you want the cheapest long-term and the simplest pricing, pick Cloudflare.

I use Cloudflare Pages for wildashenterprises.com. Built in Next.js, deployed with one command. Cost: zero.

## What you actually need

A GitHub account. If you don't have one, go make one. It's free and takes two minutes.

A repo with your site in it. Can be plain HTML and CSS. Can be a static site generator like Astro or Next.js in static-export mode. As long as there's an index.html at the root of the build output, you're fine.

A Cloudflare account. Also free.

That's the whole list. You don't need a server. You don't need a DevOps background. See the static-vs-backend article if you want to understand when you would need more.

## The actual steps

Push your site to a GitHub repo. If you're using Claude Code or Cowork, you can do this by asking. See github-basics if you haven't used Git before.

In your Cloudflare dashboard, go to Workers and Pages, click Create, and connect your GitHub account. Pick your repo. Cloudflare detects most frameworks and fills in the build command for you. Click deploy.

Ninety seconds later, your site is live at some-name.pages.dev.

## Adding your own domain

Buy a domain somewhere. Cloudflare sells them at cost. Porkbun is fine too. Avoid GoDaddy.

In Cloudflare, add the domain as a site, point the nameservers at Cloudflare (your registrar will have a field for this), and attach the domain to your Pages project. SSL shows up automatically. This step takes about ten minutes of clicking and up to a few hours for DNS to propagate.

## What to do today

If you have a business that doesn't have a website, or has one on Wix or Squarespace that you resent paying for, you can replace it. The front door to your business shouldn't cost you money every month.

Spin up a free GitHub account, draft a one-page static site (ask Claude to help), push it, deploy to Cloudflare Pages, and point a domain at it. You can do the whole thing in an afternoon. No surprise invoices.
