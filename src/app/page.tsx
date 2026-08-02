import { BookingCta } from "@/components/sections/booking-cta";
import { Faq } from "@/components/sections/faq";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Hero } from "@/components/sections/hero";
import { Instagram } from "@/components/sections/instagram";
import { MeetLynn } from "@/components/sections/meet-lynn";
import { Reviews } from "@/components/sections/reviews";
import { TreatmentsPreview } from "@/components/sections/treatments-preview";
import { Why } from "@/components/sections/why";
import { JsonLd, faqSchema } from "@/lib/seo";

/**
 * Home.
 *
 * The order is a deliberate argument: what we do → why us → what it costs →
 * proof of the work → who you'll be sitting with → what others say → the last
 * objections → where to see more → book. Each section is a separate file so the
 * running order can be changed by moving one line.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Why />
      <TreatmentsPreview />
      <GalleryPreview />
      <MeetLynn />
      <Reviews />
      <Faq />
      <Instagram />
      <BookingCta />
      <JsonLd data={faqSchema()} />
    </>
  );
}
