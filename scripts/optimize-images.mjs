// Compress large PNG/JPG images in public/images to reduce LCP and improve SEO.
// Usage: node scripts/optimize-images.mjs

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1600; // resize anything wider
const QUALITY = 82;     // good balance quality/size
const MIN_SIZE_TO_OPTIMIZE = 200 * 1024; // 200 KB

const files = fs.readdirSync(IMAGES_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;

for (const file of files) {
  const filePath = path.join(IMAGES_DIR, file);
  const sizeBefore = fs.statSync(filePath).size;
  if (sizeBefore < MIN_SIZE_TO_OPTIMIZE) continue;

  const ext = path.extname(file).toLowerCase();
  const tmp = filePath + '.tmp';

  try {
    let img = sharp(filePath);
    const meta = await img.metadata();
    if ((meta.width ?? 0) > MAX_WIDTH) {
      img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    if (ext === '.png') {
      await img.png({ quality: QUALITY, compressionLevel: 9, palette: true }).toFile(tmp);
    } else {
      await img.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);
    }

    const sizeAfter = fs.statSync(tmp).size;
    if (sizeAfter < sizeBefore) {
      fs.renameSync(tmp, filePath);
      const saved = sizeBefore - sizeAfter;
      const pct = ((saved / sizeBefore) * 100).toFixed(0);
      console.log(`  ${file.padEnd(45)} ${(sizeBefore / 1024).toFixed(0).padStart(5)}KB -> ${(sizeAfter / 1024).toFixed(0).padStart(5)}KB  (-${pct}%)`);
      totalBefore += sizeBefore;
      totalAfter += sizeAfter;
      processed++;
    } else {
      fs.unlinkSync(tmp);
    }
  } catch (err) {
    console.error(`  ${file}: ERROR - ${err.message}`);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

console.log(`\n${processed} imágenes optimizadas`);
console.log(`Total antes:  ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total ahora:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
console.log(`Ahorro:       ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB`);
