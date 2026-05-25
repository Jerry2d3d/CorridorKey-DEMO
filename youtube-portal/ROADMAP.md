# Roadmap — The Throughline

> The channel is the hook. The website is the receipts.
>
> Videos pull people in with the *ideas*. They don't have to be a wall of
> citations. Every video ends the same way: **"want to know how I found this?
> Go to the site — every source is there."** This roadmap is the plan for
> turning the site into that destination: a searchable, cross-referenced
> knowledge base.

---

## North star

A **Hitchhiker's-Guide-style knowledge base** you can actually use. A visitor
lands, searches a thing — *the pyramids, mudflood, the Emerald (green) tablets,
a "fictional" city* — and instantly sees:

- **What it is** — a plain-language entry.
- **The verdict** — is this *proven*, *supported*, *contested*, an *open
  question*, *debunked*, or *fiction*?
- **The science behind it** — the real mechanisms / evidence.
- **Where the content comes from** — every source, and crucially *where each
  source got it from* (provenance, not just a link dump).
- **Cross-references** — what this supports, what it contradicts, and what it
  debunks.

Two intertwined layers:

1. **The "this is real / proven" layer** — the well-supported core.
2. **The debunking layer** — specific claims (and creators) we show are wrong,
   *using our own research*, always linking back to the proven entries.

---

## Content philosophy

- **Video ≠ essay.** The YouTube video carries the idea and the curiosity.
  Depth, citations, and the paper trail live on the site.
- **Always point home.** External links are fine in a video description, but
  the canonical "here's all my research" destination is always this website.
- **Debunking is a separate track.** Reviewing other people and explaining why
  they're wrong is *not* part of the main channel. It's its own content lane,
  and it leans entirely on the research database to make the case.
- **Provenance over assertion.** The differentiator is "where did you get
  this, and where did *they* get it?" Every entry has to answer that.

---

## Access tiers & feature flags *(all flags ON now; flippable behind members later)*

The site is two things at once: a **free reading library** and a **paid
research tool**.

- **Free — anyone, all day:** read every flat entry, browse topics, read an
  entry's own source list. The *content* is open.
- **Paid — Patreon / members:** the *tools* that turn the content into a
  research instrument — search, cross-referencing, and collation. e.g.
  *"how many pyramids are there, where are they, and how do they differ?"* is a
  cross-reference query across many entries; that's the paywalled value.

| Capability | Free | Member (paid) |
|---|---|---|
| Read an individual flat entry | ✅ | ✅ |
| Browse topics / categories | ✅ | ✅ |
| See an entry's own sources | ✅ | ✅ |
| **Full-text search** | — | ✅ |
| **Cross-reference queries** (compare/relate many entries) | — | ✅ |
| **Collation / aggregation** ("how many, where, differences") | — | ✅ |
| **Connections / graph view** | — | ✅ |
| Saved research / collections | — | ✅ |

**Build principle — flags everywhere now, all turned ON.** Every capability is
wrapped in a feature flag from day one. **Right now every flag is ON**, so the
whole site is open to everyone and nothing slows down development. The point is
purely architectural: each feature is built *as if* it might one day need to be
flipped off and put behind a logged-in member, so when that day comes it's a
config change — not a rewrite.

How it's structured:

- A single `flags` config lists every toggleable capability (search,
  crossref, collation, graph, saved-collections, …), all defaulting to `on`
  and open to everyone.
- A thin `canUse(feature, user)` gate wraps each capability in the data/UI
  layer. Today it always returns `true`. Later, flipping a feature to
  `members-only` makes that one gate check the user's membership — everything
  else is untouched.
- No auth, no Patreon, no paywall is built yet. We're only laying the seams so
  they can be added later without unpicking the app.

---

## Architecture (target)

```
 Flat files (Markdown + YAML / JSON)        ← source of truth, in git, human-editable
            │
            │  npm run db:seed   (ingestion script, idempotent)
            ▼
 Local MongoDB  (entries, sources, claims, crossrefs)   ← fast search & queries
            │
            │  MongoDB driver
            ▼
 Next.js site  (search UI, entry pages, debunk pages, cross-reference graph)
```

**Why this shape**

- **Flat files** stay the source of truth: version-controlled, diffable,
  reviewable, and they survive even if the database is wiped or rebuilt.
- **Local MongoDB** is the query/search engine, populated *from* the flat
  files. We never hand-edit the database directly — we edit files and re-seed.
- The seed step is **re-runnable**: change a file, run `db:seed`, the DB
  updates. No drift.

---

## Data model (first draft)

### `entries` — the core unit (a topic, claim, place, artifact, event)

