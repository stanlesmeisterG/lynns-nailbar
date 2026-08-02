"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-line-soft", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-onyx md:py-7",
          className,
        )}
        {...props}
      >
        <span className="font-display text-[1.375rem] leading-snug font-normal md:text-[1.625rem]">
          {children}
        </span>
        {/* A plus that rotates into a minus — quieter than a chevron. */}
        <Plus
          aria-hidden
          strokeWidth={1.25}
          className="mt-1.5 size-5 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-soft)] group-data-[state=open]:rotate-45 group-hover:text-ink"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[acc-up_260ms_var(--ease-soft)] data-[state=open]:animate-[acc-down_320ms_var(--ease-soft)]"
      {...props}
    >
      <div
        className={cn(
          "max-w-2xl pb-7 pr-10 text-[0.9375rem] leading-relaxed text-muted",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
