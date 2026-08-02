import * as React from "react";

import { Button } from "@/components/ui/button";
import { links } from "@/lib/site";
import { cn } from "@/lib/utils";

type BookButtonProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "quiet";
  size?: "sm" | "md" | "lg";
};

/**
 * The one action the whole site is built around. Centralised so the booking URL
 * and its rel/target attributes are identical everywhere it appears.
 */
export function BookButton({
  children = "Afspraak maken",
  className,
  variant = "solid",
  size = "md",
}: BookButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={links.booking} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}

/** Inline text version, used inside running copy. */
export function BookLink({
  children = "plan je afspraak",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={links.booking}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "underline decoration-muted decoration-1 underline-offset-4 transition-colors hover:decoration-ink",
        className,
      )}
    >
      {children}
    </a>
  );
}
