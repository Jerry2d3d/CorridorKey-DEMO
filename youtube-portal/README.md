# The Throughline — channel portal

A companion website for a YouTube channel about ancient history, how separate
histories connect into one story, and the simulation question. Viewers land
here after a video to get the written breakdown, the timeline, and **every
source** so they can check the work.

Built with Next.js (App Router) + React + Tailwind CSS. Articles are plain
Markdown files — no coding needed to publish a new breakdown.

## Run it locally

```bash
npm install      # first time only
npm run dev      # start the dev server
```

Then open http://localhost:3000.

```bash
npm run build    # production build
npm start        # serve the production build
```

## Rebrand it (change the channel name, links, nav)

Everything brand-related lives in one file: **`src/site.config.ts`**.
Edit the channel name, tagline, YouTube URL, social links, and the top
navigation there — nothing else needs to change.

## Add a new video breakdown

1. Create a file in **`content/articles/`**, e.g. `my-new-video.md`. The file
   name (minus `.md`) becomes the URL: `/articles/my-new-video`.
2. Start it with this frontmatter block, then write the body in Markdown:

   ```markdown
   ---
   title: "Your title"
   excerpt: "One or two sentences shown on cards and previews."
   date: "2025-05-25"
   topic: "ancient-history"   # see the topic slugs below
   youtubeId: "dQw4w9WgXcQ"   # the part after watch?v= (omit if no video yet)
   featured: true             # optional — shows it on the home page
   sources:
     - label: "Name of the source"
       url: "https://example.com/the-source"   # optional
       note: "Why it matters / what it backs up"  # optional
   ---

   ## A heading

   Your writing here. Normal **Markdown** works: lists, links, quotes, etc.
   ```

3. Save. The site picks it up automatically.

### Topic slugs

Defined in `src/lib/topics.ts`. Out of the box:

- `ancient-history`
- `lost-connections`
- `the-simulation-question`
- `reviews`

Edit that file to rename, recolor, or add topics.

## Where things live

```
src/site.config.ts      → brand: name, tagline, links, nav
src/lib/topics.ts       → the topic categories
content/articles/*.md   → your written breakdowns (add files here)
src/app/                → pages (home, about, topics, articles, merch)
src/components/          → reusable UI (cards, video embed, source list, ...)
```

## Deploy

Any host that runs Next.js works. The simplest is [Vercel](https://vercel.com):
push this folder to a Git repo, import it, and deploy. Remember to update
`url` in `src/site.config.ts` to your real domain.
