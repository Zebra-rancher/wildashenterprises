import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStartArticle, getStartSlugs, type Track } from "@/lib/content";

const trackBadge: Record<Track, string> = {
  "Understanding AI": "text-gold border-gold/30",
  "Building Things": "text-sage border-sage/30",
};

const trackTitle: Record<Track, string> = {
  "Understanding AI": "text-gold",
  "Building Things": "text-sage",
};

export async function generateStaticParams() {
  return getStartSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getStartArticle(slug).catch(() => null);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function StartArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getStartArticle(slug).catch(() => null);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.draftedAt,
    author: { "@type": "Person", name: "Travis Decker" },
    publisher: { "@type": "Organization", name: "Wildash Enterprises" },
    mainEntityOfPage: `https://wildash.ai/start/${slug}`,
  };

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/start"
          className="text-sm text-copper hover:text-gold transition-colors"
        >
          &larr; Back to all articles
        </Link>

        <span
          className={`reveal inline-block mt-8 text-xs tracking-[0.2em] uppercase border px-3 py-1 ${trackBadge[article.track]}`}
        >
          {article.track}
        </span>

        <h1
          className={`reveal reveal-delay-1 font-display text-3xl md:text-4xl lg:text-5xl leading-tight mt-6 ${trackTitle[article.track]}`}
        >
          {article.title}
        </h1>

        <p className="reveal reveal-delay-2 text-parchment-dim text-sm mt-4">
          {article.readMinutes} min read
        </p>

        <article
          className="reveal reveal-delay-3 prose prose-invert prose-stone prose-headings:font-display prose-headings:text-parchment prose-p:text-parchment-dim prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-parchment mt-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {article.sources.length > 0 && (
          <section className="mt-16 pt-8 border-t border-stone-800">
            <h2 className="font-display text-xl text-gold">Sources</h2>
            <ul className="mt-4 space-y-2">
              {article.sources.map((url) => (
                <li key={url} className="text-sm break-all">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-parchment-dim hover:text-gold transition-colors"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
}
