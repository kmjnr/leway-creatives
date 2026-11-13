/**
 * Builds a contact sheet per project from its full-page capture: 10 candidate
 * windows, thumbnailed and labelled with their scroll offset. Used to hand-pick
 * the case-study gallery frames instead of trusting an automatic score.
 *
 *   node scripts/contact-sheets.mjs
 *
 * Output: .taste-skill/contact/<slug>.jpg
 */
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";

const FULL = ".taste-skill/full";
const OUT = ".taste-skill/contact";
mkdirSync(OUT, { recursive: true });

const WIDTH = 1440;
const WIN_H = 750;
const THUMB_W = 320;
const THUMB_H = 200;
const COLS = 3;
const CANDIDATES = 9;

for (const file of readdirSync(FULL).filter((f) => f.endsWith(".png"))) {
  const slug = file.replace(/\.png$/, "");
  const src = `${FULL}/${file}`;
  const { height } = await sharp(src).metadata();
  const maxTop = Math.max(0, height - WIN_H);

  const tiles = [];
  for (let i = 0; i < CANDIDATES; i++) {
    const top = Math.round((maxTop / (CANDIDATES - 1)) * i);
    const label = Buffer.from(
      `<svg width="${THUMB_W}" height="26"><rect width="100%" height="100%" fill="#102117"/>
       <text x="8" y="18" font-family="monospace" font-size="14" fill="#DDF5E6">y=${top}</text></svg>`,
    );
    const shot = await sharp(src)
      .extract({ left: 0, top, width: WIDTH, height: WIN_H })
      .resize(THUMB_W, THUMB_H, { fit: "cover", position: "top" })
      .png()
      .toBuffer();
    const tile = await sharp({
      create: {
        width: THUMB_W,
        height: THUMB_H + 26,
        channels: 3,
        background: "#102117",
      },
    })
      .composite([
        { input: shot, top: 0, left: 0 },
        { input: label, top: THUMB_H, left: 0 },
      ])
      .png()
      .toBuffer();
    tiles.push(tile);
  }

  const rows = Math.ceil(CANDIDATES / COLS);
  const sheetH = rows * (THUMB_H + 26);
  const sheetW = COLS * THUMB_W;

  await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: "#102117" },
  })
    .composite(
      tiles.map((tile, i) => ({
        input: tile,
        left: (i % COLS) * THUMB_W,
        top: Math.floor(i / COLS) * (THUMB_H + 26),
      })),
    )
    .jpeg({ quality: 80 })
    .toFile(`${OUT}/${slug}.jpg`);

  console.log(`ok    ${slug}  height=${height}  → ${OUT}/${slug}.jpg`);
}
