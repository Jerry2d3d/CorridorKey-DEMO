// ---------------------------------------------------------------------------
// Feature flags. EVERY toggleable capability is listed here, and right now they
// are ALL "on" — the whole site is open to everyone. Nothing is gated yet.
//
// Later, to put a feature behind paying members, change its value to
// "members-only" (and wire up auth so the viewer carries `isMember`). That's
// the ONLY change needed — every feature already routes through `canUse()`.
// ---------------------------------------------------------------------------

export type Feature =
  | "search"
  | "crossref"
  | "collation"
  | "theoryMap"
  | "savedCollections";

export type FlagMode = "on" | "off" | "members-only";

export const flags: Record<Feature, FlagMode> = {
  search: "on",
  crossref: "on",
  collation: "on",
  theoryMap: "on",
  savedCollections: "on",
};

// Who's looking. Null/undefined = anonymous visitor. No auth is built yet, so
// today every viewer is effectively anonymous and every flag is "on".
export type Viewer = { isMember?: boolean } | null | undefined;

export function canUse(feature: Feature, viewer?: Viewer): boolean {
  const mode = flags[feature];
  if (mode === "off") return false;
  if (mode === "members-only") return Boolean(viewer?.isMember);
  return true; // "on" — open to everyone
}
