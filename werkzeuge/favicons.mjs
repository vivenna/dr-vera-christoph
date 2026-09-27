// Erzeugt den Favicon-Satz eines Entwurfs aus einem Icon-SVG.
//   node werkzeuge/favicons.mjs <icon.svg> <entwurfsordner> --name "Augenarztpraxis Dr. Christoph" --kurz "Dr. Christoph" --farbe "#275895" [--hintergrund "#ffffff"] [--rand 0.12]
// Ergebnis: favicon.ico (16/32/48), site.webmanifest, assets/icons/{icon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png}
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'node:fs/promises';
import path from 'node:path';
const a = process.argv.slice(2);
const opt = (n, d) => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : d; };
const [svgPfad, ordner] = a.filter((x, i) => !x.startsWith('--') && !(i > 0 && a[i - 1].startsWith('--')));
if (!svgPfad || !ordner) { console.error('Aufruf: node favicons.mjs <icon.svg> <entwurfsordner> --name … --kurz … --farbe #…'); process.exit(2); }
const name = opt('--name', 'Augenarztpraxis Dr. med. Vera Christoph');
const kurz = opt('--kurz', 'Dr. Christoph');
const farbe = opt('--farbe', '#275895');
const hg = opt('--hintergrund', '#ffffff');
const rand = Number(opt('--rand', '0.12'));
const svg = await fs.readFile(svgPfad);
const icons = path.join(ordner, 'assets', 'icons');
await fs.mkdir(icons, { recursive: true });
await fs.copyFile(svgPfad, path.join(icons, 'icon.svg'));
const roh = (g) => sharp(svg, { density: 72 * Math.max(1, g / 64) * 4 }).resize(g, g, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const mitHintergrund = async (g, anteil) => {
  const innen = Math.round(g * (1 - 2 * anteil));
  const bild = await sharp(svg, { density: 72 * Math.max(1, innen / 64) * 4 }).resize(innen, innen, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: g, height: g, channels: 4, background: hg } }).composite([{ input: bild, gravity: 'center' }]).png().toBuffer();
};
await fs.writeFile(path.join(ordner, 'favicon.ico'), await pngToIco([await roh(16), await roh(32), await roh(48)]));
await fs.writeFile(path.join(icons, 'apple-touch-icon.png'), await mitHintergrund(180, rand));
await fs.writeFile(path.join(icons, 'icon-192.png'), await mitHintergrund(192, rand));
await fs.writeFile(path.join(icons, 'icon-512.png'), await mitHintergrund(512, rand));
await fs.writeFile(path.join(icons, 'icon-maskable-512.png'), await mitHintergrund(512, 0.2));
const manifest = {
  name, short_name: kurz, lang: 'de', start_url: './', scope: './', display: 'browser',
  background_color: hg, theme_color: farbe,
  icons: [
    { src: 'assets/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'assets/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'assets/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
await fs.writeFile(path.join(ordner, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log('Favicons erzeugt in', ordner);
