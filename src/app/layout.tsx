import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { MobileBookBar } from "@/components/layout/mobile-book-bar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd, absoluteUrl, localBusinessSchema } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Cormorant carries the display voice, Manrope everything else.
 * Both are self-hosted by next/font, so there is no render-blocking request to
 * Google and no layout shift when they swap in.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nagelsalon Nijmegen | BIAB & Gelnagels — Lynn's Nailbar",
    // Sub-pages supply the leading half of the title.
    template: "%s | Lynn's Nailbar Nijmegen",
  },
  description:
    "Nagelsalon in Nijmegen gespecialiseerd in BIAB nagels, gelnagels en nail art. Persoonlijke aandacht, gecertificeerd en professionele producten. Plan direct online je afspraak.",
  keywords: [
    "nagelsalon Nijmegen",
    "BIAB Nijmegen",
    "BIAB nagels Nijmegen",
    "gelnagels Nijmegen",
    "gellak Nijmegen",
    "nail art Nijmegen",
    "nagelstyliste Nijmegen",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  category: "beauty",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.name,
    title: "Nagelsalon Nijmegen | BIAB & Gelnagels — Lynn's Nailbar",
    description:
      "Gespecialiseerd in BIAB, gellak en elegante nageldesigns in Nijmegen. Plan direct online je afspraak.",
    images: [
      {
        url: absoluteUrl("/images/biab-soft-french.jpg"),
        width: 950,
        height: 1800,
        alt: "Zachtroze BIAB nagels met subtiele soft french",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagelsalon Nijmegen | BIAB & Gelnagels — Lynn's Nailbar",
    description:
      "Gespecialiseerd in BIAB, gellak en elegante nageldesigns in Nijmegen.",
    images: [absoluteUrl("/images/biab-soft-french.jpg")],
  },
  // Icons are picked up automatically from src/app/icon.png and apple-icon.png.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#FCFBF9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-dvh antialiased">
        <SiteHeader />
        <ScrollProgress />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileBookBar />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
