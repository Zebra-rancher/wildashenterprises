<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:cloudflare-account-rules -->
# Cloudflare account — wildash lives on `f4b09f…2e0c`, not opengrindr

The `wildashenterprises` Cloudflare Pages project lives under account ID `f4b09f8bd03474fa0fcd492708ba2e0c`.

The `opengrindr2026@proton.me` / `d5c43f13f8e5bd4952aa65763f712015` account is **unrelated**. Do not conflate them. Do not propose moving the Pages project. Do not accept a `CLOUDFLARE_API_TOKEN` scoped to opengrindr as sufficient for wildash deploys.

Before any `wrangler pages deploy`, run `wrangler whoami` and confirm the account ID matches `f4b09f…2e0c`. If it doesn't, stop and ask for a correctly-scoped token — do not work around it by editing `wrangler.json`.
<!-- END:cloudflare-account-rules -->
