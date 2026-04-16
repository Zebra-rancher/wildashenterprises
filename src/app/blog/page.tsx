import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "AI tips, how-tos, and hard-won lessons from running real businesses with AI agents.",
};

const upcoming = [
  {
    title: "Why Your AI Strategy Shouldn't Start with AI",
    excerpt:
      "Most small businesses jump to the tool before understanding the problem. Here's how to think about automation without getting distracted by shiny objects.",
    tag: "Strategy",
  },
  {
    title: "The $0 Executive Assistant",
    excerpt:
      "How I built an AI assistant that handles my morning briefing, email triage, and review responses — and what it actually cost to set up.",
    tag: "Build log",
  },
  {
    title: "Chrome Automation for Systems That Don't Have APIs",
    excerpt:
      "When the software your business depends on doesn't play nice, you make it play nice. A practical guide to browser automation.",
    tag: "Technical",
  },
];

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-4">
          Blog
        </p>
        <h1 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
          Notes from the field.
        </h1>
        <p className="reveal reveal-delay-2 text-parchment-dim text-lg mt-6 max-w-2xl">
          Hard-won lessons, practical how-tos, and the occasional rant about how
          AI is actually supposed to work for regular people.
        </p>

        {/* Published posts */}
        {posts.length > 0 && (
          <div className="mt-16 grid gap-px bg-stone-800">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className={`reveal reveal-delay-${i + 1} bg-stone-950 group hover:bg-stone-900 transition-colors duration-500`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-8 md:p-10"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2 shrink-0 md:w-32">
                      <span className="text-xs text-stone-500">
                        {post.date}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display text-xl md:text-2xl text-parchment group-hover:text-gold transition-colors duration-500">
                        {post.title}
                      </h2>
                      <p className="text-parchment-dim mt-3 leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Upcoming posts */}
        <div className="mt-16">
          <h2 className="reveal font-display text-2xl text-parchment-dim mb-6">
            Coming soon
          </h2>
          <div className="grid gap-px bg-stone-800/50">
            {upcoming.map((post, i) => (
              <article
                key={i}
                className={`reveal reveal-delay-${i + 1} bg-stone-950 p-8 md:p-10`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="shrink-0 md:w-32">
                    <span className="text-xs tracking-wide uppercase text-copper">
                      {post.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-stone-500">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 mt-3 leading-relaxed max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
