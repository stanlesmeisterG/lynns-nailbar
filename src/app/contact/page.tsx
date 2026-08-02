import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { BookButton } from "@/components/ui/book-button";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { imgProps } from "@/lib/images";
import { JsonLd, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { availabilityNote, contact, links, openingHours } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact & route",
  description:
    "Lynn's Nailbar, Molenveldlaan 270 in Nijmegen. Bel 06 - 50 41 60 05, mail of plan direct online je afspraak. Uitsluitend op afspraak.",
  path: "/contact",
  image: "/images/salon-werkplek.jpg",
});

/**
 * Contact.
 *
 * One large card carries every way to reach the salon, with the map directly
 * beside it. A contact form was deliberately left out: the salon books through
 * Salonized, and a form that lands in an inbox is a slower path to an
 * appointment than the booking button.
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
        lede="De salon zit aan de Molenveldlaan in Nijmegen. Je wordt persoonlijk ontvangen, dus kom op de afgesproken tijd — dan is er alle rust voor jouw behandeling."
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
                  {availabilityNote.body}
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
                    icon={<Phone aria-hidden strokeWidth={1.25} className="size-4" />}
                    label="Telefoon"
                  >
                    <a
                      href={contact.phoneHref}
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
                      className="block transition-colors hover:text-onyx"
                    >
                      Instagram {links.instagramHandle}
                    </a>
                    <a
                      href={links.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block transition-colors hover:text-onyx"
                    >
                      TikTok {links.tiktokHandle}
                    </a>
                  </ContactItem>
                </dl>

                <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
                  KVK {contact.kvk}
                </p>
              </div>
            </Reveal>

            {/* Map + hours ------------------------------------------------ */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal delay={0.08} className="flex-1">
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

              <Reveal delay={0.14}>
                <div className="rounded-[var(--radius-image)] bg-ink p-8 text-cream md:p-10">
                  <h2 className="label-xs text-cream/60">Openingstijden</h2>
                  {openingHours.length > 0 ? (
                    <dl className="mt-6 space-y-3 text-sm">
                      {openingHours.map(({ day, hours }) => (
                        <div
                          key={day}
                          className="flex justify-between gap-4 border-b border-cream/12 pb-3 last:border-0"
                        >
                          <dt className="text-cream/80">{day}</dt>
                          <dd className={hours ? "" : "text-cream/60"}>
                            {hours ?? "Gesloten"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <>
                      <p className="font-display mt-5 text-[1.75rem] leading-tight font-light">
                        {availabilityNote.heading}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-cream/60">
                        De beschikbare dagen en tijden staan altijd actueel in de
                        online agenda.
                      </p>
                      <a
                        href={links.booking}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block text-sm underline decoration-cream/30 underline-offset-4 transition-colors hover:decoration-cream"
                      >
                        Bekijk beschikbaarheid
                      </a>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Closing image ------------------------------------------------------ */}
      <Section space="tight" className="pt-0">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-image)] bg-sand">
              <div className="aspect-[21/9]">
                <Image
                  {...imgProps("salon-werkplek")}
                  sizes="100vw"
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
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
