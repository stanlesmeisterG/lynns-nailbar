import Image from "next/image";
import Link from "next/link";

import { BookButton } from "@/components/ui/book-button";
import { Container } from "@/components/ui/section";
import {
  availabilityNote,
  contact,
  links,
  navigation,
  openingHours,
  site,
} from "@/lib/site";

/**
 * Footer.
 *
 * Dark brown rather than black — against the cream page it reads as warm and
 * closes the page without feeling like a hard stop.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <Container className="py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Identity ------------------------------------------------------ */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt=""
                width={512}
                height={512}
                className="size-11 shrink-0 opacity-90 brightness-0 invert"
              />
              <span className="font-display text-xl leading-none">
                Lynn&rsquo;s Nailbar
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              {site.tagline}. Gespecialiseerd in BIAB, gellak en elegante
              nageldesigns — in een rustige salon aan huis.
            </p>
            <BookButton
              size="sm"
              className="mt-8 bg-cream text-ink hover:bg-sand"
            >
              Afspraak maken
            </BookButton>
          </div>

          {/* Contact ------------------------------------------------------- */}
          <div className="md:col-span-3">
            <h2 className="label-xs text-cream/60">Contact</h2>
            <address className="mt-6 space-y-3 text-sm not-italic text-cream/80">
              <p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                </a>
              </p>
              <p>
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-cream"
                >
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-cream"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Hours --------------------------------------------------------- */}
          <div className="md:col-span-3">
            <h2 className="label-xs text-cream/60">Openingstijden</h2>
            {openingHours.length > 0 ? (
              <dl className="mt-6 space-y-2.5 text-sm text-cream/80">
                {openingHours.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between gap-4">
                    <dt>{day}</dt>
                    <dd className={hours ? "" : "text-cream/60"}>
                      {hours ?? "Gesloten"}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="mt-6 space-y-3 text-sm text-cream/80">
                <p className="font-medium">{availabilityNote.heading}</p>
                <p className="leading-relaxed text-cream/60">
                  De actuele beschikbare dagen en tijden vind je in de online
                  agenda.
                </p>
                <a
                  href={links.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline decoration-cream/30 underline-offset-4 transition-colors hover:decoration-cream"
                >
                  Bekijk beschikbaarheid
                </a>
              </div>
            )}
          </div>

          {/* Links --------------------------------------------------------- */}
          <div className="md:col-span-2">
            <h2 className="label-xs text-cream/60">Menu</h2>
            <ul className="mt-6 space-y-2.5 text-sm text-cream/80">
              <li>
                <Link href="/" className="transition-colors hover:text-cream">
                  Home
                </Link>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="label-xs mt-9 text-cream/60">Volg</h2>
            <ul className="mt-6 space-y-2.5 text-sm text-cream/80">
              <li>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/12 pt-8 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name} &middot; KVK{" "}
            {contact.kvk}
          </p>
          <p>
            Online afspraken via{" "}
            <a
              href={links.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream/25 underline-offset-4 transition-colors hover:text-cream/80"
            >
              Salonized
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
