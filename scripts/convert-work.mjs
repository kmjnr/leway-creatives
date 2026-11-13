import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const root = process.cwd();
const map = [
  ['paidtaskers','paidtaskers'],['curatelove','curatelove'],['docsfast','docsfast'],
  ['premiumsafeboxes','premiumsafeboxes'],['fleetwood','forestwood'],['lifeline-hospitals','lifeline-hospitals'],
  ['adorntech','adorntech'],['overlandhire','overlandhire'],['solarizeke','solarizeke'],['hadiyed-flowers','hadiyed-flowers']
];
mkdirSync(`${root}/public/images/work`, { recursive: true });
for (const [src, out] of map) {
  await sharp(`${root}/.taste-skill/shots/${src}.png`)
    .extract({ left: 0, top: 0, width: 1425, height: 900 })
    .resize(1200, 750, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(`${root}/public/images/work/${out}.webp`);
  const m = await sharp(`${root}/public/images/work/${out}.webp`).metadata();
  console.log(out, m.width + 'x' + m.height);
}
await sharp(`${root}/.taste-skill/shots/lifeline-hospitals.png`)
  .extract({ left: 0, top: 0, width: 1440, height: 756 })
  .resize(1200, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 86 })
  .toFile(`${root}/public/og-work.jpg`);
console.log('og ok');
