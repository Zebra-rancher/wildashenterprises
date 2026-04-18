import type { Metadata } from "next";
import Link from "next/link";
import { getStartSlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start Learning Here",
  description:
    "Two tracks for people new to building with AI — understanding what's going on, and actually shipping things.",
};

type Track = "Understanding AI" | "Building Things";
type CardStatus = "coming-soon" | "read";

const publishedSlugs = new Set(getStartSlugs());

type StartCard = {
  slug: string;
  title: string;
  description: string;
  track: Track;
  status: CardStatus;
};

// Cards are interleaved UA/BT/UA/BT/... intentionally — we want both tracks
// visible as the reader scrolls, not siloed into two separate lists.
const cards: StartCard[] = [
  {
    slug: "what-is-actually-happening",
    title: "What Is Actually Happening",
    description: "AI isn't searching the web. Here's what it's actually doing.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "github-basics",
    title: "GitHub Basics",
    description:
      "What a repo is, why it matters, and how to get your work off your laptop.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "tokens-and-context",
    title: "Tokens and Context",
    description: "Why Claude forgets things, and what you can do about it.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "deploy-in-minutes",
    title: "Deploy in Minutes",
    description:
      "How Vercel puts your project on the internet in about 30 seconds.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "models-explained",
    title: "Models Explained",
    description:
      "Haiku, Sonnet, Opus — what's the difference and when does it matter.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "cloudflare-and-domains",
    title: "Cloudflare and Domains",
    description: "What Cloudflare does and why your site needs it.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "what-is-an-agent",
    title: "What Is an Agent",
    description:
      "The difference between asking Claude something and having Claude do something.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "what-is-markdown",
    title: "What Is Markdown",
    description:
      "The .md file format — why it travels so well and where it shows up.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "projects-and-memory",
    title: "Projects and Memory",
    description:
      "How to give Claude a longer memory than a single conversation.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "finding-and-using-skills",
    title: "Finding and Using Skills",
    description:
      "How to find Claude skills on GitHub and install them in Claude Code.",
    track: "Building Things",
    status: "coming-soon",
  },
  {
    slug: "chat-vs-cowork",
    title: "Chat vs. Co-work",
    description:
      "Two ways to use Claude. Which one is right for what you're doing.",
    track: "Understanding AI",
    status: "coming-soon",
  },
  {
    slug: "static-vs-backend",
    title: "Static vs. Backend",
    description: "What \"static site\" means, and when you need a backend.",
    track: "Building Things",
    status: "coming-soon",
  },
];

const trackBorder: Record<Track, string> = {
  "Understanding AI": "border-gold/20",
  "Building Things": "border-sage/20",
};

const trackTitle: Record<Track, string> = {
  "Understanding AI": "text-gold",
  "Building Things": "text-sage",
};

const trackBadge: Record<Track, string> = {
  "Understanding AI": "text-gold border-gold/30",
  "Building Things": "text-sage border-sage/30",
};

const statusBadge: Record<CardStatus, string> = {
  "coming-soon": "text-copper/70 border-copper/30",
  read: "text-gold border-gold/40",
};

const statusLabel: Record<CardStatus, string> = {
  "coming-soon": "Coming Soon",
  read: "Read",
};

export default function StartPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="reveal text-sm tracking-[0.25em] uppercase text-gold mb-4">
          Where to Start
        </p>
        {/* TODO: replace placeholder headline with final Travis-voice copy */}
        <h1 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
          You don&apos;t need a CS degree.
          <br />
          <span className="text-parchment-dim">You need a starting point.</span>
        </h1>
        {/* TODO: replace placeholder intro with final Travis-voice copy */}
        <p className="reveal reveal-delay-2 text-parchment-dim text-lg mt-6 max-w-2xl leading-relaxed">
          Two tracks, woven together. One is about understanding what AI is
          actually doing under the hood so you stop feeling lost. The other is
          the practical stuff — GitHub, Vercel, domains, the words you keep
          hearing but nobody defined for you. Read them in any order.
        </p>

        {/* Card grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const isPublished = publishedSlugs.has(card.slug);
            const effectiveStatus: CardStatus = isPublished ? "read" : card.status;
            const baseClasses = `reveal reveal-delay-${(i % 5) + 1} border ${trackBorder[card.track]} bg-stone-950 p-8 md:p-10 group transition-colors duration-500 flex flex-col`;
            const interactiveClasses = isPublished ? " hover:bg-stone-900" : "";
            const body = (
              <>
                <span
                  className={`self-start text-xs tracking-[0.2em] uppercase border px-3 py-1 ${trackBadge[card.track]}`}
                >
                  {card.track}
                </span>
                <h2
                  className={`font-display text-2xl md:text-3xl leading-tight mt-6 ${trackTitle[card.track]} ${isPublished ? "group-hover:brightness-125" : ""} transition-all duration-500`}
                >
                  {card.title}
                </h2>
                <p className="text-parchment-dim mt-3 leading-relaxed">
                  {card.description}
                </p>
                <span
                  className={`self-start mt-6 text-xs tracking-[0.2em] uppercase border px-3 py-1 ${statusBadge[effectiveStatus]}`}
                >
                  {statusLabel[effectiveStatus]}
                </span>
              </>
            );

            if (isPublished) {
              return (
                <Link
                  key={card.slug}
                  href={`/start/${card.slug}`}
                  className={baseClasses + interactiveClasses}
                >
                  {body}
                </Link>
              );
            }

            return (
              <div key={card.slug} className={baseClasses}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
