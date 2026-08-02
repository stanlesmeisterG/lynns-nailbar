import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BookingCta } from "@/components/sections/booking-cta";
import { BookButton } from "@/components/ui/book-button";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { treatments } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Behandelingen — BIAB, gellak & nail art",
  description:
    "BIAB nagels, gellak en handgeschilderde nail art in Nijmegen. Bekijk per behandeling wat je krijgt, hoe lang het duurt en wat het kost.",
  path: "/behandelingen",
  image: "/images/gellak-donkerrood.jpg",
});

/**
 * Treatments.
 *
 * Each treatment gets a full-width band with the photograph and the detail
 * alternating sides. Three stacked cards would have been faster to build, but
 * this gives every treatment its own moment and keeps the eye moving down the
 * page instead of comparing columns.
 */
export default function TreatmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Behandelingen"
        title={
          <>
            Nagelbehandelingen,{" "}
            <span className="text-accent italic">aangepast aan jouw smaak.</span>
          </>
        }
        lede="Elke behandeling begint met het in model vijlen van je nagels en het verzorgen van je nagelriemen. Daarna bouwen we samen het resultaat op dat jij voor ogen hebt."
      >
        <div className="flex flex-wrap gap-3">
          <BookButton size="lg">Afspraak maken</BookButton>
          <Button asChild variant="outline" size="lg">
            <Link href="/prijslijst">Bekijk de prijslijst</Link>
          </Button>
        </div>
      </PageHeader>

      {treatments.map((treatment, i) => {
        const flipped = i % 2 === 1;
        return (
          <Section
            key={treatment.slug}
            id={treatment.slug}
            space="tight"
            className={cn(i % 2 === 1 && "bg-sand/35")}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
                {/* Photograph -------------------------------------------- */}
                <Reveal
                  className={cn(
                    "lg:col-span-6",
                    flipped && "lg:order-2 lg:col-start-7",
                  )}
                >
                  <div className="overflow-hidden rounded-[var(--radius-image)] bg-sand">
                    <div className="aspect-[4/5]">
                      <Image
                        {...imgProps(treatment.image)}
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="size-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Three supporting shots, small, under the main image. */}
                  <ul className="mt-4 grid grid-cols-3 gap-4">
                    {treatment.gallery.map((key) => (
                      <li
                        key={key}
                        className="overflow-hidden rounded-xl bg-sand"
                      >
                        <div className="aspect-square">
                          <Image
                            {...imgProps(key)}
                            sizes="(max-width: 1024px) 30vw, 15vw"
                            className="size-full object-cover"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Detail ------------------------------------------------- */}
                <Reveal
                  delay={0.08}
                  className={cn(
                    "lg:col-span-5",
                    flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
                  )}
                >
                  <p className="label-xs flex items-center gap-3 text-muted">
                    <span className="tabular-nums text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-px w-6 bg-line" />
                    <span>{treatment.kicker}</span>
                  </p>

                  <h2 className="font-display mt-6 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-light">
                    {treatment.name}
                  </h2>

                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                    {treatment.description}
                  </p>

                  <h3 className="label-xs mt-10 text-muted">Wat het je geeft</h3>
                  <ul className="mt-5 space-y-3.5">
                    {treatment.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3.5 text-[0.9375rem]">
                        <Check
                          aria-hidden
                          strokeWidth={1.5}
                          className="mt-0.5 size-4 shrink-0 text-accent"
                        />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Duration + price sit on one hairline row. */}
                  <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-y border-line-soft py-6">
                    <div>
                      <dt className="label-xs text-muted">Duur</dt>
                      <dd className="font-display mt-2.5 text-[1.375rem] leading-none font-normal">
                        {treatment.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-xs text-muted">Prijs</dt>
                      <dd className="font-display mt-2.5 text-[1.375rem] leading-none font-normal">
                        {treatment.priceFrom}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <BookButton size="lg">Boek {treatment.name}</BookButton>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/prijslijst">Alle prijzen</Link>
                    </Button>
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}

      <BookingCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Behandelingen", path: "/behandelingen" },
        ])}
      />
    </>
  );
}
