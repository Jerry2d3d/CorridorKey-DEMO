import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 50% 0%, rgba(200,162,74,0.12), transparent), radial-gradient(500px 260px at 80% 30%, rgba(94,234,212,0.10), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
        <p className="mb-5 inline-block rounded-full border border-line bg-panel/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-bright">
          History · Connections · The Simulation Question
        </p>
        <h1 className="font-display text-4xl leading-tight tracking-wide text-parchment sm:text-6xl">
          One thread runs through
          <span className="block text-gold-bright">all of it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {siteConfig.tagline} This is where the videos get their receipts — the
          full breakdown, the timeline, and every source, so you can decide for
          yourself.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright sm:w-auto"
          >
            ▶ Watch on YouTube
          </a>
          <Link
            href="/topics"
            className="w-full rounded-full border border-line px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:border-gold/60 hover:text-gold-bright sm:w-auto"
          >
            Explore the topics
          </Link>
        </div>
      </div>
    </section>
  );
}
