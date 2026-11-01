// Converts the mod's README screenshots (PNG) to WebP for the site.
// Usage: npm run images -- <path to zen-fluent/screenshots> [extra PNGs…]
import { readdir, mkdir } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import sharp from "sharp";

const [src = "../zen-fluent/screenshots", ...extra] = process.argv.slice(2);
const out = "public/shots";
await mkdir(out, { recursive: true });

const files = (await readdir(src))
  .filter((f) => f.endsWith(".png"))
  .map((f) => join(src, f))
  .concat(extra);

for (const file of files) {
  const name = basename(file, extname(file));
  await sharp(file)
    .webp({ quality: 86, effort: 6 })
    .toFile(join(out, `${name}.webp`));
  console.log(`${name}.webp`);
}
