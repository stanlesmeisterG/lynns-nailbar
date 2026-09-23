"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BookButton } from "@/components/ui/book-button";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header.
 *
 * At the top of the page it floats transparently over the hero. Once the user
 * scrolls past ~24px it settles onto a frosted cream bar with a hairline. The
 * transition is the only thing that changes — position, height and type stay
 * put, so nothing shifts under the cursor.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on navigation. Adjusting state during render rather than in
  // an effect: the menu is then already closed in the same pass that paints the
  // new route, instead of flashing open for a frame and closing after.
  const [routeAtOpen, setRouteAtOpen] = React.useState(pathname);
  if (pathname !== routeAtOpen) {
    setRouteAtOpen(pathname);
    setMenuOpen(false);
  }

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Naar hoofdinhoud
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-soft)]",
          scrolled || menuOpen
            ? "border-b border-line-soft bg-cream/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[86rem] items-center justify-between px-6 md:px-10 lg:px-16">
          <Link
            href="/"
            aria-label={`${site.name} — naar de homepagina`}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={512}
              height={512}
              priority
              className="size-9 shrink-0 lg:size-10"
            />
            <span className="font-display text-[1.0625rem] leading-none tracking-[0.02em] lg:text-lg">
              Lynn&rsquo;s Nailbar
            </span>
          </Link>

          <nav aria-label="Hoofdmenu" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative inline-block py-2 text-sm text-ink/85 transition-colors hover:text-ink"
                    >
                      {item.label}
                      {/* Underline grows from the left; stays put when active. */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ease-[var(--ease-soft)]",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BookButton size="sm" className="hidden sm:inline-flex">
              Afspraak maken
            </BookButton>
            <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/** Two lines that cross into an X. Cheaper visually than a hamburger icon. */
function MenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Menu sluiten" : "Menu openen"}
      className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
    >
      <span className="relative block h-3 w-6">
        <span
          className={cn(
            "absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ease-[var(--ease-soft)]",
            open ? "top-1.5 rotate-45" : "top-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ease-[var(--ease-soft)]",
            open ? "top-1.5 -rotate-45" : "top-3",
          )}
        />
      </span>
    </button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  // Escape closes the panel.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-40 bg-cream pt-[var(--header-h)] lg:hidden"
        >
          <nav
            aria-label="Mobiel menu"
            className="flex h-full flex-col justify-between px-6 pb-10 pt-8"
          >
            <ul className="space-y-1">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : 0.05 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-line-soft"
                >
                  <Link
                    href={item.href}
                    className="font-display block py-5 text-[2rem] leading-none font-light"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: 0.4 }}
              className="space-y-4"
            >
              <BookButton size="lg" className="w-full">
                Afspraak maken
              </BookButton>
              <p className="text-center text-xs text-muted">
                Molenveldlaan 270, Nijmegen
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
