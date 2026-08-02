# Lynn's Nailbar

Website for Lynn's Nailbar — a BIAB and gellak salon in Nijmegen. Replaces the
old Wix site. Every page is built around one action: getting the visitor into the
Salonized booking flow.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Pages

| Route            | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `/`              | Home — hero, why, treatments, gallery, about, reviews, FAQ, Instagram, booking CTA |
| `/behandelingen` | BIAB, gellak and nail art, each with benefits, duration and price |
| `/prijslijst`    | Full price list, nail-art levels, and the house rules      |
| `/gallerij`      | Complete photo portfolio with lightbox                     |
| `/over-lynn`     | Lynn's story, mission, vision and certification            |
| `/contact`       | Contact card, map, availability                            |

`robots.txt` and `sitemap.xml` are generated from `src/app/robots.ts` and
`src/app/sitemap.ts`.

## Editing content

**All copy, prices, reviews, FAQ answers and house rules live in
[`src/lib/site.ts`](src/lib/site.ts).** Change them there — nothing is hardcoded
into components. The most common edits:

- **Prices** — `priceGroups`. The price list page and the schema.org offer
  catalogue both read from it.
- **Treatments** — `treatments`. Drives the home page cards and the treatments page.
- **Reviews** — `reviews`. The first entry is also the quote in the hero card.
- **FAQ** — `faq`. Also emitted as `FAQPage` structured data.
- **Opening hours** — `openingHours` is intentionally an empty array. The salon
  works strictly by appointment, so the footer and contact page show
  "Uitsluitend op afspraak" plus a link to live availability. Fill the array with
  `{ day: "Maandag", hours: "09:00 – 17:00" }` entries (use `hours: null` for a
  closed day) and both places switch to a real opening-hours table automatically.

### Before going live

1. Set `site.url` in `src/lib/site.ts` to the real domain. It drives every
   canonical URL, the Open Graph tags, the sitemap and the structured data.
2. Confirm the treatment durations. They are marked `durationIsEstimate` because
   the old site never published them — they are sensible estimates, not the
   salon's own numbers.
3. Optionally swap the "Meet Lynn" photograph. The hero uses Lynn's portrait
   (`lynn-portret`), but the "Welkom in mijn salon" block on the home page and
   the Over Lynn page still use the salon interior. Both read a single constant —
   `PORTRAIT` in `src/components/sections/meet-lynn.tsx` — so pointing them at
   another photo is a one-line change.

## Publishing

The site is fully static, so any modern host works. Vercel is the path of least
resistance for a Next.js app — it builds from a git repository and redeploys on
every push.

1. Push this folder to a git repository (GitHub, GitLab or Bitbucket).
2. Create a project on [vercel.com](https://vercel.com) and import that
   repository. Vercel detects Next.js on its own — no build settings to fill in.
3. Add the domain under **Settings → Domains** and point the DNS records at
   Vercel as instructed there.
4. Set `site.url` in `src/lib/site.ts` to that domain and push again, so the
   canonical URLs, Open Graph tags, sitemap and structured data all match.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console.

After that, every push to the main branch publishes automatically. Pushing to any
other branch gives a preview URL, which is the safe way to check a change before
it goes live.

## Images

`public/images` holds web-optimised JPEGs. `src/lib/images.json` is the manifest:
path, intrinsic dimensions, Dutch alt text and a base64 blur placeholder for
each. Components read it through `imgProps()` in `src/lib/images.ts`, so a photo
can never be rendered without dimensions or alt text.

The full-resolution originals are in `source-photos/` (git-ignored).

To add a photo: drop it in `public/images`, then add an entry to
`images.json` with `src`, `width`, `height`, `alt` and `blur`.

## Design system

Tokens are defined in `@theme` in `src/app/globals.css`. Use the semantic classes
(`bg-cream`, `text-ink`, `text-muted`, `text-accent`, `border-line`) rather than
raw colours.

One thing worth knowing before you touch colour: **`taupe` is decorative only.**
At 1.9:1 against the cream page it fails contrast for any text. Use `muted`
(5.4:1) for small text and `accent` (3.5:1) for display type 24px and up. On the
dark brown sections taupe reaches 6.9:1 and is fine for text there.

Type is Cormorant Garamond for display and Manrope for everything else, both
self-hosted through `next/font`.

## Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus rings, a
keyboard-navigable gallery and lightbox, and alt text on every photo. All text
meets WCAG AA contrast — verified by measuring composited foreground and
background colours on every rendered text node across all six pages.

Motion respects `prefers-reduced-motion`. The hero entrance is deliberately CSS
rather than JavaScript, so the headline can never be left invisible by a script
that fails to run.

## Stack

Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Radix primitives · Lucide icons.
