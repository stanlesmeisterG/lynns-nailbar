"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import { BookButton } from "@/components/ui/book-button";

/**
 * Floating booking button on small screens.
 *
 * It stays out of the way until the visitor has scrolled past the hero — the
 * hero already carries a booking button, and stacking a second one over it just
 * looks anxious. It also hides again over the footer, where the footer's own
 * call to action takes over.
 */
export function MobileBookBar() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.offsetHeight - window.innerHeight * 0.6;
      setVisible(past && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <BookButton
            size="lg"
            className="w-full shadow-[0_12px_40px_-12px_rgba(53,46,43,0.55)]"
          >
            Afspraak maken
          </BookButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
