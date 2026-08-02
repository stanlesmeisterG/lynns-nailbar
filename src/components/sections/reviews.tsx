"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import * as React from "react";

import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { reviews } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Review slider.
 *
 * One quote at a time, set large in Cormorant. Showing three small testimonial
 * cards side by side makes each one look like filler; a single quote at display
 * size reads as a statement, and the visitor actually finishes it.
 *
 * The slide is announced politely to screen readers, and the whole set is also
 * rendered into the DOM for them via a visually hidden list, so no review is
 * reachable only by clicking.
 */
export function Reviews() {
  const [index, setIndex] = React.useState(0);
  // Track direction so the quote slides the way the visitor asked it to.
  const [direction, setDirection] = React.useState(1);
  const reduceMotion = useReducedMotion();

  const go = React.useCallback((delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + reviews.length) % reviews.length);
  }, []);

  const current = reviews[index];
  const travel = reduceMotion ? 0 : 28;

  return (
    <Section id="reviews" className="bg-sand/35">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="label-xs flex items-center gap-3 text-muted">
              <span className="tabular-nums text-ink">05</span>
              <span aria-hidden className="h-px w-6 bg-line" />
              <span>Reviews</span>
            </p>
            <h2 className="font-display mt-7 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-light">
              Wat klanten
              <br />
              <span className="text-accent italic">zeggen.</span>
            </h2>

            <div
              className="mt-8 flex items-center gap-1.5"
              aria-label="Vijf van de vijf sterren"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden
                  className="size-4 fill-accent text-accent"
                  strokeWidth={0}
                />
              ))}
              <span className="ml-2 text-xs text-muted">
                {reviews.length} reviews
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <figure className="flex min-h-[19rem] flex-col justify-between md:min-h-[17rem]">
              <div className="relative flex-1">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * travel }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -travel }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-live="polite"
                  >
                    <p className="font-display text-[clamp(1.5rem,3.2vw,2.375rem)] leading-[1.3] font-light">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                    <figcaption className="label-xs mt-8 text-muted">
                      {current.author}
                    </figcaption>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Controls -------------------------------------------------- */}
              <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                <ol className="flex items-center gap-2" aria-label="Ga naar review">
                  {reviews.map((review, i) => (
                    <li key={review.author}>
                      <button
                        type="button"
                        onClick={() => {
                          setDirection(i > index ? 1 : -1);
                          setIndex(i);
                        }}
                        aria-label={`Review ${i + 1} van ${reviews.length}`}
                        aria-current={i === index ? "true" : undefined}
                        className="group flex h-8 items-center px-0.5"
                      >
                        <span
                          className={cn(
                            "block h-px transition-all duration-500 ease-[var(--ease-soft)]",
                            i === index
                              ? "w-10 bg-ink"
                              : "w-5 bg-muted group-hover:bg-ink",
                          )}
                        />
                      </button>
                    </li>
                  ))}
                </ol>

                <div className="flex gap-2">
                  <SliderButton label="Vorige review" onClick={() => go(-1)}>
                    <ArrowLeft aria-hidden strokeWidth={1.25} className="size-4" />
                  </SliderButton>
                  <SliderButton label="Volgende review" onClick={() => go(1)}>
                    <ArrowRight aria-hidden strokeWidth={1.25} className="size-4" />
                  </SliderButton>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>

        {/* Every review in the DOM for assistive tech and for crawlers. */}
        <ul className="sr-only">
          {reviews.map((review) => (
            <li key={`sr-${review.author}`}>
              <blockquote>{review.quote}</blockquote>
              <span>{review.author}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:border-ink hover:bg-cream active:scale-95"
    >
      {children}
    </button>
  );
}
