import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { differentiators } from "@/lib/site";

/**
 * Why Lynn's Nailbar.
 *
 * Deliberately short. This used to carry a full section header, a lede and three
 * long paragraphs, which said the same thing four times over. Now it is three
 * plain statements beside one photograph, and the detail lives on /over-de-salon.
 *
 * No numerals and no eyebrow index: with only one numbered section left on the
 * home page, the editorial counter looked like a leftover.
 */
export function Why() {
  return (
    <Section id="waarom" className="bg-cream">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
          {/* Reasons ------------------------------------------------------- */}
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Waarom Lynn&rsquo;s Nailbar</Eyebrow>
              <h2 className="font-display mt-6 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-light">
                Geen lopende band.
                <br />
                <span className="text-accent italic">Jouw uur.</span>
              </h2>
            </Reveal>

            <dl className="mt-12">
              {differentiators.map((item, i) => (
                <Reveal key={item.title} delay={0.06 + i * 0.06}>
                  <div className="border-t border-line-soft py-6">
                    <dt className="font-display text-[1.375rem] leading-tight font-normal">
                      {item.title}
                    </dt>
                    <dd className="mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                      {item.body}
                    </dd>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-line-soft" />
            </dl>

            <Reveal delay={0.24}>
              <Link
                href="/over-de-salon"
                className="group mt-9 inline-flex items-center gap-2.5 text-[0.9375rem] text-ink transition-colors duration-200 hover:text-accent"
              >
                Meer over de salon
                <span
                  aria-hidden
                  className="h-px w-7 bg-current transition-all duration-300 ease-[var(--ease-soft)] group-hover:w-10"
                />
              </Link>
            </Reveal>
          </div>

          {/* Product still-life -------------------------------------------- */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div className="overflow-hidden rounded-[var(--radius-image)] bg-sand">
              <Image
                {...imgProps("producten-gellak")}
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="size-full object-cover"
              />
            </div>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted">
              Gewerkt wordt met producten van The Gel Bottle en Pink Gellac —
              vegan en vrij van schadelijke stoffen.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
