import Link from "next/link";
import type { Topic } from "@/lib/topics";

export function TopicCard({ topic }: { topic: Topic }) {
  const accent =
    topic.accent === "sim"
      ? { glyph: "text-sim", glow: "group-hover:border-sim/60" }
      : { glyph: "text-gold", glow: "group-hover:border-gold/60" };

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={`group flex flex-col rounded-xl border border-line bg-panel p-6 transition-colors hover:bg-panel-2 ${accent.glow}`}
    >
      <span className={`text-3xl ${accent.glyph}`}>{topic.glyph}</span>
      <h3 className="mt-4 font-display text-lg tracking-wide text-parchment">
        {topic.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {topic.blurb}
      </p>
      <span className="mt-4 text-sm font-medium text-gold-bright">
        Explore →
      </span>
    </Link>
  );
}