```yaml
slug: "how-were-the-pyramids-built"
title: "How were the pyramids built?"
kind: "topic"            # topic | location | artifact | person | event | claim
verdict: "supported"     # proven | supported | contested | open | debunked | fiction
summary: "One-paragraph plain-language answer."
body: |                  # Markdown — the full entry, incl. 'the science behind it'
  ...
tags: ["egypt", "engineering", "ancient-history"]
videoId: "..."           # optional — the YouTube video this came from
claims:                  # the specific assertions this entry makes or examines
  - statement: "Ramps were used to move blocks."
    verdict: "supported"
    evidenceFor:  ["src-lehner-2008", "src-..."]
    evidenceAgainst: ["src-..."]
sources: ["src-lehner-2008", "src-..."]   # references into the sources collection
crossrefs:
  - to: "mudflood-theory"
    relation: "contradicts"   # supports | contradicts | debunks | related | builds-on
```

### `sources` — canonical, reusable references (this is the heart of it)

```yaml
id: "src-lehner-2008"
label: "Mark Lehner, The Complete Pyramids"
type: "book"            # book | paper | article | video | primary-artifact | dataset
author: "Mark Lehner"
year: 2008
url: "https://..."      # optional
provenance: "Where I found it AND where it got its data — the paper trail."
reliability: "high"     # high | medium | low | disputed
```

### `debunks` — the debunking track (its own content lane)

```yaml
slug: "debunking-claim-x"
targetClaim: "The specific external claim being addressed."
targetWho: "Creator / source making the claim (optional)."
verdict: "debunked"
reasoning: |            # Markdown — the argument, built on our research
  ...
usesSources: ["src-...", "src-..."]    # our research that does the refuting
pointsTo: ["how-were-the-pyramids-built"]  # the proven entries it links back to
```

> **Verdict taxonomy** (shown as colored badges in the UI):
> `proven` · `supported` · `contested` · `open` · `debunked` · `fiction`.
> This is what lets the site say *"this is real"* vs *"this proves them wrong"*
> vs *"a great story, but not established."*

---

## Phases

| Phase | Goal | Key deliverables |
|------|------|------------------|
| **0 — Portal** *(done)* | Channel landing site | Home, topics, breakdowns, sources section, merch. Markdown content. |
| **1 — Data model + flat files** | Lock the schema | `content/entries/*.md`, `content/sources/*.yml`, TypeScript types + a validator that rejects bad/missing-source entries. Add the `flags` config + `canUse()` gate (all flags ON). |
| **2 — Local MongoDB + seed** | Files → DB | `docker-compose` for local Mongo, `scripts/seed.ts` (`npm run db:seed`), text indexes for search. Idempotent re-seeding. |
| **3 — Search experience** | The "Guide" feel | Prominent search, results with verdict badges, filters by kind + verdict, entry pages showing summary / science / claims / sources-with-provenance. |
| **4 — Cross-reference layer** | Connect everything | "Supports / Contradicts / Debunks / Related" links on every entry; a simple connections/graph view. |
| **5 — Debunking track** | Review lane | `debunks` entries, a dedicated section, each one built on cited research and linking back to proven entries. Kept separate from main-channel content. |
| **6 — Video ingestion pipeline** | Drop a video → draft entry | Transcribe (e.g. Whisper) → auto-draft a structured entry + extract candidate claims + flag "needs a source here" → **human reviews & commits the flat file** → `db:seed`. Video never auto-publishes "truth"; it produces drafts. |
| **7 — Polish & launch** | Ship it | Performance, mobile, SEO, deploy, real branding, real merch links. |
| **8 — Membership & paywall** *(later)* | Flip the flags | Auth + Patreon link, then set premium features (search, crossref, collation, graph) to `members-only`. Because the gates already exist, this is config + an auth check — not a rewrite. |

---

## Seed topics (the starting library)

Real, fringe, and fictional — each gets a verdict and a source trail:

- **How the pyramids were built** — the engineering vs. the mythology.
- **Mudflood theory** — what the claim is, what's real, what isn't.
- **The Emerald / "green" tablets** — text, origin, and what's actually known.
- **"Fictional" cities** — places that may or may not have existed; flagged
  `fiction` or `open` until evidence says otherwise.
- **The science behind it** — the real mechanisms paired with every myth, so
  the database always offers the grounded explanation next to the wild one.

---

## Open questions (to decide as we build)

- **Search engine:** start with MongoDB text indexes; graduate to Atlas Search
  or a dedicated search lib (Meilisearch/Typesense) if we need fuzzy/typo
  tolerance and facets.
- **Hosting:** the DB is "local" for authoring/dev. For the live site we'll
  need a hosted Mongo (Atlas free tier) *or* a build step that bakes the data
  into static pages. Decide based on how dynamic search needs to be.
- **Video pipeline depth:** how much do we automate (full auto-draft) vs. keep
  manual? Default stance: AI drafts, human approves — never auto-publish.
- **Editorial rules:** what's the bar for each verdict? Write it down so the
  database stays trustworthy.
- **Membership provider (Phase 8):** Patreon OAuth vs. a general auth provider
  (Clerk/Auth.js) that links a Patreon tier. Decide when we actually turn a
  flag to `members-only` — not before.
