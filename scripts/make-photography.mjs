/**
 * Produces the site's photography derivatives from the pre-redesign assets.
 *
 * Nothing ships raw: every file is cropped to a region that a visual inspection
 * verified contains no garbled text, no third-party brand name and no AI
 * artefact, then graded and sized for its slot. The crop rectangles come from
 * a defect map of each source image (see the inspection notes in the repo
 * history) — change them only with eyes on the source.
 *
 *   node scripts/make-photography.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "public/images";
const OUT = "public/images/photography";
mkdirSync(OUT, { recursive: true });

/**
 * [source file, crop left, top, width, height, output width]
 * Output is the crop scaled to at most 2x (mild sharpen, so a small clean
 * region still reads sharp at its display size) and capped at 1200 wide.
 */
const crops = [
  // Testimonial portraits — full-frame, square, for a circular crop.
  { from: "avatar_1.png", rect: [0, 0, 640, 640], out: 480, to: "avatar-mary.jpg" },
  { from: "avatar_3.png", rect: [0, 0, 640, 640], out: 480, to: "avatar-alan.jpg" },
  { from: "avatar_6.png", rect: [0, 0, 640, 640], out: 480, to: "avatar-michael.jpg" },
  { from: "avatar_4.png", rect: [0, 0, 640, 640], out: 480, to: "avatar-alexis.jpg" },

  // Service pages now use generated atmosphere — see scripts/make-generated.mjs.
  // The old five service crops were retired with them.

  // About + services index.
  { from: "strategy_design_image.webp", rect: [100, 300, 305, 305], to: "photo-about-team.jpg" },
  { from: "strategy_desk_setup.webp", rect: [280, 20, 552, 345], to: "photo-pricing.jpg" },

  // Contact page — the one photo in the set with no defects at full size.
  { from: "contact_image.webp", rect: [190, 0, 1024, 768], out: 1200, to: "contact-desk.jpg" },
];

for (const { from, rect, out, to } of crops) {
  const [left, top, width, height] = rect;
  const img = sharp(`${SRC}/${from}`).extract({ left, top, width, height });

  // Scale to the requested output width, capped at 2x the source crop so a
  // small clean region is never stretched into mush.
  const target = out ?? Math.min(width * 2, 1200);
  const scaled = Math.min(target, width * 2);
  const h = Math.round((scaled / width) * height);

  await img
    .resize(scaled, h, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${to}`);

  console.log(`ok    ${to.padEnd(28)} ${width}x${height} -> ${scaled}x${h}  (from ${from})`);
}

console.log(`\nderivatives written to ${OUT}`);
