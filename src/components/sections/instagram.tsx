import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { img } from "@/lib/images";
import { instagramStrip, links } from "@/lib/site";

/**
 * Instagram.
 *
 * A slow full-bleed marquee rather than a 3x3 embed grid: it fills the width of
 * the page, it costs nothing to load, and it doesn't hand a third-party script
 * control over the bottom of the page. The strip pauses on hover so a photo can
 * actually be looked at, and freezes entirely under reduced-motion.
 */
export function Instagram() {
  // The track is rendered twice so the loop is seamless at -50%.
  const track = [...instagramStrip, ...instagramStrip];

  return (
    <Section id="instagram" space="tight" className="overflow-hidden bg-cream">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Instagram</Eyebrow>
            <h2 className="font-display mt-7 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-light">
              Doe inspiratie op
            </h2>
            <p className="mt-4 text-[0.9375rem] text-muted">
              Nieuw werk, nieuwe kleuren en beschikbare plekken —{" "}
              <span className="text-ink">{links.instagramHandle}</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Button asChild variant="outline" size="lg">
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                Volg op Instagram
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Button>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed strip ---------------------------------------------------- */}
      <div className="group relative mt-14 lg:mt-20">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] md:gap-6">
          {track.map((key, i) => {
            const asset = img(key);
            return (
              <a
                key={`${key}-${i}`}
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                // The second copy is decorative duplication — hide it from AT.
                aria-hidden={i >= instagramStrip.length}
                tabIndex={i >= instagramStrip.length ? -1 : undefined}
                className="relative block w-[15rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-sand md:w-[19rem]"
              >
                <div className="aspect-[4/5]">
                  <Image
                    src={asset.src}
                    alt={
                      i >= instagramStrip.length
                        ? ""
                        : `${asset.alt} — bekijk op Instagram`
                    }
                    width={asset.width}
                    height={asset.height}
                    placeholder="blur"
                    blurDataURL={asset.blur}
                    loading="lazy"
                    sizes="(max-width: 768px) 15rem, 19rem"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] hover:scale-[1.05]"
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Fade the strip into the page at both edges. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent md:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent md:w-28"
        />
      </div>
    </Section>
  );
}
