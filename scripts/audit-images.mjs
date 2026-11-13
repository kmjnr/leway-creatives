/**
 * Inventories every image in public/images with its dimensions, format and
 * dominant colours. Used to decide which pre-redesign assets could still be
 * used without violating the design system — no eyeballs required.
 *
 *   node scripts/audit-images.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";

const DIR = "public/images";

const files = readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(f));

console.log(
  "file".padEnd(38),
  "size".padStart(9),
  "dimensions".padStart(12),
  "ratio".padStart(6),
  " dominant",
);
console.log("-".repeat(95));

for (const file of files.sort()) {
  const path = `${DIR}/${file}`;
  const bytes = statSync(path).size;
  try {
    const img = sharp(path);
    const meta = await img.metadata();
    const { dominant } = await img.stats();
    const ratio = (meta.width / meta.height).toFixed(2);
    console.log(
      file.padEnd(38),
      `${(bytes / 1024).toFixed(0)}KB`.padStart(9),
      `${meta.width}x${meta.height}`.padStart(12),
      ratio.padStart(6),
      ` rgb(${dominant.r},${dominant.g},${dominant.b})`,
    );
  } catch (err) {
    console.log(file.padEnd(38), `${(bytes / 1024).toFixed(0)}KB`.padStart(9), "  unreadable", err.message);
  }
}

const work = readdirSync(`${DIR}/work`);
console.log(`\npublic/images/work: ${work.length} files`);
