import Link from "next/link";
import type { Agent } from "@/lib/agents";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function AgentAvatar({
  agent,
  size = "h-14 w-14",
}: {
  agent: Agent;
  size?: string;
}) {
  const ring =
    agent.accent === "sim"
      ? "border-sim/50 text-sim"
      : "border-gold/50 text-gold-bright";

  if (agent.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={agent.image}
        alt={agent.name}
        className={`${size} shrink-0 rounded-full border object-cover ${ring}`}
      />
    );
  }

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full border bg-ink-soft font-display text-lg ${ring}`}
    >
      {initials(agent.name)}
    </div>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  const badge =
    agent.accent === "sim"
      ? "border-sim/40 text-sim"
      : "border-gold/40 text-gold-bright";

  return (
    <Link
      href={`/searchers/${agent.slug}`}
      className="group flex flex-col rounded-xl border border-line bg-panel p-6 transition-colors hover:border-gold/40 hover:bg-panel-2"
    >
      <div className="flex items-center gap-4">
        <AgentAvatar agent={agent} />
        <div>
          <h3 className="font-display text-lg tracking-wide text-parchment">
            {agent.name}
          </h3>
          <p className="text-sm text-muted">{agent.title}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm italic leading-relaxed text-parchment/80">
        “{agent.stance}”
      </p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className={`rounded-full border px-2.5 py-1 font-medium ${badge}`}>
          {agent.track === "science" ? "Science" : "Theory"}
        </span>
        <span className="text-right text-muted">{agent.specialty}</span>
      </div>
    </Link>
  );
}
