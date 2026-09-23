import { Star } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { featuredReviewIndex, reviews } from "@/lib/site";

/**
 * One review, on the home page.
 *
 * This replaced a four-quote slider. A carousel asks the visitor to work for the
 * proof and most never click past the first slide, so a single quote set at
 * display size does the same job with less page and more conviction.
 *
 * No attribution line: the initials the old site used ("S. V.") read as
 * anonymised data rather than a person. If a customer ever agrees to be named,
 * fill in `name` on the review and it appears here.
 */
export function FeaturedReview() {
  const review = reviews[featuredReviewIndex] ?? reviews[0];

  return (
    <Section space="tight" className="bg-sand/35">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div
            className="flex justify-center gap-1.5"
            role="img"
            aria-label="Vijf van de vijf sterren"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden
                strokeWidth={0}
                className="size-[0.9375rem] fill-accent text-accent"
              />
            ))}
          </div>

          <figure className="mt-10">
            <blockquote>
              <p className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.3] font-light text-balance">
                &ldquo;{review.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="label-xs mt-9 text-muted">
              {review.name ?? "Uit de reviews van klanten"}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
