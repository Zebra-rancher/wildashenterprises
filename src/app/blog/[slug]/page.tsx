import type { Metadata } from "next";
import Link from "next/link";
import { getPost, getSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="text-sm text-copper hover:text-gold transition-colors"
        >
          &larr; Back to blog
        </Link>

        <h1 className="reveal font-display text-3xl md:text-4xl lg:text-5xl leading-tight mt-8">
          {post.title}
        </h1>

        <p className="reveal reveal-delay-1 text-parchment-dim text-sm mt-4">
          {post.date}
        </p>

        {post.image && (
          <div className="reveal reveal-delay-2 mt-10 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              width={1024}
              height={706}
              className="w-full h-auto"
            />
          </div>
        )}

        <article
          className="reveal reveal-delay-3 prose prose-invert prose-stone prose-headings:font-display prose-headings:text-parchment prose-p:text-parchment-dim prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-parchment mt-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
