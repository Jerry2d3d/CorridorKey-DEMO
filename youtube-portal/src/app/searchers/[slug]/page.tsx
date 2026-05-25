import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentAvatar } from "@/components/AgentCard";
import { Markdown } from "@/components/Markdown";
import { getAllAgents, getAgent } from "@/lib/agents";

export function generateStaticParams() {
  return getAllAgents().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return {
    title: agent.name,
    description: `${agent.name} — ${agent.title}. ${agent.stance}`,
  };
}

function Panel({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <h2 className="font-display text-sm uppercase tracking-wider text-gold-bright">
        {title}
      </h2>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-parchment/90">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-gold">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const badge =
    agent.accent === "sim"
      ? "border-sim/40 text-sim"
      : "border-gold/40 text-gold-bright";

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/searchers"
        className="text-sm text-muted transition-colors hover:text-parchment"
      >
        ← All searchers
      </Link>

      <header className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <AgentAvatar agent={agent} size="h-24 w-24" />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${badge}`}>
              {agent.track === "science" ? "Science side" : "Theory side"}
            </span>
            <span className="text-xs text-muted">{agent.specialty}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight tracking-wide text-parchment sm:text-4xl">
            {agent.name}
          </h1>
          <p className="mt-1 text-muted">{agent.title}</p>
        </div>
      </header>

      {agent.stance && (
        <blockquote className="mt-8 border-l-2 border-gold pl-5 font-display text-xl leading-snug tracking-wide text-gold-bright">
          “{agent.stance}”
        </blockquote>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Panel title="What they believe" items={agent.beliefs} />
        <Panel title="What they look for" items={agent.looksFor} />
      </div>

      {agent.researchStyle && (
        <p className="mt-5 rounded-xl border border-line bg-ink-soft p-5 text-sm text-muted">
          <span className="font-semibold text-parchment">Research style — </span>
          {agent.researchStyle}
        </p>
      )}

      {agent.body.trim() && (
        <div className="mt-10">
          <Markdown>{agent.body}</Markdown>
        </div>
      )}

      <p className="mt-12 rounded-xl border border-line bg-panel p-5 text-sm text-muted">
        This is a character sheet. Edit{" "}
        <code className="text-sim">content/agents/{agent.slug}.md</code> to
        change this searcher&apos;s persona, beliefs, or research focus.
      </p>
    </div>
  );
}
