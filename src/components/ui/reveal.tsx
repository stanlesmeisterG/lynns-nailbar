"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger a group of siblings by passing an increasing index. */
  delay?: number;
  /** How far the element travels on entry, in pixels. */
  distance?: number;
  as?: "div" | "li" | "section" | "article" | "figure";
};

/**
 * Fade-and-rise on first scroll into view.
 *
 * Motion is the easiest way to make a site feel cheap, so this is the only
 * entrance animation on the site and it is small on purpose: 18px of travel
 * over 700ms. When the OS asks for reduced motion, children render immediately
 * with no transform at all.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

