# Lynn's Nailbar — website

Premium marketing site for Lynn's Nailbar, a BIAB & gellak nail salon in Nijmegen.
The single goal of every page is to get the visitor into the Salonized booking flow.

## Stack

Next.js 16.3 (App Router, Turbopack) · React 19.3 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Radix primitives (shadcn/ui style) · Lucide icons.

Upgraded from Next 15 in Sept 2026 to clear a critical RCE advisory. Next 16 ships
its own docs in `node_modules/next/dist/docs/` — read those rather than assuming
15.x conventions.

## Where things live

- `src/lib/site.ts` — **all** business content: treatments, prices, reviews, FAQ,
  house rules, contact details. Copy changes happen here, never in components.
- `src/lib/images.json` — generated image manifest (path, intrinsic size, Dutch alt
  text, base64 LQIP). Regenerate rather than hand-edit.
- `src/components/sections/` — one file per page section.
- `src/components/ui/` — small shared primitives (buttons, reveal, accordion…).

## Pages

Restructured Sept 2026 on the owner's feedback. Five routes, and the old
`/prijslijst`, `/gallerij` and `/over-lynn` are permanent redirects in
`next.config.ts`.

- `/` — deliberately short: hero, one review, three reasons, book. Resist adding
  sections here; the whole point of the rework was that it had nine.
- `/behandelingen` — treatments **and** prices on one page. Each price sits with
  its treatment and is never restated in a summary table further down; the only
  tables cover add-ons and removal. FAQ and house rules live here too.
- `/galerij` — full masonry plus the Instagram strip.
- `/over-de-salon` — her story and the review slider.
- `/contact` — details, map, booking.

## Design system

Tokens live in `@theme` in `src/app/globals.css`. Use the semantic Tailwind classes
(`bg-cream`, `text-ink`, `border-line`, `font-display`) — never raw hex values.

Type: Cormorant Garamond for display, Manrope for everything else. Section labels use
the `<Eyebrow>` component; its `index` prop adds editorial `01 —` numbering, which is
now only used for the treatment bands, where the count means something.

Motion is deliberately restrained: fade plus a small translate on scroll-in, and
150–200ms hover transitions. Everything respects `prefers-reduced-motion`.

## Content rules

- The site is in Dutch. Keep customer-facing copy in Dutch.
- Copy where Lynn speaks is **first person**. She asked for it to sound like her
  and not like a brochure, so no "Lynn werkt met…" in `differentiators`, `about`
  or `availabilityNote`.
- Prices and house rules are the salon's real published terms. Do not alter the
  numbers without the owner's say-so.
- Treatment durations in `site.ts` are marked `durationIsEstimate` — they were not
  published on the old site and still need confirming by the owner.
- Reviews carry no attribution. The old initials ("S. V.") were removed on her
  instruction; `name` is optional and only filled once a customer agrees to it.

## Still owed by the owner

Her new logo, photography, prices and copy all landed in Sept 2026. What is left:

- **Treatment durations.** Still `durationIsEstimate` in `site.ts` and never
  published on the old site. They are shown as fact on `/behandelingen`.
- **Airbrush.** She described it in her written feedback but it does not appear
  on the price list she sent, so it is not on the site. Confirm before adding.
- **`/contact` closing photo** still uses `salon-werkplek` from the old shoot.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
