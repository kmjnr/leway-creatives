/**
 * Compresses the Flora-generated section imagery into the site's WebP format.
 *
 * Source: GPT Image 2.6 Flare, Flora project
 * "LEWAY Creatives — section imagery (process + services)".
 * Raw source images are downloaded into scripts/flora-source/ (gitignored —
 * large working files, not runtime assets). The CDN serves them as JPEG
 * despite the .png paths; sharp detects the real format. Replace and re-run:
 *
 *   node scripts/make-generated.mjs
 *
 * Output matches the work-screenshot convention: 16:10, 1200x750, WebP q82.
 * The house colour grade is applied at render time by .photo in globals.css,
 * exactly as it is for the rest of the site's photography.
 */
import sharp from "sharp";
import { mkdirSync, existsSync, statSync } from "node:fs";

const SRC = "scripts/flora-source";
const OUT = "public/images/generated";
mkdirSync(OUT, { recursive: true });

/** [raw source filename, shipped filename], in Flora batch order. */
const manifest = [
  ["01-process-desk.png", "process-desk.webp"],
  ["02-involves-web-design.png", "involves-web-design.webp"],
  ["03-involves-copywriting.png", "involves-copywriting.webp"],
  ["04-involves-brand-identity.png", "involves-brand-identity.webp"],
  ["05-involves-lead-generation.png", "involves-lead-generation.webp"],
  ["06-involves-personal-branding.png", "involves-personal-branding.webp"],
  ["07-context-web-design.png", "context-web-design.webp"],
  ["08-context-copywriting.png", "context-copywriting.webp"],
  ["09-context-brand-identity.png", "context-brand-identity.webp"],
  ["10-context-lead-generation.png", "context-lead-generation.webp"],
  ["11-context-personal-branding.png", "context-personal-branding.webp"],
  ["12-index-web-design.png", "index-web-design.webp"],
  ["13-index-copywriting.png", "index-copywriting.webp"],
  ["14-index-brand-identity.png", "index-brand-identity.webp"],
  ["15-index-lead-generation.png", "index-lead-generation.webp"],
  ["16-index-personal-branding.png", "index-personal-branding.webp"],
];

const W = 1200;
const H = 750;

let written = 0;
for (const [from, to] of manifest) {
  const src = `${SRC}/${from}`;
  if (!existsSync(src)) {
    console.error(`missing  ${src}`);
    process.exitCode = 1;
    continue;
  }

  const meta = await sharp(src).metadata();
  // Centre-crop the 16:9 generation down to the house 16:10 frame.
  const ratio = W / H;
  let cw = meta.width;
  let ch = Math.round(cw / ratio);
  if (ch > meta.height) {
    ch = meta.height;
    cw = Math.round(ch * ratio);
  }
  const left = Math.round((meta.width - cw) / 2);
  const top = Math.round((meta.height - ch) / 2);

  await sharp(src)
    .extract({ left, top, width: cw, height: ch })
    .resize(W, H, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 82, effort: 6 })
    .toFile(`${OUT}/${to}`);

  written++;
  console.log(
    `ok      ${to.padEnd(38)} ${(statSync(`${OUT}/${to}`).size / 1024).toFixed(0)}KB  (${meta.width}x${meta.height} -> ${W}x${H})`,
  );
}

console.log(`\n${written}/${manifest.length} derivatives written to ${OUT}`);
