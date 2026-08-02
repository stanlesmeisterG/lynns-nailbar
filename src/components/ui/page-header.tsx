import * as React from "react";

import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/section";

/**
 * The opening block on every sub-page.
 *
 * Sub-pages deliberately don't get a hero image — the home page owns that
 * moment. Here the page just opens with air, an eyebrow and one large heading,
 * which makes moving between sections feel calm rather than repetitive.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-[calc(var(--header-h)+4rem)] pb-14 md:pt-[calc(var(--header-h)+7rem)] md:pb-20">
      <Container>
        <Reveal>
          <p className="label-xs flex items-center gap-3 text-muted">
            <span aria-hidden className="h-px w-8 bg-taupe" />
            {eyebrow}
          </p>
          <h1 className="font-display mt-7 max-w-4xl text-balance-heading text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] font-light tracking-[-0.02em]">
            {title}
          </h1>
        </Reveal>
        {lede ? (
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
              {lede}
            </p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={0.14}>
            <div className="mt-10">{children}</div>
          </Reveal>
        ) : null}
      </Container>
    </header>
  );
}
