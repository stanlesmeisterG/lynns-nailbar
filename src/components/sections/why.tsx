import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { differentiators } from "@/lib/site";

/**
 * Why Lynn's Nailbar — three reasons to choose this salon over the next one.
 *
 * Cards are defined by a large numeral and a hairline rather than a border box,
 * and the group sits beside a photograph so the section never reads as a
 * three-column feature grid.
 */
export function Why() {
  return (
    <Section id="waarom" className="bg-cream">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Waarom Lynn's Nailbar"
          title={
            <>
              Geen lopende band.
              <br />
              <span className="text-accent italic">Jouw uur.</span>
            </>
          }
          lede="Eén klant tegelijk, ruim ingeplande afspraken en producten die je nagels gezond houden. Dat is het hele verschil."
          align="split"
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Reasons ------------------------------------------------------- */}
          <ol className="lg:col-span-7">
            {differentiators.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                <div className="group flex gap-6 border-t border-line-soft py-8 md:gap-10 md:py-10">
                  <span
                    aria-hidden
                    className="font-display w-10 shrink-0 text-[1.5rem] leading-none font-light text-accent transition-colors duration-300 group-hover:text-ink"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.625rem] leading-tight font-normal md:text-[1.875rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line-soft" />
          </ol>

          {/* Product still-life -------------------------------------------- */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="sticky top-[calc(var(--header-h)+3rem)]">
              <div className="overflow-hidden rounded-[var(--radius-image)] bg-sand">
                <Image
                  {...imgProps("producten-gellak")}
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="size-full object-cover"
                />
              </div>
              <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted">
                Er wordt gewerkt met producten van The Gel Bottle en Pink Gellac
                — vegan, cruelty-free en vrij van schadelijke stoffen.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
