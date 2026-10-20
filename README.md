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
npm run images   # rebuild src/lib/images.json after adding or replacing a photo
```

## Pages

| Route            | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `/`              | Home — hero, one review, booking CTA                      |
| `/behandelingen` | BIAB, gellak and nail art with their prices, nail-art levels and chrome, FAQ, house rules |
| `/galerij`       | The portfolio as two photo strips with a lightbox, plus Instagram |
| `/over-de-salon` | Lynn's story and the reviews                              |
| `/contact`       | Contact card, WhatsApp, map                               |

`/prijslijst`, `/gallerij` and `/over-lynn` redirect permanently (see
`next.config.ts`). `robots.txt` and `sitemap.xml` are generated from
`src/app/robots.ts` and `src/app/sitemap.ts`.

## Editing content

**All copy, prices, reviews, FAQ answers and house rules live in
[`src/lib/site.ts`](src/lib/site.ts).** Change them there — nothing is hardcoded
into components. The most common edits:

- **Treatments and prices** — `treatments` (with their `variants`),
  `nailArtOptions` and `extraPrices`. The treatments page and the schema.org offer
  catalogue both read from them.
- **Hero photos** — `heroImages`, shown in turn with a slow crossfade.
- **Gallery** — `galleryImages`; the first half is the top strip.
- **Reviews** — `reviews`. `featuredReviewIndex` picks the one on the home page;
  `googleReviewCount` is the total shown next to the stars.
- **FAQ** — `faq`. Also emitted as `FAQPage` structured data.
- **Opening hours** — `openingHours` is intentionally an empty array. The salon
  works strictly by appointment, so the footer shows "Uitsluitend op afspraak"
  plus a link to live availability. Fill the array with
  `{ day: "Maandag", hours: "09:00 – 17:00" }` entries (use `hours: null` for a
  closed day) and it switches to a real opening-hours table automatically.

### Before going live

1. Set `site.url` in `src/lib/site.ts` to the real domain. It drives every
   canonical URL, the Open Graph tags, the sitemap and the structured data.
2. Confirm the BIAB and gellak durations. They are marked `durationIsEstimate`
   because the old site never published them — they are sensible estimates, not
   the salon's own numbers.

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

To add a photo: drop it in `public/images`, add an entry to `images.json` with
its `src` and a Dutch `alt`, then run `npm run images`. The script fills in the
dimensions and the blur placeholder, and scales anything over 2400px down in
place — so replacing a photo with a better file is just overwriting it under the
same name and running the script again.

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

Next.js 16.3 (App Router) · React 19.3 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Radix primitives · Lucide icons.
