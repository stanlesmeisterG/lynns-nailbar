import Link from "next/link";

import { BookButton } from "@/components/ui/book-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { navigation } from "@/lib/site";

export const metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

/** 404 — keeps the visitor one click away from booking. */
export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-32 pt-[calc(var(--header-h)+6rem)]">
      <p className="label-xs flex items-center gap-3 text-muted">
        <span aria-hidden className="h-px w-8 bg-taupe" />
        404
      </p>
      <h1 className="font-display mt-7 max-w-2xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] font-light">
        Deze pagina bestaat{" "}
        <span className="text-accent italic">niet meer.</span>
      </h1>
      <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-muted">
        Misschien is de link verouderd. Ga terug naar de homepagina, of plan
        direct je afspraak.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <BookButton size="lg">Afspraak maken</BookButton>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Naar de homepagina</Link>
        </Button>
      </div>

      <nav aria-label="Alle pagina's" className="mt-16 border-t border-line-soft pt-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
