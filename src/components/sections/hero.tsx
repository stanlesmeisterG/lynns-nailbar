import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { BookButton } from "@/components/ui/book-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { reviews } from "@/lib/site";

/** Three facts that answer "is this for me?" before the visitor scrolls. */
const heroFacts = [
  { value: "4–6", label: "weken mooi" },
  { value: "2023", label: "gecertificeerd BIAB" },
  { value: "1-op-1", label: "salon aan huis" },
];

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
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Type ---------------------------------------------------------- */}
          <div className="lg:col-span-6">
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
              Gespecialiseerd in BIAB, gellak en elegante nageldesigns in
              Nijmegen. Alle aandacht voor jou, in een rustige salon aan huis.
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

            {/* Proof strip ------------------------------------------------- */}
            <dl
              className="mt-12 grid max-w-md animate-fade-in grid-cols-3 gap-6 border-t border-line-soft pt-7"
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

          {/* Photograph ---------------------------------------------------- */}
          <div
            className="relative animate-settle-in lg:col-span-5 lg:col-start-8"
            style={{ animationDelay: "200ms" }}
          >
            {/* The portrait is 876x1110 (0.79), so a 4:5 frame crops almost
                nothing — Lynn stays centred at every breakpoint. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-sand">
              <Image
                {...imgProps("lynn-portret")}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="size-full object-cover"
              />
            </div>

            {/* Floating card — the one place on the page where a card overlaps
                a photo. It carries the proof that matters most. */}
            <figure
              // Sits further out at lg, where the image column is narrowest, so
              // the card never swallows the portrait.
              className="absolute -bottom-6 left-4 max-w-[17rem] animate-fade-up rounded-[var(--radius-card)] bg-cream/95 p-6 shadow-[0_24px_60px_-24px_rgba(53,46,43,0.35)] backdrop-blur-sm sm:left-6 lg:-bottom-10 lg:-left-20 xl:-left-8"
              style={{ animationDelay: "1100ms" }}
            >
              <blockquote className="font-display text-[1.0625rem] leading-snug">
                &ldquo;{reviews[0].quote}&rdquo;
              </blockquote>
              <figcaption className="label-xs mt-4 text-muted">
                {reviews[0].author} &middot; klant
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
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
