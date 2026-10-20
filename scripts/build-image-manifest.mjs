/**
 * Regenerates src/lib/images.json from the photos in public/images.
 *
 *   npm run images
 *
 * For every photo that has an entry in the manifest it:
 *   - scales it down in place if its long side is over MAX_EDGE (so an original
 *     straight off a phone can simply be dropped in under the existing name),
 *   - records the real width and height,
 *   - rebuilds the base64 blur placeholder.
 *
 * Alt text is the one thing written by hand: it stays in images.json and is
 * carried over untouched. A new photo therefore needs an entry with an `alt`
 * before this script will pick it up — anything in the folder without one is
 * listed and skipped, so a stray file never ends up on the site unannounced.
 */

import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = path.join(root, "public/images");
const manifestPath = path.join(root, "src/lib/images.json");

/** Long side, in pixels. The wide booking band is the largest use of a photo. */
const MAX_EDGE = 2400;
/** Long side of the blur placeholder — matches the existing entries. */
const BLUR_EDGE = 20;

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const files = (await readdir(imageDir)).filter((f) => /\.jpe?g$/i.test(f));

const next = {};
const missing = [];

for (const key of Object.keys(manifest).sort()) {
  const entry = manifest[key];
  const file = path.join(root, "public", entry.src);
  if (!files.includes(path.basename(entry.src))) {
    missing.push(key);
    continue;
  }

  // `rotate()` with no argument applies the EXIF orientation, so a portrait
  // phone photo is stored upright rather than relying on the browser.
  const meta = await sharp(file).metadata();
  if (Math.max(meta.width, meta.height) > MAX_EDGE) {
    const tmp = `${file}.tmp`;
    await sharp(file)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(tmp);
    await rename(tmp, file);
  }

  const { width, height } = await sharp(file).metadata();
  const blur = await sharp(file)
    .resize(BLUR_EDGE, BLUR_EDGE, { fit: "inside" })
    .jpeg({ quality: 50 })
    .toBuffer();

  next[key] = {
    src: entry.src,
    width,
    height,
    alt: entry.alt,
    blur: `data:image/jpeg;base64,${blur.toString("base64")}`,
  };
}

await writeFile(manifestPath, `${JSON.stringify(next, null, 2)}\n`);

const listed = new Set(Object.values(next).map((e) => path.basename(e.src)));
const unlisted = files.filter((f) => !listed.has(f));

console.log(`images.json: ${Object.keys(next).length} photos`);
if (missing.length) {
  console.warn(`Dropped — in the manifest but no file: ${missing.join(", ")}`);
}
if (unlisted.length) {
  console.warn(
    `Skipped — no manifest entry (add one with an alt to include it): ${unlisted.join(", ")}`,
  );
}
