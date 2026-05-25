// ---------------------------------------------------------------------------
// EDIT THIS FILE to rebrand the whole site. Everything below flows into the
// header, footer, page titles, and links. No other files need to change to
// rename the channel or point it at your real YouTube + social accounts.
// ---------------------------------------------------------------------------

export const siteConfig = {
  // The channel / site name shown in the header and titles.
  name: "The Throughline",
  // A shorter version used in tight spaces (footer, mobile).
  shortName: "Throughline",

  // One-line pitch shown under the logo and on the home hero.
  tagline:
    "Ancient history, lost connections, and the question of whether it's all a simulation.",

  // Longer description used for SEO / social previews.
  description:
    "A companion portal for the channel. After the video, come here for the written breakdown, the timeline, and every source — so you can check the work yourself.",

  // Your public site URL (used for metadata). Update when you deploy.
  url: "https://example.com",

  // Link to your YouTube channel. The big 'Watch' buttons point here.
  youtubeUrl: "https://www.youtube.com/@your-channel-handle",

  // Top navigation. Re-order or remove items freely.
  nav: [
    { label: "Topics", href: "/topics" },
    { label: "Breakdowns", href: "/articles" },
    { label: "About", href: "/about" },
    { label: "Merch", href: "/merch" },
  ] as { label: string; href: string }[],

  // Footer / social links. Leave a value empty ("") to hide that link.
  socials: {
    youtube: "https://www.youtube.com/@your-channel-handle",
    x: "",
    instagram: "",
    tiktok: "",
    email: "hello@example.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
