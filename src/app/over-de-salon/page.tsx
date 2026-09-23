import Image from "next/image";
import Link from "next/link";

import { BookingCta } from "@/components/sections/booking-cta";
import { Reviews } from "@/components/sections/reviews";
import { BookButton } from "@/components/ui/book-button";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { about } from "@/lib/site";

export const metadata = buildMetadata({
  // The title template already appends "Nijmegen", so it stays out of here.
  title: "Over de salon",
  description:
    "Lynn's Nailbar is de salon aan huis van Lynn Lesmeister in Nijmegen. Eén klant per afspraak, gecertificeerd in BIAB, en alle tijd om het netjes te doen.",
  path: "/over-de-salon",
  image: "/images/lynn-salon.jpg",
});

/**
 * About the salon.
 *
 * Cut back in Sept 2026. It used to carry her story, then a mission/vision/
 * certificate grid, then a third section spelling out what a visit is like — three
 * passes over the same material. Now it is the story, the reviews and a way to
 * book, and the certificate and products are simply part of what she says.
 *
 * Renamed from "Over Lynn": the page is about the salon, and the old title made
 * the heading and the signature say her name twice over.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over de salon"
        title={
          <>
            Een rustige salon,{" "}
            <span className="text-accent italic">en alle tijd voor jou.</span>
          </>
        }
      />

      {/* Story ------------------------------------------------------------- */}
      <Section space="tight" className="pt-0">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              {/* Lynn in her own salon. This does the work of both a portrait and
                  a salon shot, which is why the page needs only one photograph. */}
              <div className="overflow-hidden rounded-[var(--radius-image)] bg-sand lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <div className="aspect-[4/5]">
                  <Image
                    {...imgProps("lynn-salon")}
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                {/* Opening line set larger than the rest — it carries her voice. */}
                <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.35] font-light">
                  {about.intro}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-muted">
                  {about.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              {/* Just the flourish. Her own opening line already says who she is,
                  and printing the name and title again underneath is the
                  repetition she asked to get rid of. */}
              <Reveal delay={0.14}>
                <p className="font-display mt-12 text-[2.5rem] leading-none font-light italic text-accent">
                  Lynn
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <BookButton size="lg">Afspraak maken</BookButton>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/behandelingen">Bekijk behandelingen</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* What customers say ------------------------------------------------ */}
      <Reviews />

      <BookingCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Over de salon", path: "/over-de-salon" },
        ])}
      />
    </>
  );
}
