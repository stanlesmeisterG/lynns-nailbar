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
