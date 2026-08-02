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
import { about, differentiators, site } from "@/lib/site";

export const metadata = buildMetadata({
  // The title template already appends "Nijmegen", so it stays out of here.
  title: "Over Lynn — gecertificeerd nagelstyliste",
  description:
    "Maak kennis met Lynn Lesmeister, gecertificeerd nagelstyliste en eigenaresse van Lynn's Nailbar in Nijmegen. Persoonlijke aandacht en oog voor detail.",
  path: "/over-lynn",
  image: "/images/salon-werkplek.jpg",
});

/**
 * About Lynn.
 *
 * Built around her own words from the current site, restructured so it reads as
 * one continuous story rather than three labelled boxes. Mission, vision and
 * certificate still appear, but as a quiet index at the end.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over Lynn"
        title={
          <>
            Passie voor nagelverzorging,{" "}
            <span className="text-accent italic">oog voor detail.</span>
          </>
        }
      />

      {/* Story ------------------------------------------------------------- */}
      <Section space="tight" className="pt-0">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <div className="overflow-hidden rounded-[var(--radius-image)] bg-sand lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <div className="aspect-[4/5]">
                  <Image
                    {...imgProps("salon-werkplek")}
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

              <Reveal delay={0.14}>
                <p className="font-display mt-12 text-[2.5rem] leading-none font-light italic text-accent">
                  Lynn
                </p>
                <p className="label-xs mt-3 text-muted">
                  {site.owner} &middot; {site.tagline}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <BookButton size="lg">Afspraak maken</BookButton>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Neem contact op</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission, vision, certificate -------------------------------------- */}
      <Section space="tight" className="bg-sand/35">
        <Container>
          <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
            {about.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 0.08}>
                <div className="flex h-full flex-col border-t border-line pt-7">
                  <span aria-hidden className="label-xs tabular-nums text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display mt-5 text-[1.75rem] leading-none font-normal">
                    {pillar.title}
                  </h2>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What that means in practice ---------------------------------------- */}
      <Section space="tight">
        <Container>
          <Reveal>
            <h2 className="font-display max-w-2xl text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-light">
              Wat dat betekent{" "}
              <span className="text-accent italic">als je bij me zit.</span>
            </h2>
          </Reveal>

          <ol className="mt-12">
            {differentiators.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.07}>
                <div className="grid gap-4 border-t border-line-soft py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <h3 className="font-display md:col-span-4 text-[1.5rem] leading-tight font-normal">
                    {item.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-muted md:col-span-7 md:col-start-6">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line-soft" />
          </ol>
        </Container>
      </Section>

      <BookingCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Over Lynn", path: "/over-lynn" },
        ])}
      />
    </>
  );
}
