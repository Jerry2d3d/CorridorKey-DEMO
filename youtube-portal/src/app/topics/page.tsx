import type { Metadata } from "next";
import { TopicCard } from "@/components/TopicCard";
import { topics } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Topics",
  description: "The four threads we investigate.",
};

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-bright">
        The investigation
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-wide text-parchment">
        Four threads, one story
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Each topic is a way into the same question. Pick a thread and start
        pulling.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
