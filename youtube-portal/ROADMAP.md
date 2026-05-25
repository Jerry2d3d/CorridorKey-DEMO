# Roadmap — The Throughline (and the reusable knowledge engine behind it)

> The channel is the hook. The website is the receipts.
>
> Videos pull people in with the *ideas* — no wall of citations. Every video
> ends the same way: **"want to know how I found this? Go to the site — every
> source is there."** This roadmap turns the site into that destination: a
> searchable, cross-referenced, *interactive* knowledge base.

---

## North star

A **Hitchhiker's-Guide-style knowledge base** you can actually use. A visitor
searches a thing — *the pyramids, mudflood, the Emerald (green) tablets, where
is Atlantis* — and sees what it is, whether it's proven/contested/debunked,
the competing theories, and **where every claim came from**.

And critically: **the engine is reusable.** This same system should power a
future *Hitchhiker's Guide to the Galaxy* project and others. So we build a
**generic knowledge engine** + a thin, swappable **content layer** on top —
never hardcode "ancient history" into the core.

---

## Reuse & modularity — the core build principle

Everything is built to be **lifted out and reused**.

- **Generic engine, themed content.** The core (entries, sources, theory
  paths, cross-references, search, ingestion, flags) knows nothing about
  history. A *content pack* (topics, branding, seed data) sits on top. Swap the
  pack → new product (e.g. the Galaxy guide).
- **Self-contained modules.** Each feature lives in its own folder under
  `src/modules/<feature>/` with its own components, types, data access, and
  seed data — so it can be copied into another project with minimal wiring.
- **Pluggable ingestion adapters.** Each data source (YouTube, web page, PDF,
  doc) is an independent adapter implementing one shared contract. Add a source
  = add an adapter. Nothing else changes.
- **Component-per-file, reusable by default.** Small, composable components;
  no feature reaches into another's internals — they talk through typed
  interfaces.

> **Open item:** you have a **boilerplate project** and a **video / idea
> project** with patterns and code you want reused. I can't access them from
> here. To actually reuse them we need to bring them into reach (see Open
> questions). Until then I'll build behind clean interfaces so your code drops
> in later.

---

## Content philosophy

- **Video ≠ essay.** The video carries the idea; depth and the paper trail
  live on the site.
- **Always point home.** External links can go in a video description, but the
  canonical "here's all my research" destination is always this website.
- **Two tracks, side by side:**
  - **Conspiracy / theory track** — "it could be this, or this, or that."
    The ideas, the claims, the alternative histories.
  - **Science / evidence track** — what's actually written down and can be
    sourced as factual.
  - Both are first-class. Sometimes the *evidence itself* is contested
    (archaeologists disagree), so the science track can branch too.
- **Provenance over assertion.** "Where did you get this, and where did *they*
  get it?" Every entry answers that.

---

## The paths model (theories that branch)

The signature feature. A **Subject** is a question — *"Where is Atlantis?"*
It holds multiple **Positions** (a.k.a. paths), each a stance someone takes:

- conspiracy paths: *Atlantic Ocean · Antarctica · Santorini · the Azores …*
  (ten competing locations)
- science paths: *"a Platonic allegory, not a real place"* · *"no physical
  evidence"* · *"possibly a folk memory of a real flood"*

Each position has:

- a **track**: `conspiracy` | `science` | `contested`
- a **verdict**: `proven` · `supported` · `contested` · `open` · `debunked` ·
  `fiction`
- its own **sources** (with provenance)
- **relations** to other positions: `derives-from`, `became`, `competes-with`,
  `supports`, `contradicts`, `debunks`

Because positions relate to each other, they form a **graph** — one theory
spins off another, two converge, a conspiracy claim gets adopted (or refuted)
by the science track. That graph is the thing we visualize.

### The visualization (a later, high-value phase)

A **branching family-tree / map of theories**: nodes are positions, edges show
how they derive, bridge, compete, and merge. Color by track (conspiracy vs
science), badge by verdict. Click a node → the entry + its sources. This is the
"wow" tool — but it depends on the data + paths existing first.

