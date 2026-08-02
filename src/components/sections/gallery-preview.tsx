import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GalleryMasonry } from "@/components/gallery/gallery-masonry";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { featuredGallery } from "@/lib/site";

/** A tight edit of the portfolio on the home page; the full set lives on /gallerij. */
export function GalleryPreview() {
  return (
    <Section id="gallerij" className="bg-cream">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Gallerij"
          title={
            <>
              Recent werk uit
              <br />
              <span className="text-accent italic">de salon.</span>
            </>
          }
          lede="Elke set wordt tijdens de afspraak met de hand opgebouwd en afgewerkt. Klik op een foto om hem groot te bekijken."
          align="split"
        />
      </Container>

      {/* Wider than the text container — the photographs get room to breathe. */}
      <Container className="mt-16 lg:mt-24">
        <GalleryMasonry images={featuredGallery} columns={4} />

        <Reveal className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/gallerij" className="group">
              Bekijk de volledige gallerij
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="size-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
