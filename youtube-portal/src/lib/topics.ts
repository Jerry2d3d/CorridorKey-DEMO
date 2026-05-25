// The big themes of the channel. Each article points at one topic via its
// `topic:` frontmatter field (using the `slug` below).

export type Topic = {
  slug: string;
  title: string;
  blurb: string;
  // A short symbol shown on the topic card. Swap for any emoji you like.
  glyph: string;
  // "gold" leans ancient/historical, "sim" leans digital/simulation.
  accent: "gold" | "sim";
};

export const topics: Topic[] = [
  {
    slug: "ancient-history",
    title: "Ancient History",
    blurb:
      "Civilizations, timelines, and the records they actually left behind — before the retellings smoothed everything over.",
    glyph: "𓂀",
    accent: "gold",
  },
  {
    slug: "lost-connections",
    title: "Lost Connections",
    blurb:
      "How separate histories — different continents, different ages — may be threads of one larger, shared story.",
    glyph: "∞",
    accent: "gold",
  },
  {
    slug: "the-simulation-question",
    title: "The Simulation Question",
    blurb:
      "Where the patterns get strange. What the repeating shapes of history might suggest about the nature of reality itself.",
    glyph: "◈",
    accent: "sim",
  },
  {
    slug: "reviews",
    title: "Reviews & Responses",
    blurb:
      "Breaking down what other creators and researchers are claiming — what holds up, what doesn't, and why.",
    glyph: "⌬",
    accent: "sim",
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