---

## Access tiers & feature flags *(all flags ON now; flippable behind members later)*

The site is two things at once: a **free reading library** and a **paid
research tool**.

- **Free — anyone, all day:** read every entry, browse topics, read an entry's
  own source list. The *content* is open.
- **Paid — Patreon / members:** the *tools* that turn content into a research
  instrument — search, cross-referencing, collation, the theory-map. e.g.
  *"how many pyramids are there, where, and how do they differ?"* is a
  cross-reference query; that's the paywalled value.

| Capability | Free | Member (paid) |
|---|---|---|
| Read an individual entry | ✅ | ✅ |
| Browse topics / categories | ✅ | ✅ |
| See an entry's own sources | ✅ | ✅ |
| **Full-text search** | — | ✅ |
| **Cross-reference queries** | — | ✅ |
| **Collation / aggregation** ("how many, where, differences") | — | ✅ |
| **Theory map / connections graph** | — | ✅ |
| Saved research / collections | — | ✅ |

**Build principle — flags everywhere now, all turned ON.** Every capability is
wrapped in a feature flag from day one. **Right now every flag is ON**, so the
site is fully open and nothing slows development. Each feature is built *as if*
it might one day move behind a logged-in member — so when that day comes it's a
config change, not a rewrite. A single `flags` config + a thin
`canUse(feature, user)` gate (today always `true`) is the whole mechanism. No
auth/Patreon/paywall is built yet — we only lay the seams.

---

## Architecture (target)

```
 Sources (YouTube · web · PDF · docs)
        │   ingestion adapters  (fetch → extract → transcribe → draft)
        ▼
 Flat files (Markdown + YAML / JSON)     ← source of truth, in git, human-reviewed
        │   npm run db:seed   (idempotent)
        ▼
 Local MongoDB  (subjects · positions · entries · sources · crossrefs)
        │   MongoDB driver
        ▼
 Next.js site  (search · entry/subject pages · theory map · debunking)
        └── generic engine + swappable content pack, gated by feature flags
```

- **Adapters** turn any source into normalized **flat files**. Humans review
  before anything is "true."
- **Flat files** are the durable source of truth (survive a DB wipe).
- **MongoDB** is the query/search engine, seeded *from* the files. Never
  hand-edited. Re-seeding has no drift.

---

## Data model (first draft)

```yaml
# subjects — a question with competing answers
subject:
  slug: "where-is-atlantis"
  title: "Where is Atlantis?"
  summary: "..."
  positions: ["atlantis-atlantic", "atlantis-santorini", "atlantis-allegory", ...]

# positions — one stance/path on a subject
position:
  slug: "atlantis-santorini"
  subject: "where-is-atlantis"
  track: "science"            # conspiracy | science | contested
  claim: "Atlantis is a memory of the Minoan eruption of Thera/Santorini."
  verdict: "contested"        # proven | supported | contested | open | debunked | fiction
  body: "..."                 # Markdown
  sources: ["src-...", "src-..."]
  relations:
    - to: "atlantis-allegory"
      kind: "competes-with"   # derives-from | became | competes-with | supports | contradicts | debunks

# sources — canonical, reusable references (the heart of it)
source:
  id: "src-..."
  label: "..."; type: "book|paper|article|video|primary-artifact|dataset"
  author: "..."; year: 2008; url: "https://..."
  provenance: "Where I found it AND where IT got its data — the paper trail."
  reliability: "high|medium|low|disputed"

# debunks — the review lane (its own track)
debunk:
  slug: "..."; targetClaim: "..."; targetWho: "..."
  reasoning: "..."; usesSources: [...]; pointsTo: ["subject-or-position-slug"]
```

---

## Ingestion — bring data in from anywhere *(top priority)*

> Per your direction, the **first** real capability after the foundation:
> pull data from **web pages, PDFs, docs, and any web source**, then YouTube.

Each source type is an **adapter** with one shared contract:

