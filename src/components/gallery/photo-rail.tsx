"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * A row of examples the visitor swipes through.
 *
 * Built on a native scroll container with CSS scroll-snap rather than a carousel
 * library: touch swipe, trackpad and tabbing between photos all come for free,
 * and there is no transform to fight when a photo is opened full size.
 *
 * The arrows are for mouse users, who have no swipe. They only appear when the
 * row actually overflows, so a treatment with three photos doesn't get controls
 * that scroll nothing.
 */
export function PhotoRail({
  images,
  label,
  className,
}: {
  images: ImageKey[];
  /** Names the set for screen readers, e.g. "Voorbeelden van BIAB". */
  label: string;
  className?: string;
}) {
  const railRef = React.useRef<HTMLUListElement>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [overflows, setOverflows] = React.useState(false);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  /** Re-measure on mount, on resize and after the photos change. */
  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      // 2px of slack: sub-pixel layout can leave scrollWidth a hair over.
      const scrollable = rail.scrollWidth - rail.clientWidth > 2;
      setOverflows(scrollable);
      setAtStart(rail.scrollLeft <= 2);
      setAtEnd(rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    rail.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", measure);
    };
  }, [images]);

  /** Scroll by roughly one visible page, so nothing is skipped over. */
  const page = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    // `min-w-0` is load-bearing. A rail is only as narrow as its parent lets it
    // be, and a grid or flex ancestor sized to its content will stretch to the
    // full width of the photo strip instead — which scrolls the whole page
    // sideways on a phone. Any layout dropping a PhotoRail into a grid cell
    // needs `min-w-0` on that cell too.
    <div className={cn("min-w-0", className)}>
      <ul ref={railRef} className="rail gap-3 sm:gap-4" aria-label={label}>
        {images.map((key, i) => {
          const asset = img(key);
          return (
            <li key={key} className="w-[8rem] sm:w-[9.5rem]">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Vergroot foto: ${asset.alt}`}
                className="group block w-full overflow-hidden rounded-xl bg-sand"
              >
                <div className="aspect-[3/4]">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    placeholder="blur"
                    blurDataURL={asset.blur}
                    loading="lazy"
                    sizes="160px"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {overflows ? (
        <div className="mt-4 hidden justify-end gap-2 md:flex">
          <RailButton
            label={`Vorige foto's van ${label}`}
            disabled={atStart}
            onClick={() => page(-1)}
          >
            <ArrowLeft aria-hidden strokeWidth={1.25} className="size-4" />
          </RailButton>
          <RailButton
            label={`Volgende foto's van ${label}`}
            disabled={atEnd}
            onClick={() => page(1)}
          >
            <ArrowRight aria-hidden strokeWidth={1.25} className="size-4" />
          </RailButton>
        </div>
      ) : null}

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}

function RailButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-200",
        disabled
          ? "cursor-default opacity-30"
          : "hover:border-ink hover:bg-cream active:scale-95",
      )}
    >
      {children}
    </button>
  );
}
