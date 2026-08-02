"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { img, type ImageKey } from "@/lib/images";

type LightboxProps = {
  images: ImageKey[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Full-screen image viewer.
 *
 * Radix Dialog handles the focus trap, the scroll lock and the aria wiring; the
 * arrow keys, the counter and the transitions are ours. Navigation wraps at both
 * ends so the visitor can never hit a dead stop.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const reduceMotion = useReducedMotion();
  const open = index !== null;

  const go = React.useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = index !== null ? img(images[index]) : null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && current && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.28 }}
                className="fixed inset-0 z-[70] bg-ink/94 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild aria-label="Fotogalerij">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.28 }}
                className="fixed inset-0 z-[71] flex flex-col outline-none"
              >
                <Dialog.Title className="sr-only">
                  Foto {index + 1} van {images.length}: {current.alt}
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Gebruik de pijltjestoetsen om door de foto&rsquo;s te bladeren
                  en Escape om te sluiten.
                </Dialog.Description>

                {/* Bar ------------------------------------------------------ */}
                <div className="flex items-center justify-between px-5 py-5 md:px-8">
                  <p className="label-xs tabular-nums text-cream/60">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>
                  <Dialog.Close
                    aria-label="Sluiten"
                    className="flex size-11 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
                  >
                    <X aria-hidden strokeWidth={1.25} className="size-5" />
                  </Dialog.Close>
                </div>

                {/* Image ---------------------------------------------------- */}
                <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={images[index]}
                      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex size-full items-center justify-center"
                    >
                      <Image
                        src={current.src}
                        alt={current.alt}
                        width={current.width}
                        height={current.height}
                        placeholder="blur"
                        blurDataURL={current.blur}
                        sizes="(max-width: 768px) 92vw, 80vw"
                        className="max-h-full w-auto max-w-full rounded-lg object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Desktop arrows sit outside the image. */}
                  <LightboxArrow side="left" onClick={() => go(-1)} />
                  <LightboxArrow side="right" onClick={() => go(1)} />
                </div>

                {/* Caption + touch controls --------------------------------- */}
                <div className="flex items-center justify-between gap-4 px-5 py-6 md:px-8">
                  <p className="max-w-xl text-xs leading-relaxed text-cream/60">
                    {current.alt}
                  </p>
                  <div className="flex gap-2 md:hidden">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Vorige foto"
                      className="flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors active:bg-cream/10"
                    >
                      <ArrowLeft aria-hidden strokeWidth={1.25} className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Volgende foto"
                      className="flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors active:bg-cream/10"
                    >
                      <ArrowRight aria-hidden strokeWidth={1.25} className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function LightboxArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Vorige foto" : "Volgende foto"}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full text-cream/60 transition-colors hover:bg-cream/10 hover:text-cream md:flex ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Icon aria-hidden strokeWidth={1.25} className="size-5" />
    </button>
  );
}