```
fetch(input)  →  extract text / transcript  →  draft normalized flat files
                 (entry + candidate claims + flagged "needs a source here")
                                   │
                                   ▼
                        human reviews & commits  →  db:seed  →  collate/match
```

- **AI drafts, human approves.** The pipeline produces *drafts*; nothing
  auto-publishes as truth.
- **Collation/matching.** Once data is in, we match across subjects — the same
  place/claim/source showing up in multiple inputs gets linked into positions
  and paths.
- **Adapters to build:** `web` (article extraction), `pdf`, `doc`, then
  `youtube` (download + transcript). The YouTube adapter is where your existing
  video-project skills should plug in.

---

## Phases

| Phase | Goal | Key deliverables |
|------|------|------------------|
| **0 — Portal** *(done)* | Channel landing site | Home, topics, breakdowns, sources, merch. |
| **1 — Modular foundation** | The reusable backbone | `src/modules/` structure, generic KB types (subjects/positions/sources/crossrefs), `flags` config + `canUse()` (all ON), content-pack split, schema validator. |
| **2 — Ingestion tools** *(priority)* | Pull data in | Source-adapter contract + `web` / `pdf` / `doc` adapters → normalized flat files; "AI drafts → human approves"; YouTube adapter slot for your video-project code. |
| **3 — Local MongoDB + seed** | Files → DB | `docker-compose` Mongo, `npm run db:seed`, indexes. Idempotent. |
| **4 — Search & pages** | The "Guide" feel | Search w/ verdict + track badges, filters, subject & position pages showing claim / sources-with-provenance. |
| **5 — Paths & collation** | Connect theories | Multi-position subjects (conspiracy vs science tracks), cross-reference matching/collation queries. |
| **6 — Theory map** | The "wow" visual | Branching family-tree/graph of positions: derive / bridge / compete / merge; color by track, badge by verdict. |
| **7 — Debunking track** | Review lane | `debunks` entries built on cited research, linking back to proven entries. Separate from main channel. |
| **8 — Polish & launch** | Ship it | Performance, mobile, SEO, deploy, real branding/merch. |
| **9 — Membership & paywall** *(later)* | Flip the flags | Auth + Patreon; set premium features to `members-only`. Gates already exist → config, not rewrite. |

---

## Seed topics (the starting library)

Real, fringe, and fictional — each a subject with conspiracy + science paths:

- **Where is Atlantis?** — the multi-path showcase (≈10 conspiracy locations vs
  science's "allegory / no evidence / flood memory").
- **How were the pyramids built?** — engineering vs. mythology.
- **Mudflood theory** — what's claimed, what's real, what isn't.
- **The Emerald / "green" tablets** — text, origin, what's actually known.
- **"Fictional" cities** — may or may not have existed; `fiction`/`open` until
  evidence says otherwise.

---

## Open questions (to decide as we build)

- **Ingestion stack:** Node/TypeScript inside the app, vs. a separate **Python**
  worker that reuses your existing video-project skills (yt-dlp / Whisper) and
  emits flat files. Decides how Phase 2 is built. *(Needs your call.)*
- **Reusing your existing code:** the boilerplate / video / idea projects aren't
  reachable from here. Add them to this repo (or paste key files), or build
  fresh behind clean interfaces and wire yours in later? *(Needs your call.)*
- **Legal / ToS:** downloading YouTube + scraping sites/PDFs has terms and
  copyright limits. We store *sources, citations, and our own summaries* — not
  wholesale copyrighted text. Worth a clear rule early.
- **Search engine:** start with MongoDB text indexes; graduate to Atlas Search
  or Meilisearch/Typesense for fuzzy/faceted search if needed.
- **Hosting:** local Mongo for dev; live site needs hosted Mongo (Atlas free
  tier) or a build step baking data into static pages.
- **Membership provider (Phase 9):** Patreon OAuth vs. an auth provider
  (Clerk/Auth.js) that links a Patreon tier. Decide only when we flip a flag.
