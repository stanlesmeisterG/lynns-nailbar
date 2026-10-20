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
- `src/lib/images.json` — image manifest (path, intrinsic size, Dutch alt text,
  base64 LQIP). Only the `alt` is written by hand; `npm run images`
  (`scripts/build-image-manifest.mjs`) fills in the rest, and scales down any
  photo over 2400px in place. To swap a photo for a better file, overwrite it in
  `public/images/` under the same name and run the script. A new photo needs an
  entry with an `alt` first, or the script skips it.
- `src/components/sections/` — one file per page section.
- `src/components/ui/` — small shared primitives (buttons, reveal, accordion…).

## Pages

Restructured Sept 2026 on the owner's feedback and trimmed again in Oct 2026.
Five routes, and the old `/prijslijst`, `/gallerij` and `/over-lynn` are
permanent redirects in `next.config.ts`.

- `/` — deliberately short: hero (crossfading photos), one review, book. Resist
  adding sections here; the whole point of the rework was that it had nine. The
  "Waarom" block was removed in Oct 2026 because her story says the same.
- `/behandelingen` — treatments **and** prices on one page. Each price sits with
  its treatment and is never restated in a summary table further down; the only
  table left covers removal. Nail art levels and chrome are three cards. FAQ and
  house rules live here too.
- `/galerij` — two drifting photo strips with the lightbox, then the Instagram
  bar. No masonry, and no second photo marquee.
- `/over-de-salon` — her story and the review slider.
- `/contact` — details, map, booking. No opening hours, no closing photo.

The salon's number is published as **WhatsApp only** (`contact.whatsappHref`) —
Lynn asked for fewer calls. Don't add `tel:` links. TikTok is gone too.

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
  and not like a brochure, so no "Lynn werkt met…" in `about` or
  `availabilityNote`.
- Prices and house rules are the salon's real published terms. Do not alter the
  numbers without the owner's say-so.
- Treatment durations in `site.ts` are marked `durationIsEstimate` — they were not
  published on the old site and still need confirming by the owner.
- Reviews carry no attribution. The old initials ("S. V.") were removed on her
  instruction; `name` is optional and only filled once a customer agrees to it.

## Still owed by the owner

Her logo, prices and copy landed in Sept 2026, her second round of feedback in
Oct 2026. What is left:

- **Full-size originals of the Oct 2026 photos.** Her feedback came as a Word
  file, which shrank every photo in it to about 300px wide. All of them except
  `gellak-rood-armbanden` are in `public/images/` at that size as stand-ins —
  overwrite each with the original under the same name, then `npm run images`.
- **A new portrait** for `/over-de-salon`. `lynn-portret` is a temporary pick of
  hers; the older `lynn-salon` is still in the folder.
- **More reviews.** She has 15 on Google; the site quotes four. The count next
  to the stars (`googleReviewCount`) links out to Google meanwhile.
- **BIAB and gellak durations.** Still `durationIsEstimate` in `site.ts` and
  never published on the old site. They are shown as fact on `/behandelingen`.
  Nail art's "15–45 min extra" is hers.
- **Airbrush.** She described it in her written feedback but it does not appear
  on the price list she sent, so it is not on the site. Confirm before adding.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
