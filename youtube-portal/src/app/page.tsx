import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopicCard } from "@/components/TopicCard";
import { ArticleCard } from "@/components/ArticleCard";
import { VideoEmbed } from "@/components/VideoEmbed";
import { topics, getTopic } from "@/lib/topics";
import { getAllArticles, getFeaturedArticle, formatDate } from "@/lib/content";

export default function Home() {
  const featured = getFeaturedArticle();
  const featuredTopic = featured ? getTopic(featured.topic) : undefined;
  const latest = getAllArticles()
    .filter((a) => a.slug !== featured?.slug)
    .slice(0, 3);

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-6xl px-5">
        {/* Featured breakdown */}
        {featured && (
          <section className="py-16">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl tracking-wide text-parchment">
                Latest breakdown
              </h2>
              <Link
                href="/articles"
                className="text-sm font-medium text-gold-bright hover:underline"
              >
                All breakdowns →
              </Link>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
              <VideoEmbed youtubeId={featured.youtubeId} title={featured.title} />
              <div>
                {featuredTopic && (
                  <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-gold-bright">
                    {featuredTopic.title}
                  </span>
                )}
                <h3 className="mt-4 font-display text-2xl leading-snug tracking-wide text-parchment sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <p className="mt-4 text-sm text-muted">
                  {formatDate(featured.date)}
                </p>
                <Link
                  href={`/articles/${featured.slug}`}
                  className="mt-6 inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
                >
                  Read the full breakdown
                </Link>
              </div>
            </div>
          </section>
        )}

        <div className="rule-gradient" />

        {/* Topics */}
        <section className="py-16">
          <h2 className="font-display text-2xl tracking-wide text-parchment">
            What we dig into
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Four threads, one investigation: how the ancient world actually
            worked, how its stories connect, and what the patterns might be
            telling us.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </section>

        {/* Latest articles */}
        {latest.length > 0 && (
          <>
            <div className="rule-gradient" />
            <section className="py-16">
              <h2 className="font-display text-2xl tracking-wide text-parchment">
                More to read
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <section className="pb-24">
          <div className="rounded-2xl border border-line bg-gradient-to-br from-panel to-ink-soft p-10 text-center">
            <h2 className="font-display text-2xl tracking-wide text-gold-bright sm:text-3xl">
              Saw the video? This is the rabbit hole.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Subscribe for new investigations, then come back here for the
              sources, timelines, and the deeper dives that don&apos;t fit in a
              video.
            </p>
            <Link
              href="/topics"
              className="mt-6 inline-block rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:bg-gold hover:text-ink"
            >
              Start exploring
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
