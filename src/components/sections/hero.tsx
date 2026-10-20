import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { BookButton } from "@/components/ui/book-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { heroImages } from "@/lib/site";

/** Three facts that answer "is this for me?" before the visitor scrolls. */
const heroFacts = [
  { value: "3–5", label: "weken mooi" },
  { value: "2023", label: "gecertificeerd bij Florence Beauty & Nails" },
  { value: "1-op-1", label: "salon aan huis" },
];

/** Seconds each hero photo is shown, and how long the crossfade between takes. */
const HOLD = 6;
const FADE = 1.6;

/**
 * Hero.
 *
 * Asymmetric split: type on the left, one tall photograph on the right.
 *
 * This is a server component and the entrance is pure CSS. That is deliberate —
 * the hero renders and animates before any JavaScript arrives, so the headline
 * is never blank on a slow connection and can't be left invisible by a script
 * that fails to run. Reduced-motion users get the final state immediately via
 * the global media query in globals.css.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.25rem)] pb-20 md:pb-24 lg:pt-[calc(var(--header-h)+2.5rem)] lg:pb-28">
      {/* A single soft wash of sand behind the type, so the cream page has a
          gradient to sit on without introducing a second colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[42rem] rounded-full bg-sand/50 blur-3xl"
      />

      <Container className="relative">
        {/*
          Three children, laid out as two rows on desktop: the type and the proof
          strip stack in the left column while the photograph spans both on the
          right.

          The point of the split is the phone. With the proof strip inside the
          type block, a visitor had to scroll past three statistics before seeing
          a single nail — on a site whose whole promise is the work. Now the
          photograph follows straight after the buttons, and the numbers come
          after it.
        */}
        <div className="grid items-center gap-x-10 gap-y-12 lg:grid-cols-12 xl:gap-x-16">
          {/* Type ---------------------------------------------------------- */}
          <div className="lg:col-span-6 lg:row-start-1">
            <p
              className="label-xs flex animate-fade-in items-center gap-3 text-muted"
              style={{ animationDelay: "100ms" }}
            >
              <span aria-hidden className="h-px w-8 bg-taupe" />
              Nagelsalon in Nijmegen
            </p>

            <h1 className="font-display mt-6 text-[clamp(2.875rem,6.4vw,4.75rem)] leading-[1] font-light tracking-[-0.02em]">
              <RisingLine text="Mooie nagels." delay={150} />
              <span className="block text-accent">
                <RisingLine text="Vakkundig gezet." delay={330} />
              </span>
            </h1>

            <p
              className="mt-7 max-w-md animate-fade-up text-[1.0625rem] leading-relaxed text-muted"
              style={{ animationDelay: "700ms" }}
            >
              Gespecialiseerd in BIAB, gellak en nail art in Nijmegen, met
              persoonlijke aandacht in een rustige salon aan huis.
            </p>

            <div
              className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "820ms" }}
            >
              <BookButton size="lg">Afspraak maken</BookButton>
              <Button asChild variant="outline" size="lg">
                <Link href="/behandelingen">Bekijk behandelingen</Link>
              </Button>
            </div>
          </div>

          {/* Photograph ---------------------------------------------------- */}
          <div
            className="relative animate-settle-in lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
            style={{ animationDelay: "200ms" }}
          >
            {/* Finished sets, not a portrait — this is the first thing a visitor
                should judge the salon on. Lynn picked these in Oct 2026; the
                list lives in `heroImages` in site.ts. */}
            <HeroPhotos />
          </div>

          {/* Proof strip ----------------------------------------------------- */}
          <dl
            className="grid max-w-md animate-fade-in grid-cols-3 gap-6 border-t border-line-soft pt-7 lg:col-span-6 lg:col-start-1 lg:row-start-2"
            style={{ animationDelay: "1000ms" }}
          >
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="font-display block text-[1.75rem] leading-none font-light">
                    {fact.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

/**
 * The hero photographs, crossfading one into the next.
 *
 * Pure CSS, like the rest of the hero, so it needs no JavaScript to run. The
 * first photo is an ordinary image underneath that never moves: it is what loads
 * first, what the page is judged on before anything animates, and all a
 * reduced-motion visitor ever sees (the global reduced-motion rule collapses the
 * animations, and the overlays fall back to their resting `opacity-0`).
 *
 * Every later photo is an overlay that fades in over the one before. A middle
 * overlay stays fully opaque until the next one has finished fading in on top of
 * it, so the crossfade never lets the base show through halfway; the last one
 * fades out to reveal the base, and the cycle starts again.
 */
function HeroPhotos() {
  const [first, ...overlays] = heroImages;
  const total = heroImages.length * HOLD;
  const at = (seconds: number) => `${((seconds / total) * 100).toFixed(3)}%`;

  const keyframes = `
@keyframes hero-overlay {
  0% { opacity: 0; }
  ${at(FADE)} { opacity: 1; }
  ${at(HOLD + FADE)} { opacity: 1; }
  ${at(HOLD + FADE + 0.01)} { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes hero-overlay-last {
  0% { opacity: 0; }
  ${at(FADE)} { opacity: 1; }
  ${at(HOLD)} { opacity: 1; }
  ${at(HOLD + FADE)} { opacity: 0; }
  100% { opacity: 0; }
}`;

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-sand">
      <Image
        {...imgProps(first)}
        priority
        fetchPriority="high"
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="absolute inset-0 size-full object-cover"
      />
      {overlays.map((key, i) => (
        <Image
          key={key}
          {...imgProps(key)}
          // Decorative repeats of the same idea; the first photo carries the alt.
          alt=""
          fetchPriority="low"
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="absolute inset-0 size-full object-cover opacity-0"
          style={{
            animation: `${i === overlays.length - 1 ? "hero-overlay-last" : "hero-overlay"} ${total}s ease-in-out ${(i + 1) * HOLD - FADE}s infinite`,
          }}
        />
      ))}
      {overlays.length > 0 ? <style>{keyframes}</style> : null}
    </div>
  );
}

/**
 * One line of display type whose words rise out of a clipping mask in sequence.
 * Each word is its own inline-block so the mask crops cleanly per word.
 */
function RisingLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <span
            className="inline-block animate-rise-in"
            style={{ animationDelay: `${delay + i * 70}ms` }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
