import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `What ${siteConfig.name} is about and how it works.`,
};

const principles = [
  {
    title: "History as one story",
    body: "We treat ancient cultures not as isolated islands but as chapters that may share a plot. Where mainstream timelines see coincidence, we ask whether there's a connection — and then test it.",
  },
  {
    title: "Show the receipts",
    body: "Every video has a written companion here with a full source list. If a claim can't be traced to something you can read, watch, or measure, it doesn't make the cut.",
  },
  {
    title: "The simulation question, honestly",
    body: "We take the simulation hypothesis seriously without pretending it's proven. The fun is in the patterns: when history rhymes a little too neatly, what would that actually imply?",
  },
  {
    title: "Review, don't just react",
    body: "We engage with what other creators and researchers are making — steelmanning the strong ideas, and being specific about where the weak ones break.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-bright">
        About the channel
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-wide text-parchment">
        We&apos;re trying to figure out how the world actually works.
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          {siteConfig.name} is an educational channel about ancient history and
          the big question hiding underneath it: are we looking at a string of
          unrelated civilizations, or pieces of a single, much older story?
        </p>
        <p>
          Along the way we keep bumping into a stranger possibility — that the
          patterns in history, physics, and myth look a little too designed.
          So we ask the obvious question out loud: <em>could reality be a
          simulation?</em> We don&apos;t claim to know. We lay out the evidence,
          steelman both sides, and let you judge.
        </p>
        <p>
          This site is the backbone of all of it. The videos are the hook; the
          breakdowns here are where you go to slow down, check the timeline, and
          follow the sources to the original material.
        </p>
      </div>

      <div className="rule-gradient my-12" />

      <h2 className="font-display text-2xl tracking-wide text-parchment">
        How we work
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {principles.map((p) => (
          <div
            key={p.title}
            className="rounded-xl border border-line bg-panel p-6"
          >
            <h3 className="font-display text-lg tracking-wide text-gold-bright">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-ink-soft p-8 text-center">
        <h2 className="font-display text-2xl tracking-wide text-gold-bright">
          Come down the rabbit hole
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          New investigations drop on the channel. The written deep-dives live
          here.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
          >
            ▶ Watch on YouTube
          </a>
          <Link
            href="/topics"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:border-gold/60"
          >
            Browse topics
          </Link>
        </div>
      </div>
    </div>
  );
}
