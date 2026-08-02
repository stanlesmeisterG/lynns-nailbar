import * as React from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Page gutter. Every full-width element on the site uses this one container so
 * left edges line up perfectly from the header down to the footer.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[86rem] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </div>
  );
}

/**
 * Vertical rhythm for a page section.
 *
 * The spacing scale is intentionally coarse — `normal` for most sections and
 * `loose` for the moments that need air around them. Having only two options
 * is what keeps the whitespace feeling deliberate instead of arbitrary.
 */
export function Section({
  id,
  className,
  space = "normal",
  children,
}: {
  id?: string;
  className?: string;
  space?: "tight" | "normal" | "loose";
  children: React.ReactNode;
}) {
  const spacing = {
    tight: "py-16 md:py-20",
    normal: "py-24 md:py-32 lg:py-40",
    loose: "py-32 md:py-44 lg:py-56",
  }[space];

  return (
    <section id={id} className={cn(spacing, className)}>
      {children}
    </section>
  );
}

/**
 * The small uppercase label above a heading, with its editorial index number.
 * The numbering runs across the home page like a contents list.
 */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("label-xs flex items-center gap-3 text-muted", className)}>
      {index ? (
        <>
          <span className="tabular-nums text-ink">{index}</span>
          <span aria-hidden className="h-px w-6 bg-line" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

/**
 * Standard section header: eyebrow, display heading, optional lede.
 * `align="split"` puts the heading left and the lede in a right-hand column,
 * which is the layout used for the wider sections.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  action,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  action?: React.ReactNode;
}) {
  if (align === "split") {
    return (
      <div
        className={cn(
          "grid gap-8 md:grid-cols-12 md:items-end md:gap-12",
          className,
        )}
      >
        <Reveal className="md:col-span-7">
          {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
          <h2 className="font-display mt-6 text-balance-heading text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] font-light">
            {title}
          </h2>
        </Reveal>
        {(lede || action) && (
          <Reveal delay={0.08} className="md:col-span-5 md:pb-2">
            {lede ? (
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
                {lede}
              </p>
            ) : null}
            {action ? <div className="mt-6">{action}</div> : null}
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <Reveal
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow index={index} className={cn(align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2 className="font-display mt-6 text-balance-heading text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] font-light">
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-6 text-[0.9375rem] leading-relaxed text-muted",
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl",
          )}
        >
          {lede}
        </p>
      ) : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </Reveal>
  );
}
