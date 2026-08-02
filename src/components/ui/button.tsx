import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The site has exactly three button treatments. Keeping the list this short is
 * what stops the design drifting: a page should never need a fourth.
 *
 * `solid`   — the booking action. One per viewport, ideally.
 * `outline` — the secondary action sitting next to it.
 * `quiet`   — an underlined text link that reads as a button.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-all duration-200 ease-[var(--ease-soft)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "rounded-full bg-ink text-cream hover:bg-onyx active:scale-[0.985] shadow-[0_1px_2px_rgba(53,46,43,0.16)] hover:shadow-[0_8px_24px_-8px_rgba(53,46,43,0.4)]",
        outline:
          "rounded-full border border-line bg-transparent text-ink hover:border-ink hover:bg-sand/40 active:scale-[0.985]",
        quiet:
          "group/quiet gap-1.5 p-0 text-ink hover:text-onyx",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9 text-[0.9375rem]",
      },
    },
    compoundVariants: [
      // A text link shouldn't carry button padding or a fixed height.
      { variant: "quiet", class: "h-auto p-0" },
    ],
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the child element (e.g. a Link or an anchor) instead of a button. */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
