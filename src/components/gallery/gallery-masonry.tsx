"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Masonry gallery.
 *
 * CSS columns rather than a JS layout engine: the photos have wildly different
 * aspect ratios, and letting the browser flow them keeps the grid tight with no
 * measuring pass and no layout shift as images load.
 *
 * Each tile is a real button, so the whole gallery is keyboard-navigable and
 * announces itself properly to a screen reader.
 */
export function GalleryMasonry({
  images,
  columns = 3,
  className,
}: {
  images: ImageKey[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const columnClass = {
    2: "columns-1 sm:columns-2",
    3: "columns-1 sm:columns-2 lg:columns-3",
    4: "columns-2 sm:columns-2 lg:columns-3 xl:columns-4",
  }[columns];

  return (
    <>
      <div className={cn(columnClass, "gap-4 md:gap-6", className)}>
        {images.map((key, i) => {
          const asset = img(key);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                // Stagger within a row of three, then reset — a long list
                // shouldn't end up with a two-second delay on the last tile.
                delay: reduceMotion ? 0 : (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-4 break-inside-avoid md:mb-6"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Vergroot foto: ${asset.alt}`}
                className="group relative block w-full overflow-hidden rounded-[1.25rem] bg-sand"
              >
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  width={asset.width}
                  height={asset.height}
                  placeholder="blur"
                  blurDataURL={asset.blur}
                  loading={i < 4 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                />
                {/* Warm scrim on hover, so the tile darkens rather than dims. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/12"
                />
              </button>
            </motion.div>
          );
        })}
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
