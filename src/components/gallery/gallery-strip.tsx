"use client";

import Image from "next/image";
import * as React from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Seconds per photo for one full loop — keeps the drift at the same slow pace
 *  however many photos a row holds. */
const SECONDS_PER_PHOTO = 8;

/**
 * The portfolio as two slow strips drifting in opposite directions.
 *
 * Replaced a four-column masonry in Oct 2026. Lynn asked for the gallery to work
 * like the Instagram strip that used to close the page: the page is a lot
 * shorter, and the same photos no longer appear twice on it.
 *
 * Every photo is a button into the shared lightbox, which walks through the
 * whole set in order — that, not the strip, is how someone actually studies the
 * work. The strip pauses under the pointer and while anything in it has focus,
 * so a tile never slides away from a click or a tab. With reduced motion it
 * stands still and becomes an ordinary sideways-scrolling row instead.
 */
export function GalleryStrip({ images }: { images: ImageKey[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const half = Math.ceil(images.length / 2);
  const rows = [
    { images: images.slice(0, half), offset: 0, reverse: false },
    { images: images.slice(half), offset: half, reverse: true },
  ].filter((row) => row.images.length > 0);

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        {rows.map((row) => (
          <StripRow
            key={row.offset}
            images={row.images}
            reverse={row.reverse}
            onOpen={(i) => setOpenIndex(row.offset + i)}
          />
        ))}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

function StripRow({
  images,
  reverse,
  onOpen,
}: {
  images: ImageKey[];
  reverse: boolean;
  onOpen: (index: number) => void;
}) {
  // The track is rendered twice so the loop is seamless at -50%.
  const track = [...images, ...images];

  return (
    <div className="group relative motion-reduce:overflow-x-auto">
      <ul
        className="flex w-max animate-marquee gap-4 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] md:gap-6"
        style={{
          animationDuration: `${images.length * SECONDS_PER_PHOTO}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((key, i) => {
          const asset = img(key);
          // The second copy only exists to close the loop — keep it away from
          // assistive tech and the tab order, and drop it when nothing moves.
          const copy = i >= images.length;
          return (
            <li
              key={`${key}-${i}`}
              aria-hidden={copy || undefined}
              className={cn(
                // Sized for the ~300px files from Lynn's Word document, so a
                // phone at 3x doesn't blow them up much past 1.7x. Once the
                // originals are in, these can go back up to 12rem / 16rem.
                "w-[10.5rem] shrink-0 md:w-[15rem]",
                copy && "motion-reduce:hidden",
              )}
            >
              <button
                type="button"
                onClick={() => onOpen(i % images.length)}
                tabIndex={copy ? -1 : undefined}
                aria-label={`Vergroot foto: ${asset.alt}`}
                className="group/tile block w-full overflow-hidden rounded-[1.25rem] bg-sand"
              >
                <div className="aspect-[4/5]">
                  <Image
                    src={asset.src}
                    alt={copy ? "" : asset.alt}
                    width={asset.width}
                    height={asset.height}
                    placeholder="blur"
                    blurDataURL={asset.blur}
                    loading="lazy"
                    sizes="(max-width: 768px) 10.5rem, 15rem"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover/tile:scale-[1.05]"
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Fade the strip into the page at both edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream to-transparent md:w-28 motion-reduce:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cream to-transparent md:w-28 motion-reduce:hidden"
      />
    </div>
  );
}
