import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { topics, getTopic } from "@/lib/topics";
import { getArticlesByTopic } from "@/lib/content";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.blurb };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const articles = getArticlesByTopic(slug);
  const accentText = topic.accent === "sim" ? "text-sim" : "text-gold";

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <Link
        href="/topics"
        className="text-sm text-muted transition-colors hover:text-parchment"
      >
        ← All topics
      </Link>

      <div className="mt-6 flex items-start gap-4">
        <span className={`text-5xl ${accentText}`}>{topic.glyph}</span>
        <div>
          <h1 className="font-display text-4xl leading-tight tracking-wide text-parchment">
            {topic.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            {topic.blurb}
          </p>
        </div>
      </div>

      <div className="rule-gradient my-12" />

      {articles.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-line bg-panel p-10 text-center">
          <p className="text-muted">
            No breakdowns here yet — the first one is on its way.
          </p>
          <Link
            href="/articles"
            className="mt-4 inline-block text-sm font-medium text-gold-bright hover:underline"
          >
            Browse every breakdown →
          </Link>
        </div>
      )}
    </div>
  );
}
