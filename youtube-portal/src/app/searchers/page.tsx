import type { Metadata } from "next";
import { AgentCard } from "@/components/AgentCard";
import { getAgentsByTrack } from "@/lib/agents";

export const metadata: Metadata = {
  title: "The Searchers",
  description:
    "Meet the cast of research agents — the personas who gather the evidence behind every entry.",
};

export default function SearchersPage() {
  const science = getAgentsByTrack("science");
  const theory = getAgentsByTrack("theory");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-bright">
        Who does the research
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-wide text-parchment">
        Meet the Searchers
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        The research isn&apos;t done by one neutral voice. It&apos;s done by a
        cast of characters — each with a persona, a specialty, and a point of
        view. Every one of them is a <strong className="text-parchment">
        character sheet</strong> you can read and edit.
      </p>

      <div className="mt-6 rounded-xl border border-line bg-ink-soft p-6">
        <h2 className="font-display text-lg tracking-wide text-gold-bright">
          How the cast keeps it honest
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>
            <strong className="text-parchment">They advocate.</strong> A
            theory-side searcher researches <em>as if its idea is real</em> —
            hunting for the strongest supporting evidence, not trying to debunk
            it. The science side hunts for hard, citable fact.
          </li>
          <li>
            <strong className="text-parchment">Real sources only.</strong> A
            persona shapes what an agent looks for and how it argues — never
            whether it invents evidence. Every finding cites something checkable.
          </li>
          <li>
            <strong className="text-parchment">The verdict is separate.</strong>{" "}
            Agents produce the positions; the site&apos;s verdict badge is
            applied on top. A passionately-argued theory can still come out{" "}
            <em>contested</em>.
          </li>
        </ul>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-wide text-parchment">
          <span className="text-sim">◇</span> The science side
        </h2>
        <p className="mt-1 text-sm text-muted">
          Evidence-first. &ldquo;This is what we can actually source.&rdquo;
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {science.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-wide text-parchment">
          <span className="text-gold">◆</span> The theory side
        </h2>
        <p className="mt-1 text-sm text-muted">
          Idea-first. &ldquo;What if it&apos;s real — where&apos;s the evidence
          for that?&rdquo;
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {theory.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </section>

      <p className="mt-12 rounded-xl border border-line bg-panel p-5 text-sm text-muted">
        Want to add or change a searcher? Each one is a Markdown file in{" "}
        <code className="text-sim">content/agents/</code>. Edit the persona,
        beliefs, and what they look for — the site updates automatically.
      </p>
    </div>
  );
}
