/**
 * Produces the homepage hero image from the Flora refinement of the founder's
 * supplied portrait (GPT Image 2.5 Flare, images-to-image).
 *
 *   node scripts/make-hero.mjs
 *
 * The source is 16:9; the site's hero slot is 16:10. The crop keeps both the
 * founder and the finished website design visible on the laptop. Output is
 * 1200x750 WebP q82, matching the rest of the shipped imagery.
 */
import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "scripts/flora-source/hero-final-a.png";
const OUT = "public/images/photography/hero-founder.webp";
const crop = { left: 180, top: 0, width: 2304, height: 1440 };

await sharp(SRC)
  .extract(crop)
  .resize(1200, 750, { kernel: "lanczos3" })
  .sharpen({ sigma: 0.6 })
  .webp({ quality: 82, effort: 6 })
  .toFile(OUT);

console.log(
  `ok    ${OUT}  ${Math.round(statSync(OUT).size / 1024)}KB  (${crop.width}x${crop.height} -> 1200x750)`,
);
