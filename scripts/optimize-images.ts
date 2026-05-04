import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const PUBLIC = path.resolve('public');

const TARGETS: { src: string; outDir: string; basename: string }[] = [
  { src: path.join(PUBLIC, '78-acres-horse-country-hero.jpg'), outDir: PUBLIC, basename: '78-acres-horse-country-hero' },
  { src: path.join(PUBLIC, 'trailhead-logistics-hero.jpg'),    outDir: PUBLIC, basename: 'trailhead-logistics-hero' },
  { src: path.join(PUBLIC, 'images', 'wec-center-hero.jpg'),   outDir: path.join(PUBLIC, 'images'), basename: 'wec-center-hero' },
];

const WIDTHS = [768, 1280, 1920];

async function process(target: typeof TARGETS[number]) {
  const buf = await fs.readFile(target.src);
  const meta = await sharp(buf).metadata();
  console.log(`\n${target.basename}: ${meta.width}x${meta.height}, ${(buf.length / 1024).toFixed(0)} KB`);

  for (const w of WIDTHS) {
    if (meta.width && w > meta.width) continue;

    const webpOut = path.join(target.outDir, `${target.basename}-${w}.webp`);
    const jpegOut = path.join(target.outDir, `${target.basename}-${w}.jpg`);

    await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(webpOut);
    await sharp(buf).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(jpegOut);

    const webpSize = (await fs.stat(webpOut)).size;
    const jpegSize = (await fs.stat(jpegOut)).size;
    console.log(`  ${w}w  webp ${(webpSize / 1024).toFixed(0)} KB  jpg ${(jpegSize / 1024).toFixed(0)} KB`);
  }
}

async function main() {
  for (const t of TARGETS) {
    try {
      await process(t);
    } catch (err) {
      console.error(`Failed: ${t.src}`, err);
    }
  }
}

main();
