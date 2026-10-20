import { GalleryStrip } from "@/components/gallery/gallery-strip";
import { BookingCta } from "@/components/sections/booking-cta";
import { Instagram } from "@/components/sections/instagram";
import { BookButton } from "@/components/ui/book-button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { galleryImages } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Galerij — BIAB, gellak & nail art",
  description:
    "Bekijk het werk van Lynn's Nailbar in Nijmegen: BIAB sets, gellak in elke tint en handgeschilderde nail art. Laat je inspireren voor je volgende afspraak.",
  path: "/galerij",
  image: "/images/gellak-rood-armbanden.jpg",
});

/**
 * The full portfolio.
 *
 * Since Oct 2026 this is two drifting photo strips with the shared lightbox,
 * then the Instagram bar — Lynn found the old masonry plus a second Instagram
 * marquee long and repetitive. See `GalleryStrip` for how the strip behaves.
 */
export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerij"
        title={
          <>
            Het werk,{" "}
            <span className="text-accent italic">van dichtbij.</span>
          </>
        }
        lede="Elke set wordt zorgvuldig met de hand aangebracht en afgewerkt. Zie je iets wat je mooi vindt? Stuur van tevoren een inspiratiefoto door!"
      >
        <BookButton size="lg">Afspraak maken</BookButton>
      </PageHeader>

      {/* Full-bleed: the strip runs edge to edge, outside the container. */}
      <Section space="tight" className="overflow-hidden pt-0">
        <GalleryStrip images={galleryImages} />
      </Section>

      <Instagram />

      {/* Not the default photo: that one is already in the strip. */}
      <BookingCta image="biab-parelmoer-detail" />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Galerij", path: "/galerij" },
        ])}
      />
    </>
  );
}
