# Lynn's Nailbar — website

Premium marketing site for Lynn's Nailbar, a BIAB & gellak nail salon in Nijmegen.
The single goal of every page is to get the visitor into the Salonized booking flow.

## Stack

Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Radix primitives (shadcn/ui style) · Lucide icons.

Note: this project is pinned to Next **15**, not 16. There is no
`node_modules/next/dist/docs/` directory — use standard Next 15 App Router
conventions (`metadata` exports, `next/image`, server components by default).

## Where things live

- `src/lib/site.ts` — **all** business content: treatments, prices, reviews, FAQ,
  house rules, contact details. Copy changes happen here, never in components.
- `src/lib/images.json` — generated image manifest (path, intrinsic size, Dutch alt
  text, base64 LQIP). Regenerate rather than hand-edit.
- `src/components/sections/` — one file per page section.
- `src/components/ui/` — small shared primitives (buttons, reveal, accordion…).

## Design system

Tokens live in `@theme` in `src/app/globals.css`. Use the semantic Tailwind classes
(`bg-cream`, `text-ink`, `border-line`, `font-display`) — never raw hex values.

Type: Cormorant Garamond for display, Manrope for everything else. Section labels use
the `<Eyebrow>` component, which carries the editorial `01 —` numbering.

Motion is deliberately restrained: fade plus a small translate on scroll-in, and
150–200ms hover transitions. Everything respects `prefers-reduced-motion`.

## Content rules

- The site is in Dutch. Keep customer-facing copy in Dutch.
- Prices and house rules are the salon's real published terms. Do not alter the
  numbers without the owner's say-so.
- Treatment durations in `site.ts` are marked `durationIsEstimate` — they were not
  published on the old site and still need confirming by the owner.
