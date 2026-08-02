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
import {
  availabilityNote,
  houseRules,
  nailArtLevels,
  priceGroups,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Prijslijst — BIAB & gellak",
  description:
    "De complete prijslijst van Lynn's Nailbar in Nijmegen: BIAB vanaf € 37,50, gellak € 32,50, nail art vanaf € 0,50 per nagel. Inclusief huisregels en garantie.",
  path: "/prijslijst",
  image: "/images/producten-gellak.jpg",
});

/**
 * Price list.
 *
 * A price table is where a salon site usually turns into a spreadsheet. The
 * layout here keeps it readable: one column of generously spaced rows, the name
 * on the left, the price set in the display face on the right, and a hairline
 * between each — so prices can be scanned down the right edge in one pass.
 */
export default function PricesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prijslijst"
        title={
          <>
            Heldere prijzen,{" "}
            <span className="text-accent italic">geen verrassingen.</span>
          </>
        }
        lede="Alle genoemde prijzen zijn inclusief het in model vijlen van je nagels en het verzorgen van je nagelriemen. Betalen kan met pin of contant."
      >
        <BookButton size="lg">Afspraak maken</BookButton>
      </PageHeader>

      {/* Price groups ------------------------------------------------------ */}
      <Section space="tight" className="pt-0">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              {priceGroups.map((group, gi) => (
                <Reveal key={group.title} delay={gi * 0.05} className="mb-16 last:mb-0">
                  <section aria-labelledby={`group-${gi}`}>
                    <div className="flex items-baseline gap-4">
                      {/* Manrope's lining figures sit on the baseline; Cormorant's
                          oldstyle ones would drop below the heading. */}
                      <span
                        aria-hidden
                        className="label-xs tabular-nums text-ink"
                      >
                        {String(gi + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`group-${gi}`}
                        className="font-display text-[1.875rem] leading-none font-normal md:text-[2.25rem]"
                      >
                        {group.title}
                      </h2>
                    </div>

                    {group.intro ? (
                      <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                        {group.intro}
                      </p>
                    ) : null}

                    <dl className="mt-8">
                      {group.rows.map((row) => (
                        <div
                          key={row.name}
                          className="flex items-baseline justify-between gap-6 border-t border-line-soft py-5 last:border-b"
                        >
                          <dt className="text-[1.0625rem]">
                            {row.name}
                            {row.note ? (
                              <span className="ml-2 text-xs text-muted">
                                {row.note}
                              </span>
                            ) : null}
                          </dt>
                          {/* Dotted leader ties the name to its price without
                              needing a table border. */}
                          <span
                            aria-hidden
                            className="mx-2 hidden h-px flex-1 self-center border-b border-dotted border-line sm:block"
                          />
                          <dd className="font-display shrink-0 text-[1.375rem] leading-none font-normal tabular-nums">
                            {row.price}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Booking card ---------------------------------------------- */}
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <div className="rounded-[var(--radius-card)] bg-sand/60 p-8">
                  <h2 className="font-display text-[1.75rem] leading-tight font-normal">
                    {availabilityNote.heading}
                  </h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    Plan eenvoudig een afspraak in via de online agenda. Daar zie
                    je direct welke dagen en tijden beschikbaar zijn.
                  </p>
                  <BookButton size="lg" className="mt-7 w-full">
                    Boek hier
                  </BookButton>
                  <p className="mt-5 text-xs leading-relaxed text-muted">
                    {availabilityNote.notice}
                  </p>
                </div>

                <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] bg-sand">
                  <div className="aspect-[4/3]">
                    <Image
                      {...imgProps("kleurenwaaier")}
                      sizes="(max-width: 1024px) 100vw, 28vw"
                      className="size-full object-cover"
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Kies je kleur rustig uit in de salon — de volledige waaier ligt
                  klaar.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Nail art levels --------------------------------------------------- */}
      <Section space="tight" className="bg-sand/35">
        <Container>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-light">
              Welk niveau nail art{" "}
              <span className="text-accent italic">past bij jouw ontwerp?</span>
            </h2>
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
              De prijsklasse hangt af van de complexiteit. Twijfel je? Stuur je
              inspiratiefoto vooraf door, dan wordt er genoeg tijd ingepland.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8">
            {nailArtLevels.map((level, i) => (
              <Reveal as="li" key={level.level} delay={i * 0.08}>
                <article className="h-full overflow-hidden rounded-[var(--radius-card)] bg-cream">
                  <div className="aspect-[16/10] bg-sand">
                    <Image
                      {...imgProps(level.image)}
                      sizes="(max-width: 768px) 100vw, 44vw"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[1.625rem] leading-none font-normal">
                        {level.level}
                      </h3>
                      <p className="font-display text-[1.25rem] leading-none text-muted">
                        {level.price}
                      </p>
                    </div>
                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                      {level.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* House rules ------------------------------------------------------- */}
      <Section space="tight" id="huisregels">
        <Container>
          <Reveal>
            <p className="label-xs flex items-center gap-3 text-muted">
              <span aria-hidden className="h-px w-8 bg-taupe" />
              Huisregels
            </p>
            <h2 className="font-display mt-7 max-w-2xl text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-light">
              Zo houden we het{" "}
              <span className="text-accent italic">voor iedereen fijn.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {houseRules.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.07}>
                <section>
                  <h3 className="font-display border-t border-line pt-6 text-[1.5rem] leading-none font-normal">
                    {group.title}
                  </h3>
                  <dl className="mt-7 space-y-6">
                    {group.items.map((item) => (
                      <div key={item.term}>
                        <dt className="label-xs text-muted">{item.term}</dt>
                        <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                          {item.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-wrap gap-3 border-t border-line-soft pt-10">
              <BookButton size="lg">Afspraak maken</BookButton>
              <Button asChild variant="outline" size="lg">
                <Link href="/behandelingen">Bekijk de behandelingen</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <BookingCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Prijslijst", path: "/prijslijst" },
        ])}
      />
    </>
  );
}
