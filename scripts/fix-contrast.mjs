/**
 * One-off contrast repair. The design system's floor for secondary text is
 * 65–75% opacity; anything below 50% is decoration only. A sweep found ~50
 * content elements (labels, captions, meta lines, footer links) sitting at
 * 35–60%. This lifts them to the floor, while leaving genuinely decorative
 * marks (the breadcrumb separator, the aria-hidden figure numerals, input
 * placeholders) alone.
 *
 *   node scripts/fix-contrast.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const ROOTS = ["src/app", "src/components"];

/** Decorative uses that must stay where they are. */
const isDecoration = (line) => {
  if (/aria-hidden/.test(line)) return true;
  if (/placeholder:/.test(line)) return true;
  // The breadcrumb "/" separator — pure decoration, both tones.
  if (/text-leway-paper\/35/.test(line) && /tone === "dark"/.test(line)) return true;
  return false;
};

const lift = (line) =>
  line
    // Ink on light surfaces: floor is 65%.
    .replace(/text-leway-dark\/(35|40|45|50|55|60)\b/g, "text-leway-dark/65")
    // Paper on dark surfaces: floor is 70%.
    .replace(/text-leway-paper\/(35|40|45|50|55|60)\b/g, "text-leway-paper/70");

let files = 0;
let lines = 0;

for (const root of ROOTS) {
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(path);
      } else if (/\.tsx$/.test(entry.name)) {
        const src = readFileSync(path, "utf8").split("\n");
        let changed = 0;
        const out = src.map((line) => {
          const needs = /text-leway-(dark|paper)\/(35|40|45|50|55|60)\b/.test(line);
          if (!needs || isDecoration(line)) return line;
          changed++;
          return lift(line);
        });
        if (changed) {
          writeFileSync(path, out.join("\n"));
          files++;
          lines += changed;
          console.log(`${path}  ${changed} line(s) lifted`);
        }
      }
    }
  };
  walk(root);
}

console.log(`\n${lines} line(s) across ${files} file(s)`);
