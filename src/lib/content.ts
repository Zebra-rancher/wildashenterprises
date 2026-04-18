import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const startDir = path.join(process.cwd(), "content/published/start");
const projectsDir = path.join(process.cwd(), "content/projects");

export type Track = "Understanding AI" | "Building Things";

export type StartArticle = {
  slug: string;
  title: string;
  track: Track;
  wordCount: number;
  readMinutes: number;
  draftedAt: string;
  excerpt: string;
  sources: string[];
  contentHtml: string;
};

export type ProjectPage = {
  slug: string;
  title: string;
  status: string;
  wordCount: number;
  readMinutes: number;
  draftedAt: string;
  excerpt: string;
  liveUrl?: string;
  sourceRepo?: string;
  contentHtml: string;
};

const REQUIRED_FIELDS = ["title", "slug", "status", "word_count", "drafted_at"] as const;

function assertFrontmatter(file: string, data: Record<string, unknown>): void {
  const missing = REQUIRED_FIELDS.filter((key) => data[key] === undefined || data[key] === null || data[key] === "");
  if (missing.length > 0) {
    throw new Error(`Frontmatter missing required fields in ${file}: ${missing.join(", ")}`);
  }
}

async function renderMarkdown(raw: string): Promise<string> {
  const result = await remark().use(html).process(raw);
  return result.toString();
}

const START_LINK_PATTERN = /<a href="\/start\/([^"#?]+)(#[^"]*)?">([^<]*)<\/a>/g;

function rewriteUnknownStartLinks(rendered: string, knownSlugs: Set<string>): string {
  return rendered.replace(START_LINK_PATTERN, (match, slug: string, _hash, text: string) => {
    if (knownSlugs.has(slug)) return match;
    return `<span class="text-parchment-dim underline decoration-dotted cursor-help" title="Coming soon">${text}</span>`;
  });
}

function firstParagraph(body: string): string {
  const paragraphs = body.split("\n\n").map((p) => p.trim());
  return paragraphs.find((p) => p && !p.startsWith("#") && !p.startsWith("```")) ?? "";
}

function computeReadMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 220));
}

function listMarkdownSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getStartSlugs(): string[] {
  return listMarkdownSlugs(startDir);
}

export async function getStartArticle(slug: string): Promise<StartArticle> {
  const filePath = path.join(startDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  assertFrontmatter(filePath, data);

  const wordCount = Number(data.word_count);
  const sources = Array.isArray(data.sources) ? data.sources.filter((s): s is string => typeof s === "string") : [];
  const track: Track = data.track === "Building Things" ? "Building Things" : "Understanding AI";
  const excerpt = firstParagraph(content).slice(0, 200);
  const knownSlugs = new Set(getStartSlugs());
  const rendered = rewriteUnknownStartLinks(await renderMarkdown(content), knownSlugs);

  return {
    slug: String(data.slug),
    title: String(data.title),
    track,
    wordCount,
    readMinutes: computeReadMinutes(wordCount),
    draftedAt: String(data.drafted_at),
    excerpt,
    sources,
    contentHtml: rendered,
  };
}

export async function getAllStartArticles(): Promise<StartArticle[]> {
  const slugs = getStartSlugs();
  const articles = await Promise.all(slugs.map(getStartArticle));
  return articles.sort((a, b) => (a.draftedAt < b.draftedAt ? 1 : -1));
}

export function getProjectSlugs(): string[] {
  return listMarkdownSlugs(projectsDir).filter((slug) => slug !== "index");
}

export async function getProjectPage(slug: string): Promise<ProjectPage | null> {
  const filePath = path.join(projectsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  assertFrontmatter(filePath, data);

  const wordCount = Number(data.word_count);
  const excerpt = firstParagraph(content).slice(0, 200);

  return {
    slug: String(data.slug),
    title: String(data.title),
    status: String(data.status),
    wordCount,
    readMinutes: computeReadMinutes(wordCount),
    draftedAt: String(data.drafted_at),
    excerpt,
    liveUrl: typeof data.live_url === "string" ? data.live_url : undefined,
    sourceRepo: typeof data.source_repo === "string" ? data.source_repo : undefined,
    contentHtml: await renderMarkdown(content),
  };
}
