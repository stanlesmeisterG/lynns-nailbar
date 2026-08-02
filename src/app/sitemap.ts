import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap.
 *
 * Priorities reflect booking intent rather than page depth: the treatments and
 * price pages are what people search for and are worth more than the about page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/behandelingen", priority: 0.9, changeFrequency: "monthly" },
    { path: "/prijslijst", priority: 0.9, changeFrequency: "monthly" },
    { path: "/gallerij", priority: 0.7, changeFrequency: "weekly" },
    { path: "/over-lynn", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
