import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { links } from "@/lib/site";

/**
 * Instagram.
 *
 * Just the call-out bar since Oct 2026. It used to carry its own photo marquee,
 * but on /galerij that showed the same photos a second time under the full
 * gallery — the gallery itself now runs as the strip, and this bar follows it.
 */
export function Instagram() {
  return (
    <Section id="instagram" space="tight" className="bg-cream">
      <Container>
        <div className="flex flex-col gap-8 border-y border-line-soft py-12 md:flex-row md:items-end md:justify-between md:py-14">
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
    </Section>
  );
}
