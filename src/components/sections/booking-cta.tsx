import Image from "next/image";

import { BookButton } from "@/components/ui/book-button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { availabilityNote, contact } from "@/lib/site";

/**
 * Closing call to action.
 *
 * A single full-bleed photograph with the invitation set over it. This is the
 * last thing before the footer and the only place on the site where type sits
 * on top of an image, which is what makes it land.
 */
export function BookingCta() {
  return (
    <Section space="tight" className="bg-cream">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-image)]">
            <Image
              {...imgProps("biab-parelmoer-detail")}
              sizes="(max-width: 1024px) 100vw, 86rem"
              className="absolute inset-0 -z-10 size-full object-cover object-center"
            />
            {/* Warm brown scrim rather than black — it keeps the photo's
                temperature while holding the cream type well clear of AA. The
                lightest stop still has to carry body copy, so it stays at 74%. */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-tr from-ink/94 via-ink/86 to-ink/74"
            />

            <div className="px-7 py-24 text-center sm:px-12 md:py-32 lg:py-40">
              <p className="label-xs text-cream/60">Klaar voor mooie nagels?</p>

              <h2 className="font-display mx-auto mt-7 max-w-3xl text-balance-heading text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.03] font-light text-cream">
                Plan vandaag nog
                <br />
                <span className="italic text-taupe">je afspraak.</span>
              </h2>

              <p className="mx-auto mt-7 max-w-md text-[0.9375rem] leading-relaxed text-cream/85">
                {availabilityNote.body}
              </p>

              <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <BookButton
                  size="lg"
                  className="w-full bg-cream text-ink hover:bg-sand sm:w-auto"
                >
                  Afspraak maken
                </BookButton>
                <a
                  href={contact.phoneHref}
                  className="text-sm text-cream/85 underline decoration-cream/35 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream"
                >
                  Of bel {contact.phoneDisplay}
                </a>
              </div>

              <p className="mx-auto mt-10 max-w-sm text-xs leading-relaxed text-cream/65">
                {availabilityNote.notice}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
