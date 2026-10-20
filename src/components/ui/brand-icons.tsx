import * as React from "react";

/**
 * Brand glyphs.
 *
 * lucide-react v1 dropped third-party brand marks, so the one we need is inlined
 * here. It is drawn on a 24px grid at the same optical weight as the lucide set,
 * so it sits correctly next to Mail, MessageCircle and MapPin.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}
