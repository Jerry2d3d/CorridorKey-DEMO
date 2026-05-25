import Link from "next/link";
import type { Article } from "@/lib/content";
import { formatDate } from "@/lib/content";
import { getTopic } from "@/lib/topics";

export function ArticleCard({ article }: { article: Article }) {
  const topic = getTopic(article.topic);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col rounded-xl border border-line bg-panel p-6 transition-colors hover:bg-panel-2 hover:border-gold/40"
    >
      <div className="flex items-center gap-3 text-xs">
        {topic && (
          <span className="rounded-full border border-line px-2.5 py-1 font-medium text-gold-bright">
            {topic.title}
          </span>
        )}
        {article.youtubeId && (
          <span className="text-sim">▶ Has video</span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg leading-snug tracking-wide text-parchment transition-colors group-hover:text-gold-bright">
        {article.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {article.excerpt}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>{formatDate(article.date)}</span>
        <span className="font-medium text-gold-bright">Read breakdown →</span>
      </div>
    </Link>
  );
}
