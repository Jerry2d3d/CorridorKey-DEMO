import type { Source } from "@/lib/content";

// The "Where I found this" section — the heart of the channel's promise:
// every claim in a video has a checkable source here.
export function SourceList({ sources }: { sources: Source[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-12 rounded-xl border border-line bg-ink-soft p-6">
      <h2 className="font-display text-lg tracking-wide text-gold-bright">
        Sources — where I found this
      </h2>
      <p className="mt-1 text-sm text-muted">
        Check the work yourself. Every claim should trace back to something you
        can read.
      </p>
      <ol className="mt-5 space-y-4">
        {sources.map((source, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="mt-0.5 font-mono text-gold">[{i + 1}]</span>
            <div>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-sim underline decoration-sim/40 underline-offset-2 hover:decoration-sim"
                >
                  {source.label}
                </a>
              ) : (
                <span className="font-medium text-parchment">
                  {source.label}
                </span>
              )}
              {source.note && (
                <p className="mt-1 text-muted">{source.note}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
