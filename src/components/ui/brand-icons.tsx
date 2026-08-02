import * as React from "react";

/**
 * Brand glyphs.
 *
 * lucide-react v1 dropped third-party brand marks, so the two we need are
 * inlined here. Both are drawn on a 24px grid at the same optical weight as the
 * lucide set, so they sit correctly next to Mail, Phone and MapPin.
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

export function TikTokIcon(props: IconProps) {
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
      <path d="M14 3v12.2a3.8 3.8 0 1 1-3.2-3.75" />
      <path d="M14 3a5.4 5.4 0 0 0 5.4 5.4" />
    </svg>
  );
}
