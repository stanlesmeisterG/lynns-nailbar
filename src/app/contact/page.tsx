import { Mail, MapPin, MessageCircle } from "lucide-react";

import { BookButton } from "@/components/ui/book-button";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { availabilityNote, contact, links } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact & route",
  description:
    "Lynn's Nailbar, Molenveldlaan 270 in Nijmegen. Stuur een WhatsApp naar 06 - 50 41 60 05, mail of plan direct online je afspraak. Uitsluitend op afspraak.",
  path: "/contact",
});

/**
 * Contact.
 *
 * One large card carries every way to reach the salon, with the map directly
 * beside it. A contact form was deliberately left out: the salon books through
 * Salonized, and a form that lands in an inbox is a slower path to an
 * appointment than the booking button.
 *
 * Trimmed in Oct 2026: the number is WhatsApp only (Lynn would rather get a
 * message than a call), TikTok is gone, and so are the opening-hours card — the
 * lede now says it is by appointment only — and the closing photo.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tot ziens in{" "}
            <span className="text-accent italic">de salon.</span>
          </>
        }
        lede="De salon is gevestigd aan de Molenveldlaan in Nijmegen. Omdat ik een salon aan huis heb, ontvang ik iedereen persoonlijk en werk ik uitsluitend op afspraak. Daarom vraag ik je om op de afgesproken tijd te komen, zodat ik voor iedereen de benodigde tijd kan nemen."
      />

      <Section space="tight" className="pt-0">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Contact card ---------------------------------------------- */}
            <Reveal className="lg:col-span-7">
              <div className="h-full rounded-[var(--radius-image)] bg-sand/55 p-8 md:p-12">
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-light">
                  Plan je afspraak online
                </h2>
                <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                  {availabilityNote.howTo}
                </p>
                <BookButton size="lg" className="mt-8">
                  Afspraak maken
                </BookButton>

                <dl className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
                  <ContactItem
                    icon={<MapPin aria-hidden strokeWidth={1.25} className="size-4" />}
                    label="Adres"
                  >
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-onyx"
                    >
                      {contact.street}
                      <br />
                      {contact.postalCode} {contact.city}
                    </a>
                  </ContactItem>

                  <ContactItem
                    icon={
                      <MessageCircle aria-hidden strokeWidth={1.25} className="size-4" />
                    }
                    label="WhatsApp"
                  >
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-onyx"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </ContactItem>

                  <ContactItem
                    icon={<Mail aria-hidden strokeWidth={1.25} className="size-4" />}
                    label="E-mail"
                  >
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all transition-colors hover:text-onyx"
                    >
                      {contact.email}
                    </a>
                  </ContactItem>

                  <ContactItem
                    icon={<InstagramIcon className="size-4" />}
                    label="Volg mee"
                  >
                    <a
                      href={links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-onyx"
                    >
                      Instagram {links.instagramHandle}
                    </a>
                  </ContactItem>
                </dl>

                <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
                  KVK {contact.kvk}
                </p>
              </div>
            </Reveal>

            {/* Map --------------------------------------------------------- */}
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="h-full overflow-hidden rounded-[var(--radius-image)] bg-sand">
                <iframe
                  src={contact.mapsEmbedUrl}
                  title={`Kaart met de locatie van Lynn's Nailbar aan de ${contact.street} in ${contact.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full min-h-[22rem] border-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}

/** One labelled row inside the contact card. */
function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="label-xs flex items-center gap-2.5 text-muted">
        <span className="text-accent">{icon}</span>
        {label}
      </dt>
      <dd className="mt-3 text-[0.9375rem] leading-relaxed">{children}</dd>
    </div>
  );
}
