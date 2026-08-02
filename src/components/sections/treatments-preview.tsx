import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BookButton } from "@/components/ui/book-button";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { treatments } from "@/lib/site";

/**
 * Treatment cards.
 *
 * Each card is a photograph with a hairline-separated footer: name, duration
 * and price. There is no border and no drop shadow at rest — the card lifts and
 * the image scales a little on hover, which is the only thing that moves.
 */
export function TreatmentsPreview() {
  return (
    <Section id="behandelingen" className="bg-sand/35">
      <Container>
        <SectionHeader
          index="02"
          eyebrow="Behandelingen"
          title={
            <>
              Aangepast aan
              <br />
              <span className="text-accent italic">jouw smaak.</span>
            </>
          }
          lede="Van een naturel BIAB-set tot handgeschilderde nail art. Weet je niet welke behandeling bij je past? Vraag het gerust bij het maken van je afspraak."
          align="split"
          action={
            <Button asChild variant="quiet">
              <Link href="/behandelingen" className="group inline-flex items-center">
                <span className="border-b border-taupe pb-0.5 transition-colors group-hover:border-ink">
                  Alle behandelingen bekijken
                </span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
          }
        />

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {treatments.map((treatment, i) => (
            <Reveal as="li" key={treatment.slug} delay={i * 0.09}>
              <article className="group h-full">
                <Link
                  href={`/behandelingen#${treatment.slug}`}
                  className="flex h-full flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-sand">
                    <Image
                      {...imgProps(treatment.image)}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.045]"
                    />
                    <span className="label-xs absolute left-5 top-5 rounded-full bg-cream/90 px-3.5 py-2 text-ink backdrop-blur-sm">
                      {treatment.priceFrom}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col pt-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[1.75rem] leading-none font-normal">
                        {treatment.name}
                      </h3>
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={1.25}
                        className="size-5 shrink-0 text-muted transition-all duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      />
                    </div>
                    <p className="label-xs mt-3 text-muted">{treatment.kicker}</p>
                    <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                      {treatment.description.split(". ")[0]}.
                    </p>
                    <p className="mt-6 border-t border-line-soft pt-4 text-xs text-muted">
                      {treatment.duration}
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-16 flex justify-center lg:mt-20">
          <BookButton size="lg">Plan je afspraak</BookButton>
        </Reveal>
      </Container>
    </Section>
  );
}
