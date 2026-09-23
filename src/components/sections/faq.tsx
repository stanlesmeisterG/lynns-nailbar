import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookLink } from "@/components/ui/book-button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { contact, faq } from "@/lib/site";

/**
 * FAQ.
 *
 * Every answer here comes from the salon's real information and house rules, so
 * this section does double duty: it removes the last objections before booking,
 * and it saves Lynn from answering the same DMs every week.
 *
 * Lives on /behandelingen since Sept 2026 — it sits where the visitor is actually
 * deciding, next to what each treatment costs.
 */
export function Faq() {
  return (
    <Section id="faq" className="bg-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sticky column keeps the heading and the escape hatch in view
              while the visitor works down a long list of questions. */}
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Eyebrow>Veelgestelde vragen</Eyebrow>
              <h2 className="font-display mt-7 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-light">
                Goed om
                <br />
                <span className="text-accent italic">te weten.</span>
              </h2>
              <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                Staat je vraag er niet bij? Stuur gerust een berichtje via{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="underline decoration-muted underline-offset-4 transition-colors hover:decoration-ink"
                >
                  e-mail
                </a>{" "}
                of{" "}
                <a
                  href={contact.phoneHref}
                  className="whitespace-nowrap underline decoration-muted underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {contact.phoneDisplay}
                </a>
                , of <BookLink>plan direct je afspraak</BookLink>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              className="border-t border-line-soft"
            >
              {faq.map((item, i) => (
                <AccordionItem key={item.question} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
