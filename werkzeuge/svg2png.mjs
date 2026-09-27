// SVG → PNG, z. B. für das Open-Graph-Vorschaubild (1200 × 630).
//   node werkzeuge/svg2png.mjs <eingabe.svg> <ausgabe.png> [breite] [hoehe]
import sharp from 'sharp';
const [ein, aus, b = '1200', h] = process.argv.slice(2);
if (!ein || !aus) { console.error('Aufruf: node svg2png.mjs <eingabe.svg> <ausgabe.png> [breite] [hoehe]'); process.exit(2); }
let s = sharp(ein, { density: 300 }).resize(Number(b), h ? Number(h) : null, { fit: 'contain', background: '#ffffff' });
await s.png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(aus);
console.log('geschrieben:', aus);
