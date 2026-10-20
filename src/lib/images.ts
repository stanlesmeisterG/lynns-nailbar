import manifest from "./images.json";

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  /** Dutch alt text, written per photo. */
  alt: string;
  /** Base64 LQIP used as next/image `blurDataURL`. */
  blur: string;
};

export type ImageKey = keyof typeof manifest;

const images = manifest as Record<ImageKey, ImageAsset>;

/**
 * Look up a processed photo by its slug.
 *
 * Throws at build time on a typo rather than rendering a broken image, since
 * every key is known statically.
 */
export function img(key: ImageKey): ImageAsset {
  const asset = images[key];
  if (!asset) throw new Error(`Unknown image: ${key}`);
  return asset;
}

/**
 * Lynn's choice for a large slot, or a sharp stand-in while her file is too small.
 *
 * Her Oct 2026 photos reached us through a Word document, which shrank them to
 * about 300px wide — fine in a thumbnail strip, visibly blurred at hero or band
 * size on a phone. Rather than ship that, a large slot names her pick and a
 * stand-in, and this returns whichever is sharp enough. Once her original is
 * dropped into public/images and `npm run images` has run, her pick takes over
 * by itself; nothing in the code has to change.
 *
 * 1000px covers a full-width photo on a phone at 3x and a half-width one on a
 * laptop at 2x, which is the largest any of these slots gets.
 */
export function pickSharp(
  choice: ImageKey,
  standIn: ImageKey,
  minWidth = 1000,
): ImageKey {
  return img(choice).width >= minWidth ? choice : standIn;
}

/** Spread onto a next/image to carry src, dimensions, alt and blur at once. */
export function imgProps(key: ImageKey) {
  const { src, width, height, alt, blur } = img(key);
  return {
    src,
    width,
    height,
    alt,
    placeholder: "blur" as const,
    blurDataURL: blur,
  };
}

export { images };
