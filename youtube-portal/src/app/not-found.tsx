import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <span className="text-5xl text-gold">◈</span>
      <h1 className="mt-6 font-display text-3xl tracking-wide text-parchment">
        This timeline doesn&apos;t exist
      </h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for slipped out of the record. Let&apos;s
        get you back to something real.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
        >
          Back home
        </Link>
        <Link
          href="/topics"
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:border-gold/60"
        >
          Browse topics
        </Link>
      </div>
    </div>
  );
}
