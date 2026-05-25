import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ---------------------------------------------------------------------------
// The "search agents" — our cast of persona-driven researchers. Each one is a
// CHARACTER SHEET: an editable Markdown file in `content/agents/`. Edit a file
// and that agent's persona (and how it's meant to research) changes. The site
// renders these sheets so anyone can see how each agent is built.
// ---------------------------------------------------------------------------

export type AgentTrack = "science" | "theory";

export type Agent = {
  slug: string;
  name: string;
  title: string;
  track: AgentTrack;
  specialty: string;
  // One-line of how they approach research / what they believe.
  stance: string;
  beliefs: string[];
  // The kind of evidence this agent actively hunts FOR.
  looksFor: string[];
  researchStyle: string;
  image?: string; // optional portrait URL; falls back to a generated sigil
  accent: "gold" | "sim";
  body: string; // markdown backstory / persona / voice
};

const AGENTS_DIR = path.join(process.cwd(), "content", "agents");

function parse(file: string): Agent {
  const raw = fs.readFileSync(path.join(AGENTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || file.replace(/\.md$/, "");
  const track: AgentTrack = data.track === "theory" ? "theory" : "science";
  return {
    slug,
    name: (data.name as string) ?? slug,
    title: (data.title as string) ?? "",
    track,
    specialty: (data.specialty as string) ?? "",
    stance: (data.stance as string) ?? "",
    beliefs: (data.beliefs as string[]) ?? [],
    looksFor: (data.looksFor as string[]) ?? [],
    researchStyle: (data.researchStyle as string) ?? "",
    image: (data.image as string) || undefined,
    accent: (data.accent as "gold" | "sim") ?? (track === "science" ? "sim" : "gold"),
    body: content,
  };
}

export function getAllAgents(): Agent[] {
  if (!fs.existsSync(AGENTS_DIR)) return [];
  return fs
    .readdirSync(AGENTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAgent(slug: string): Agent | undefined {
  return getAllAgents().find((a) => a.slug === slug);
}

export function getAgentsByTrack(track: AgentTrack): Agent[] {
  return getAllAgents().filter((a) => a.track === track);
}
