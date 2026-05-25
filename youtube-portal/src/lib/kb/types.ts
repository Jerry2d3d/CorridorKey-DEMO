// ---------------------------------------------------------------------------
// The generic knowledge-engine types. NOTHING here is specific to ancient
// history — these same shapes are meant to power any reference project (the
// Hitchhiker's-Guide build, etc.). The themed content lives in `content/`;
// the engine stays neutral.
// ---------------------------------------------------------------------------

// How confident the site is in a claim, shown as a colored badge.
export type Verdict =
  | "proven"
  | "supported"
  | "contested"
  | "open"
  | "debunked"
  | "fiction";

// Which lane a position belongs to.
export type Track = "science" | "conspiracy" | "contested";

// How one position relates to another (the edges of the theory graph).
export type RelationKind =
  | "derives-from"
  | "became"
  | "competes-with"
  | "supports"
  | "contradicts"
  | "debunks"
  | "related";

export type Relation = {
  to: string; // slug of another position or subject
  kind: RelationKind;
};

// A canonical, reusable reference. The heart of the whole project: provenance.
export type Source = {
  id: string;
  label: string;
  type: "book" | "paper" | "article" | "video" | "primary-artifact" | "dataset";
  author?: string;
  year?: number;
  url?: string;
  // Where WE found it AND where IT got its data — the paper trail.
  provenance?: string;
  reliability?: "high" | "medium" | "low" | "disputed";
};

// One stance/path on a subject (a single theory or scholarly position).
export type Position = {
  slug: string;
  subject: string; // subject slug
  track: Track;
  verdict: Verdict;
  claim: string;
  body: string; // markdown
  sources: string[]; // source ids
  relations: Relation[];
  // Which research agent produced/champions this position (agent slug).
  championedBy?: string;
};

// A question with competing answers — the top-level unit users search for.
export type Subject = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  positions: string[]; // position slugs
  videoId?: string;
};
