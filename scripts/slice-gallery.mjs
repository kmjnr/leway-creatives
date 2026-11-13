/**
 * Slices case-study gallery images out of the full-page captures made by
 * scripts/capture-sites.mjs. Every frame is a real region of a real, deployed
 * site — nothing is composited or invented.
 *
 *   node scripts/slice-gallery.mjs
 *
 * Offsets come from scripts/gallery-plan.json (hand-picked from contact
 * sheets, so the galleries avoid regions where a live site has a broken
 * asset). Projects missing from the plan fall back to a content-aware scan.
 *
 * Output: public/images/work/<slug>-NN.webp (1200×750, 16:10)
 *         src/data/screens.json (caption + dimensions per frame)
 */
import sharp from "sharp";
import {
  readdirSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
} from "node:fs";

const FULL = ".taste-skill/full";
const OUT = "public/images/work";
const WIDTH = 1440;
const FRAME_W = 1200;
const FRAME_H = 750;
/** Source crop is 16:10 at capture width, so the downscale is 1:1 uniform. */
const SRC_H = Math.round((WIDTH * FRAME_H) / FRAME_W);
const MAX_FRAMES = 4;
mkdirSync(OUT, { recursive: true });

const plan = JSON.parse(readFileSync("scripts/gallery-plan.json", "utf8"));

/* ── Fallback: pick windows by measuring pixel content ─────────── */
async function rowProfile(src, height) {
  const smallH = Math.max(1, Math.round(height / 8));
  const data = await sharp(src)
    .resize(180, smallH, { fit: "fill" })
    .removeAlpha()
    .greyscale()
    .raw()
    .toBuffer();
  const rows = new Float64Array(smallH);
  for (let y = 0; y < smallH; y++) {
    let sum = 0;
    let sumSq = 0;
    for (let x = 0; x < 180; x++) {
      const v = data[y * 180 + x];
      sum += v;
      sumSq += v * v;
    }
    const mean = sum / 180;
    rows[y] = Math.sqrt(Math.max(0, sumSq / 180 - mean * mean));
  }
  return rows;
}

function windowScore(rows, top, height, winH) {
  const scale = rows.length / height;
  const from = Math.floor(top * scale);
  const to = Math.min(rows.length, Math.ceil((top + winH) * scale));
  let total = 0;
  for (let y = from; y < to; y++) total += rows[y];
  return total / Math.max(1, to - from);
}

function autoWindows(rows, height) {
  const maxTop = Math.max(0, height - SRC_H);
  const gap = Math.min(1200, Math.floor(maxTop / (MAX_FRAMES + 1)));
  const candidates = [];
  for (let top = 0; top <= maxTop; top += 60) {
    candidates.push({ top, score: windowScore(rows, top, height, SRC_H) });
  }
  const chosen = [{ top: 0 }];
  for (let i = 1; i < MAX_FRAMES; i++) {
    const target = Math.round((maxTop / (MAX_FRAMES - 1)) * i);
    let pick = null;
    for (const c of candidates) {
      if (Math.abs(c.top - target) > gap) continue;
      if (chosen.some((e) => Math.abs(e.top - c.top) < gap)) continue;
      if (!pick || c.score > pick.score) pick = c;
    }
    if (pick) chosen.push(pick);
  }
  return chosen.sort((a, b) => a.top - b.top);
}

const screens = {};
const available = readdirSync(FULL)
  .filter((f) => f.endsWith(".png"))
  .map((f) => f.replace(/\.png$/, ""))
  .sort();

for (const slug of available) {
  const src = `${FULL}/${slug}.png`;
  const { height } = await sharp(src).metadata();

  let windows = plan[slug];
  if (!Array.isArray(windows) || windows.length === 0) {
    windows = autoWindows(await rowProfile(src, height), height);
    console.log(`      ${slug}: fell back to content-aware scan`);
  }

  const frames = [];
  let n = 0;
  for (const win of windows) {
    const top = Math.max(0, Math.min(win.top, height - SRC_H));
    n++;
    const name = `${slug}-${String(n).padStart(2, "0")}`;
    await sharp(src)
      .extract({
        left: 0,
        top,
        width: WIDTH,
        height: Math.min(SRC_H, height - top),
      })
      .resize(FRAME_W, FRAME_H, { fit: "fill" })
      .webp({ quality: 82 })
      .toFile(`${OUT}/${name}.webp`);
    frames.push({
      src: `/images/work/${name}.webp`,
      width: FRAME_W,
      height: FRAME_H,
      note: win.note ?? "",
    });
  }

  screens[slug] = frames;
  console.log(`ok    ${slug}  ${frames.length} frames`);
}

writeFileSync("src/data/screens.json", JSON.stringify(screens, null, 2) + "\n");
console.log(`wrote src/data/screens.json — ${Object.keys(screens).length} projects`);
