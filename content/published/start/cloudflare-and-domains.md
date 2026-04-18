---
title: "Cloudflare and Domains"
slug: cloudflare-and-domains
track: "Getting Things Online"
status: draft
word_count: 480
sources:
  - https://developers.cloudflare.com/dns/
  - https://developers.cloudflare.com/registrar/
  - https://developers.cloudflare.com/fundamentals/setup/manage-domains/
  - https://developers.cloudflare.com/email-routing/
  - https://blog.cloudflare.com/introducing-email-routing/
drafted_at: 2026-04-17
drafted_by: wildash-reference-writer (inline)
---

# Cloudflare and Domains

Your domain name is a lookup. Nothing more. You type wildashenterprises.com into a browser, a global phone book called DNS translates that to an IP address, and your browser talks to the server at that address. That's the whole trick.

There are two jobs inside a domain: the registrar and the DNS host. Most people buy both from the same company without knowing the difference.

The registrar owns the fact that the domain is yours. You renew with them and you transfer through them. GoDaddy, Porkbun, Cloudflare, Namecheap are all registrars.

The DNS host runs the phone book. When someone types your domain, their computer asks the DNS host where to go. Email routing and website pointers are configured here.

## Why Cloudflare is the default

Cloudflare sells domains at cost. No markup. When you renew a .com through them, you pay what Cloudflare pays the registry, which is about $10 a year. Every other mainstream registrar marks that up to $15-25.

Their DNS is free and fast. It comes with HTTPS and DDoS protection at no extra cost. For a small business, that's the cheapest serious infrastructure on the planet.

If you own a domain somewhere else, moving it is a one-afternoon job. Buy the transfer from Cloudflare, unlock it at the old registrar, paste the auth code. The move completes within a week.

## Email on your own domain for free

Cloudflare Email Routing forwards email from anything@yourdomain.com to your real inbox. Free up to 200 rules. I have travis@wildashenterprises.com and travis@atomicauto.biz both forwarding to a single Gmail.

Outgoing email is the catch. Routing only handles receiving. To send from your custom address, you need either Gmail's "Send mail as" feature with a separate SMTP provider, or a service like Fastmail or Google Workspace. I use Gmail's "Send mail as" with Fastmail's SMTP at about $3 a month per address.

## Subdomains

A subdomain is just a new record pointing somewhere. shop.yourdomain.com can go to Shopify. blog.yourdomain.com can go to a different host. Each is a separate DNS entry.

This is the main reason to own your own domain. You aren't locked to one platform. If your Shopify store isn't working, shop.yourdomain.com can point somewhere else next week and your customers barely notice.

## What to do today

If you don't own your business domain yet, go to Cloudflare and buy it. Ten minutes, ten dollars a year.

If you own it somewhere else and pay more than $12 a year, transfer it. You save money and get a faster DNS host in the process.

If you're using a generic gmail.com address on your business cards, set up Cloudflare Email Routing. An email that matches your domain costs nothing and makes you look like you run a real business, because you do.
