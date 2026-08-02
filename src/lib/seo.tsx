import type { Metadata } from "next";

import { contact, faq, links, priceGroups, site } from "./site";

/** Absolute URL helper — schema.org and Open Graph both need fully-qualified URLs. */
export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

/**
 * Build page metadata with the site defaults filled in.
 *
 * Titles are written per page and kept under ~60 characters so they don't get
 * truncated in search results. Every one leads with the service, not the brand.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/biab-soft-french.jpg",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/**
 * schema.org NailSalon (a subtype of LocalBusiness), plus the price list as an
 * OfferCatalog. This is what lets Google show the salon's address, price range
 * and services in local results.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "@id": absoluteUrl("/#salon"),
    name: site.name,
    description:
      "Nagelsalon in Nijmegen, gespecialiseerd in BIAB, gellak en nail art. Persoonlijke aandacht in een rustige salon aan huis.",
    url: site.url,
    telephone: "+31650416005",
    email: contact.email,
    image: absoluteUrl("/images/biab-soft-french.jpg"),
    logo: absoluteUrl("/images/logo-flat.jpg"),
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Pin, Contant",
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "NL",
    },
    areaServed: [
      { "@type": "City", name: "Nijmegen" },
      { "@type": "AdministrativeArea", name: "Gelderland" },
    ],
    sameAs: [links.instagram, links.tiktok],
    hasMap: contact.mapsUrl,
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: links.booking,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Afspraak bij Lynn's Nailbar" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Behandelingen",
      itemListElement: priceGroups.map((group) => ({
        "@type": "OfferCatalog",
        name: group.title,
        itemListElement: group.rows.map((row) => ({
          "@type": "Offer",
          priceCurrency: "EUR",
          // "€ 42,50" -> "42.50"; the "+ € 5,00" surcharge row parses the same way.
          price: row.price.replace(/[^\d,]/g, "").replace(",", "."),
          itemOffered: { "@type": "Service", name: row.name },
        })),
      })),
    },
  };
}

/** FAQPage markup — makes the questions eligible for rich results. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Breadcrumbs for the sub-pages. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
