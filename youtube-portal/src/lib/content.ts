import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// A single citation shown in the "Where I found this" section of an article.
export type Source = {
  label: string;
  url?: string;
  note?: string;
};

// One written breakdown that accompanies a video.
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO string, e.g. "2025-05-20"
  topic: string; // matches a topic slug from topics.ts
  youtubeId?: string; // the part after "watch?v=" — enables the embed
  featured?: boolean;
  sources: Source[];
  content: string; // raw markdown body
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function parseFile(file: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || file.replace(/\.md$/, "");
  return {
    slug,
    title: (data.title as string) ?? slug,
    excerpt: (data.excerpt as string) ?? "",
    date: (data.date as string) ?? "",
    topic: (data.topic as string) ?? "",
    youtubeId: data.youtubeId as string | undefined,
    featured: Boolean(data.featured),
    sources: (data.sources as Source[]) ?? [],
    content,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByTopic(topic: string): Article[] {
  return getAllArticles().filter((a) => a.topic === topic);
}

export function getFeaturedArticle(): Article | undefined {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
