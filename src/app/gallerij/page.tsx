import { GalleryMasonry } from "@/components/gallery/gallery-masonry";
import { BookingCta } from "@/components/sections/booking-cta";
import { BookButton } from "@/components/ui/book-button";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/section";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { galleryImages } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Gallerij — BIAB & nail art",
  description:
    "Bekijk het werk van Lynn's Nailbar in Nijmegen: BIAB sets, gellak in elke tint en handgeschilderde nail art. Laat je inspireren voor je volgende afspraak.",
  path: "/gallerij",
  image: "/images/biab-mocha-parelmoer.jpg",
});

/** The full portfolio, in a four-column masonry with the shared lightbox. */
export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallerij"
        title={
          <>
            Het werk,{" "}
            <span className="text-accent italic">van dichtbij.</span>
          </>
        }
        lede="Elke set wordt tijdens de afspraak met de hand opgebouwd en afgewerkt. Zie je iets wat je mooi vindt? Neem de foto mee naar je afspraak — of stuur hem vooraf door."
      >
        <BookButton size="lg">Afspraak maken</BookButton>
      </PageHeader>

      <Section space="tight" className="pt-0">
        <Container>
          <GalleryMasonry images={galleryImages} columns={4} />
        </Container>
      </Section>

      <BookingCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallerij", path: "/gallerij" },
        ])}
      />
    </>
  );
}
