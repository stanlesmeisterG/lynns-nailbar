"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline reading-progress indicator pinned under the header.
 *
 * Kept to 1px in taupe so it reads as a detail rather than a UI chrome element.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-[var(--header-h)] z-50 h-px origin-left bg-taupe"
    />
  );
}
