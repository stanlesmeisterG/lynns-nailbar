import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { imgProps, type ImageKey } from "@/lib/images";
import { about, site } from "@/lib/site";

/**
 * The photograph for this section.
 *
 * There is no professional portrait of Lynn in the current asset set, so the
 * salon interior stands in — it still does the job of showing the visitor where
 * they'd be sitting. Swap this one constant when a portrait is shot.
 */
const PORTRAIT: ImageKey = "salon-werkplek";

/** Meet Lynn — the personal, non-transactional moment in the page. */
export function MeetLynn() {
  return (
    <Section id="over-lynn" className="bg-ink text-cream">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-ink/40">
              <Image
                {...imgProps(PORTRAIT)}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="size-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="label-xs flex items-center gap-3 text-cream/60">
                <span className="tabular-nums text-taupe">04</span>
                <span aria-hidden className="h-px w-6 bg-cream/25" />
                <span>Over Lynn</span>
              </p>

              <h2 className="font-display mt-7 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-light">
                Welkom in mijn
                <br />
                <span className="text-taupe italic">salon.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-cream/80">
                {about.intro}
              </p>
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-cream/60">
                {about.paragraphs[0]}
              </p>
            </Reveal>

            {/* Signature — the small human note that a card grid can't carry. */}
            <Reveal delay={0.16}>
              <p className="font-display mt-10 text-[2.25rem] leading-none font-light italic text-taupe">
                Lynn
              </p>
              <p className="label-xs mt-3 text-cream/60">
                {site.owner} &middot; eigenaresse sinds {site.foundedYear}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-10 border-cream/25 text-cream hover:border-cream hover:bg-cream/10"
              >
                <Link href="/over-lynn" className="group">
                  Lees mijn verhaal
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
