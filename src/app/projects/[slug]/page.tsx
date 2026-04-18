import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectPage, getProjectSlugs } from "@/lib/content";

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectPage(slug).catch(() => null);
  if (!project) return {};
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectPage(slug).catch(() => null);
  if (!project) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    datePublished: project.draftedAt,
    author: { "@type": "Person", name: "Travis Decker" },
    publisher: { "@type": "Organization", name: "Wildash Enterprises" },
    mainEntityOfPage: `https://wildash.ai/projects/${slug}`,
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
    ...(project.sourceRepo ? { codeRepository: project.sourceRepo } : {}),
  };

  const hasLinks = Boolean(project.liveUrl || project.sourceRepo);

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/projects"
          className="text-sm text-copper hover:text-gold transition-colors"
        >
          &larr; Back to projects
        </Link>

        <h1 className="reveal font-display text-3xl md:text-4xl lg:text-5xl leading-tight mt-8 text-gold">
          {project.title}
        </h1>

        <p className="reveal reveal-delay-1 text-parchment-dim text-sm mt-4">
          {project.status}
        </p>

        {hasLinks && (
          <div className="reveal reveal-delay-2 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-copper hover:text-gold transition-colors"
              >
                Live site &rarr;
              </a>
            )}
            {project.sourceRepo && (
              <a
                href={project.sourceRepo}
                target="_blank"
                rel="noreferrer"
                className="text-copper hover:text-gold transition-colors"
              >
                Source &rarr;
              </a>
            )}
          </div>
        )}

        <article
          className="reveal reveal-delay-3 prose prose-invert prose-stone prose-headings:font-display prose-headings:text-parchment prose-p:text-parchment-dim prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-parchment mt-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      </div>
    </section>
  );
}
