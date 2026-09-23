import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every photo is served from /public, so no remote patterns are needed.
    // AVIF first with WebP as the fallback — the salon photos are large and
    // photographic, which is exactly where AVIF pays off.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layout actually uses; a shorter list means
    // fewer variants to generate and cache.
    deviceSizes: [390, 640, 828, 1080, 1200, 1440, 1920],
    imageSizes: [96, 160, 240, 320, 480],
  },
  poweredByHeader: false,

  /**
   * The page structure was reworked in Sept 2026: the price list was merged into
   * /behandelingen, and two routes were renamed. These are permanent redirects so
   * any link already shared — or indexed from the preview deploy — still lands.
   */
  async redirects() {
    return [
      { source: "/prijslijst", destination: "/behandelingen", permanent: true },
      { source: "/gallerij", destination: "/galerij", permanent: true },
      { source: "/over-lynn", destination: "/over-de-salon", permanent: true },
    ];
  },
};

export default nextConfig;
