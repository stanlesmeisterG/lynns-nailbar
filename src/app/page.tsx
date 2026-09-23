import { BookingCta } from "@/components/sections/booking-cta";
import { FeaturedReview } from "@/components/sections/featured-review";
import { Hero } from "@/components/sections/hero";
import { Why } from "@/components/sections/why";

/**
 * Home.
 *
 * Shortened in Sept 2026 at Lynn's request. It previously ran nine sections and
 * repeated the treatments, the prices, the gallery and her story that the deeper
 * pages already cover in full.
 *
 * What is left is the shortest honest argument for booking: this is what the work
 * looks like → someone else already trusts her → this is why she is different →
 * book. Everything else earns its place on its own page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedReview />
      <Why />
      <BookingCta />
    </>
  );
}
