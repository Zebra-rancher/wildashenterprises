import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content/published");

export type Post = {
  slug: string;
  title: string;
  date: string;
  image?: string;
  excerpt: string;
  content: string;
};

export function getSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPost(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  const result = await remark().use(html).process(content);
  const plainExcerpt = content.split("\n\n").find((p) => p && !p.startsWith("#")) || "";

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
    image: data.image,
    excerpt: plainExcerpt.slice(0, 200),
    content: result.toString(),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getSlugs();
  const posts = await Promise.all(slugs.map(getPost));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
