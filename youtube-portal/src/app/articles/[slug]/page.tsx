import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoEmbed } from "@/components/VideoEmbed";
import { Markdown } from "@/components/Markdown";
import { SourceList } from "@/components/SourceList";
import { getAllArticles, getArticle, formatDate } from "@/lib/content";
import { getTopic } from "@/lib/topics";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const topic = getTopic(article.topic);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/articles"
        className="text-sm text-muted transition-colors hover:text-parchment"
      >
        ← All breakdowns
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {topic && (
            <Link
              href={`/topics/${topic.slug}`}
              className="rounded-full border border-line px-2.5 py-1 font-medium text-gold-bright transition-colors hover:border-gold/60"
            >
              {topic.title}
            </Link>
          )}
          <span className="text-muted">{formatDate(article.date)}</span>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-tight tracking-wide text-parchment sm:text-4xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {article.excerpt}
          </p>
        )}
      </header>

      {article.youtubeId && (
        <div className="mt-8">
          <VideoEmbed youtubeId={article.youtubeId} title={article.title} />
        </div>
      )}

      <div className="mt-10">
        <Markdown>{article.content}</Markdown>
      </div>

      <SourceList sources={article.sources} />

      <div className="mt-12 rounded-2xl border border-line bg-ink-soft p-8 text-center">
        <p className="font-display text-xl tracking-wide text-gold-bright">
          Want the visual version?
        </p>
        <p className="mt-2 text-sm text-muted">
          Most breakdowns started life as a video. Subscribe so you catch the
          next one.
        </p>
        <a
          href={siteConfig.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
        >
          ▶ Watch on YouTube
        </a>
      </div>
    </article>
  );
}
