import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Breakdowns",
  description: "Every written deep-dive, with sources.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-bright">
        The written archive
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-wide text-parchment">
        Breakdowns
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        The long version of every video — the timeline, the argument, and the
        sources behind it.
      </p>

      <div className="mt-10">
        {articles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-panel p-10 text-center text-muted">
            No breakdowns published yet. Add a Markdown file in{" "}
            <code className="text-sim">content/articles/</code> to get started.
          </div>
        )}
      </div>
    </div>
  );
}
