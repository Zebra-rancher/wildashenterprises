---
title: "Static vs Backend"
slug: static-vs-backend
track: "Getting Things Online"
status: draft
word_count: 475
sources:
  - https://www.cloudflare.com/learning/performance/what-is-jamstack/
  - https://developers.cloudflare.com/workers/
  - https://vercel.com/docs/functions
  - https://developers.cloudflare.com/pages/functions/
  - https://www.netlify.com/blog/2021/05/26/how-to-build-dynamic-applications-on-the-jamstack-with-serverless-functions/
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# Static vs Backend

Every website falls into one of two buckets. Getting this right up front saves you months of confusion and a lot of money.

A static site is a pile of files. HTML, CSS, a few images. A server hands those files to visitors exactly as they are. Every visitor sees the same thing. The server isn't thinking. It's handing out photocopies.

A backend site has a server that runs code on every visit. Log in with your own account. See data specific to you. Fill out a form that writes to a database. The server is doing work, per visitor, per request.

## When static is enough

A brochure site. A blog. Documentation. A landing page. A portfolio. A restaurant menu.

If the content is the same for everybody and updates only when you push new files, static is fine. Static sites are cheap to host and fast to load. Cloudflare Pages will host one for zero dollars forever.

The Atomic Auto site is static. The Wildash Enterprises site is static. Neither one needs a server doing work on every page load.

## When you need a backend

Anything personalized to the user. Customer accounts. Shopping carts. Admin dashboards. Real-time data.

The moment your site has the word "login," you have a backend. The moment your site stores something specific to the person who visited, you have a backend.

Stripe checkout is technically a backend service, but it's someone else's. You can have a static site that sends customers to Stripe for payment. That counts as static with an outsourced backend.

## The middle ground

Static site plus serverless functions. The 90% of the site that's the same for everyone is static and fast. The 10% that needs to do real work runs as a function that spins up only when someone hits it, then goes back to sleep.

A contact form that sends email. A search query that hits an API. A small lookup that pulls live data. Each one is a function, not a full server.

Cloudflare Workers, Vercel Functions, and AWS Lambda all do this. You pay fractions of a cent per call. Most small business sites never cross the free tier.

This is the shape of modern small-business web. Static content for the bulk of the site, a handful of functions for the dynamic parts, nothing running 24/7, nothing costing money while you sleep.

## What to do today

If you're planning a new site, default to static. You can always add a function later for a specific feature.

If you're paying for hosting right now, check what your site actually needs. A lot of small business sites are running on expensive backend infrastructure when they could be static plus a contact form function. The difference is often $40-100 a month.

See deploy-in-minutes for the mechanics of getting a static site live.
