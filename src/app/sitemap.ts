import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap.
 *
 * Priorities reflect booking intent rather than page depth. /behandelingen now
 * carries the prices too, which makes it the strongest page on the site after
 * the home page — people search for what a BIAB set costs in Nijmegen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/behandelingen", priority: 0.9, changeFrequency: "monthly" },
    { path: "/galerij", priority: 0.7, changeFrequency: "weekly" },
    { path: "/over-de-salon", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
