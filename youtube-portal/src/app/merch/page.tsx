import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Merch",
  description: "Wear the question.",
};

// Placeholder merch grid. Replace `href: "#"` with real store/product links
// (Teespring, Fourthwall, Shopify, etc.) once your store is live.
const products = [
  {
    name: "“Question Everything” Tee",
    blurb: "Heavyweight cotton. The channel motto, front and center.",
    glyph: "𓂀",
  },
  {
    name: "Simulation Grid Hoodie",
    blurb: "Ancient sky meets the render grid. Cozy enough to theorize in.",
    glyph: "◈",
  },
  {
    name: "One Thread Poster",
    blurb: "The connected-history timeline, printed for your wall.",
    glyph: "∞",
  },
];

export default function MerchPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-bright">
        Support the channel
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-wide text-parchment">
        Merch
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Store&apos;s being built. Here&apos;s a preview of what&apos;s coming —
        every purchase funds more research, better visuals, and longer dives.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col rounded-xl border border-line bg-panel p-6"
          >
            <div className="flex aspect-square items-center justify-center rounded-lg border border-line bg-ink-soft">
              <span className="text-6xl text-gold/70">{p.glyph}</span>
            </div>
            <h3 className="mt-4 font-display text-lg tracking-wide text-parchment">
              {p.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {p.blurb}
            </p>
            <span className="mt-4 inline-block rounded-full border border-line px-4 py-2 text-center text-sm font-semibold text-muted">
              Coming soon
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-ink-soft p-8 text-center">
        <p className="text-muted">
          Want to know the moment the store opens?
        </p>
        <a
          href={siteConfig.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
        >
          ▶ Subscribe on YouTube
        </a>
      </div>
    </div>
  );
}
