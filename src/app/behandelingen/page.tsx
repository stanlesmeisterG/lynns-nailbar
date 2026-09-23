import { Check } from "lucide-react";
import Image from "next/image";

import { PhotoRail } from "@/components/gallery/photo-rail";
import { BookingCta } from "@/components/sections/booking-cta";
import { Faq } from "@/components/sections/faq";
import { BookButton } from "@/components/ui/book-button";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { JsonLd, breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";
import {
  availabilityNote,
  extraPrices,
  houseRules,
  nailArtLevels,
  treatments,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Behandelingen & prijzen — BIAB, gellak & nail art",
  description:
    "BIAB vanaf € 45, gellak € 35 en handgeschilderde nail art vanaf € 0,50 per nagel. Bekijk per behandeling wat je krijgt, hoe lang het duurt en wat het kost in Nijmegen.",
  path: "/behandelingen",
  image: "/images/gellak-donkerrood.jpg",
});

/**
 * Treatments and prices — one page.
 *
 * These used to be two pages that repeated each other, which is what Lynn asked
 * to fix: a visitor comparing BIAB to gellak had to hold two tabs open, and every
 * price change had to be made twice.
 *
 * So the price now lives with the treatment it belongs to, and there is no summary
 * table restating them further down. The only tables left cover what the treatment
 * bands don't: add-ons and removal.
 */
export default function TreatmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Behandelingen & prijzen"
        title={
          <>
            Alles wat ik doe,{" "}
            <span className="text-accent italic">en wat het kost.</span>
          </>
        }
        lede="Elke behandeling begint met het in model vijlen van je nagels en het verzorgen van je nagelriemen. Die zit dus altijd bij de prijs in. Betalen kan met pin of contant."
      >
        <BookButton size="lg">Afspraak maken</BookButton>
      </PageHeader>

      {/* Treatments -------------------------------------------------------- */}
      {treatments.map((treatment, i) => {
        const flipped = i % 2 === 1;
        return (
          <Section
            key={treatment.slug}
            id={treatment.slug}
            space="tight"
            className={cn(flipped && "bg-sand/35")}
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
                {/* Photography ------------------------------------------- */}
                <Reveal
                  className={cn(
                    // min-w-0: this cell holds a PhotoRail, and a grid cell
                    // defaults to sizing itself to its content — which would be
                    // the full, unscrolled width of the strip.
                    "min-w-0 lg:col-span-6",
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

                  <PhotoRail
                    images={treatment.gallery}
                    label={`voorbeelden van ${treatment.name}`}
                    className="mt-4"
                  />
                </Reveal>

                {/* Detail ------------------------------------------------- */}
                <Reveal
                  delay={0.08}
                  className={cn(
                    "lg:col-span-5",
                    flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
                  )}
                >
                  <Eyebrow index={String(i + 1).padStart(2, "0")}>
                    {treatment.kicker}
                  </Eyebrow>

                  <h2 className="font-display mt-6 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-light">
                    {treatment.name}
                  </h2>

                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                    {treatment.description}
                  </p>

                  {treatment.extra ? (
                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                      {treatment.extra}
                    </p>
                  ) : null}

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

                  {/* The tariffs for a treatment that has more than one, listed
                      here rather than in a summary table further down. */}
                  {treatment.variants ? (
                    <dl className="mt-10 border-t border-line-soft">
                      {treatment.variants.map((variant) => (
                        <div
                          key={variant.name}
                          className="flex items-baseline justify-between gap-6 border-b border-line-soft py-3.5"
                        >
                          <dt className="text-[0.9375rem]">{variant.name}</dt>
                          <span
                            aria-hidden
                            className="mx-2 hidden h-px flex-1 self-center border-b border-dotted border-line sm:block"
                          />
                          <dd className="font-display shrink-0 text-[1.125rem] leading-none tabular-nums">
                            {variant.price}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {/* Duration + price sit on one hairline row. */}
                  <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-y border-line-soft py-6">
                    <div>
                      <dt className="label-xs text-muted">Duur</dt>
                      <dd className="font-display mt-2.5 text-[1.375rem] leading-none font-normal">
                        {treatment.duration}
                      </dd>
                    </div>
                    {/* Omitted when the tariffs are already listed above — saying
                        "vanaf € 45,00" directly under that table adds nothing. */}
                    {treatment.variants ? null : (
                      <div>
                        <dt className="label-xs text-muted">Prijs</dt>
                        <dd className="font-display mt-2.5 text-[1.375rem] leading-none font-normal tabular-nums">
                          {treatment.price}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <BookButton size="lg" className="mt-9">
                    Boek {treatment.name}
                  </BookButton>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Nail art levels --------------------------------------------------- */}
      <Section space="tight" id="nail-art-levels">
        <Container>
          <Reveal>
            <h2 className="font-display max-w-2xl text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-light">
              Welk niveau nail art{" "}
              <span className="text-accent italic">past bij jouw ontwerp?</span>
            </h2>
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
              De prijs hangt af van hoeveel werk een ontwerp kost. Twijfel je?
              Stuur je inspiratiefoto vooraf door, dan plan ik genoeg tijd in.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8">
            {nailArtLevels.map((level, i) => (
              <Reveal as="li" key={level.level} delay={i * 0.08}>
                <article className="h-full overflow-hidden rounded-[var(--radius-card)] bg-sand/35">
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
                      <p className="font-display text-[1.25rem] leading-none tabular-nums text-muted">
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

      {/* Add-ons, removal and the booking card ----------------------------- */}
      <Section space="tight" id="extras" className="bg-sand/35">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              {extraPrices.map((group, gi) => (
                <Reveal
                  key={group.title}
                  delay={gi * 0.05}
                  className="mb-16 last:mb-0"
                >
                  <section aria-labelledby={`extra-${gi}`}>
                    <h2
                      id={`extra-${gi}`}
                      className="font-display text-[1.875rem] leading-none font-normal md:text-[2.25rem]"
                    >
                      {group.title}
                    </h2>

                    {group.intro ? (
                      <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                        {group.intro}
                      </p>
                    ) : null}

                    <dl className="mt-8">
                      {group.rows.map((row) => (
                        <div
                          key={row.name}
                          className="border-t border-line-soft py-5 last:border-b"
                        >
                          <div className="flex items-baseline justify-between gap-6">
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
                          {row.description ? (
                            <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-muted">
                              {row.description}
                            </p>
                          ) : null}
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
                <div className="rounded-[var(--radius-card)] bg-cream p-8">
                  <h2 className="font-display text-[1.75rem] leading-tight font-normal">
                    {availabilityNote.heading}
                  </h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    {availabilityNote.body}
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
                      {...imgProps("kleurenwaaier-schelp")}
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

      <Faq />

      {/* House rules ------------------------------------------------------- */}
      <Section space="tight" id="huisregels" className="bg-sand/35">
        <Container>
          <Reveal>
            <Eyebrow>Huisregels</Eyebrow>
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
        </Container>
      </Section>

      <BookingCta />

      <JsonLd data={faqSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Behandelingen", path: "/behandelingen" },
        ])}
      />
    </>
  );
}
