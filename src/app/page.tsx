import { BookingCta } from "@/components/sections/booking-cta";
import { FeaturedReview } from "@/components/sections/featured-review";
import { Hero } from "@/components/sections/hero";

/**
 * Home.
 *
 * Shortened in Sept 2026 at Lynn's request, and again in Oct 2026. It once ran
 * nine sections and repeated the treatments, the prices, the gallery and her
 * story that the deeper pages already cover in full.
 *
 * What is left is the shortest honest argument for booking: this is what the work
 * looks like → someone else already trusts her → book. The "Waarom Lynn's
 * Nailbar" block and its product photo went in Oct 2026: her story on
 * /over-de-salon now says the same in her own words, and the products sit with
 * the treatments.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedReview />
      <BookingCta />
    </>
  );
}
