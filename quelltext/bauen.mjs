#!/usr/bin/env node
// Erzeugt die HTML-Seiten der Entwürfe sowie sitemap.xml und robots.txt.
//
//   node quelltext/bauen.mjs                      alle Entwürfe
//   node quelltext/bauen.mjs 01-nah-an-referenz   nur einen Entwurf
//
// Keine Abhängigkeiten, benötigt nur Node.js ab Version 18.
//
// Aufbau eines Entwurfs unter quelltext/<entwurf>/:
//   entwurf.mjs   Einstellungen (Ausgabeordner, Titel, Farbe, Vorschaubild)
//   layout.mjs    Seitenrahmen: <head>, Kopf, Navigation, Fuß
//   seiten/*.mjs  eine Datei je Seite: `export const seite = {…}` und
//                 `export default function inhalt(ctx) { return '…' }`
//
// Erzeugt werden ausschließlich *.html, sitemap.xml und robots.txt.
// CSS, Skripte, Schriften, Grafiken und Downloads liegen direkt im Entwurfsordner
// unter entwuerfe/<entwurf>/ und werden dort von Hand gepflegt.

import { readdir, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { website } from './gemeinsam/website.mjs';
import * as gemeinsam from './gemeinsam/praxis.mjs';
import { leistungen, leistungenEinleitung } from './gemeinsam/leistungen.mjs';

const QUELLE = path.dirname(fileURLToPath(import.meta.url));
const WURZEL = path.resolve(QUELLE, '..');

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

const laden = async (datei) => import(pathToFileURL(datei).href + `?t=${Date.now()}`);

async function entwurfBauen(name) {
  const ordner = path.join(QUELLE, name);
  const cfg = (await laden(path.join(ordner, 'entwurf.mjs'))).default;
  const layout = (await laden(path.join(ordner, 'layout.mjs'))).default;

  const pfad = cfg.pfad ?? `entwuerfe/${name}/`;
  const ausgabe = path.join(WURZEL, pfad);
  const basisUrl = new URL(pfad, website.basisUrl).href;
  await mkdir(ausgabe, { recursive: true });

  const seitenOrdner = path.join(ordner, 'seiten');
  const dateien = (await readdir(seitenOrdner)).filter((d) => d.endsWith('.mjs')).sort();
  const seiten = [];
  for (const d of dateien) {
    const modul = await laden(path.join(seitenOrdner, d));
    if (!modul.seite?.datei) throw new Error(`${name}/seiten/${d}: \`export const seite = { datei: … }\` fehlt`);
    seiten.push({ quelle: `quelltext/${name}/seiten/${d}`, meta: modul.seite, inhalt: modul.default });
  }

  const terminExtern = /^https?:\/\//i.test(website.terminUrl);
  const fehler = [];

  for (const s of seiten) {
    const url = (datei = '') => new URL(datei === 'index.html' ? '' : datei, basisUrl).href;
    const kanonisch = url(s.meta.datei);
    const ogBild = cfg.ogBild ? new URL(cfg.ogBild, basisUrl).href : null;

    const ctx = {
      ...gemeinsam,
      leistungen,
      leistungenEinleitung,
      website,
      entwurf: cfg,
      seite: s.meta,
      seiten: seiten.map((x) => x.meta),
      esc,
      url,

      /** Termin-Schaltfläche: ctx.termin.href und ctx.termin.attribute verwenden. */
      termin: {
        href: website.terminUrl,
        extern: terminExtern,
        attribute: terminExtern ? ' target="_blank" rel="noopener noreferrer"' : '',
      },

      /** aria-current für den aktiven Navigationspunkt */
      aktiv: (schluessel) => (s.meta.nav === schluessel ? ' aria-current="page"' : ''),

      /** Sichtbarer Platzhalter für eine fehlende Angabe */
      platzhalter: (text) => `<span class="platzhalter">${esc(text)}</span>`,

      /** E-Mail als Link – oder Platzhalter, solange sie unbekannt ist */
      email: () =>
        gemeinsam.praxis.email
          ? `<a href="mailto:${esc(gemeinsam.praxis.email)}">${esc(gemeinsam.praxis.email)}</a>`
          : ctx.platzhalter(gemeinsam.PLATZHALTER.email),

      /**
       * Eine Angabe aus praxis.mjs (z. B. 'sprachen', 'kammer', 'hosting') als Text –
       * oder der passende sichtbare Platzhalter, solange sie `null` ist.
       */
      angabe: (schluessel) => {
        const p = gemeinsam.praxis;
        const wert = p[schluessel] ?? p.rechtliches?.[schluessel];
        if (wert) return esc(wert);
        const text = gemeinsam.PLATZHALTER[schluessel];
        if (!text) throw new Error(`ctx.angabe('${schluessel}'): unbekannter Schlüssel`);
        return ctx.platzhalter(text);
      },

      /** Faxnummer – oder Platzhalter */
      fax: () => (gemeinsam.praxis.fax ? esc(gemeinsam.praxis.fax) : ctx.platzhalter(gemeinsam.PLATZHALTER.fax)),

      /** Telefon als Link */
      telefonLink: (klasse = '') =>
        `<a href="${gemeinsam.praxis.telefon.href}"${klasse ? ` class="${klasse}"` : ''}>${esc(gemeinsam.praxis.telefon.anzeige)}</a>`,

      /** Standard-Kopfangaben: charset, viewport, title, description, robots, canonical, Open Graph, JSON-LD */
      kopf: () => {
        const titel = s.meta.titel;
        const beschreibung = s.meta.beschreibung;
        const jsonld = JSON.stringify(gemeinsam.strukturierteDaten({ url: basisUrl, bild: ogBild }), null, 2).replace(/</g, '\\u003c');
        return [
          '<meta charset="utf-8">',
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
          `<title>${esc(titel)}</title>`,
          `<meta name="description" content="${esc(beschreibung)}">`,
          website.indexierbar ? '' : '<meta name="robots" content="noindex, follow">',
          `<link rel="canonical" href="${esc(kanonisch)}">`,
          '<meta property="og:type" content="website">',
          '<meta property="og:locale" content="de_DE">',
          `<meta property="og:site_name" content="${esc(gemeinsam.praxis.praxisname)}">`,
          `<meta property="og:title" content="${esc(s.meta.ogTitel ?? titel)}">`,
          `<meta property="og:description" content="${esc(beschreibung)}">`,
          `<meta property="og:url" content="${esc(kanonisch)}">`,
          ogBild ? `<meta property="og:image" content="${esc(ogBild)}">` : '',
          ogBild ? '<meta property="og:image:width" content="1200">' : '',
          ogBild ? '<meta property="og:image:height" content="630">' : '',
          ogBild && cfg.ogBildAlt ? `<meta property="og:image:alt" content="${esc(cfg.ogBildAlt)}">` : '',
          '<meta name="twitter:card" content="summary_large_image">',
          s.meta.strukturierteDaten === false ? '' : `<script type="application/ld+json">\n${jsonld}\n</script>`,
        ].filter(Boolean).join('\n');
      },

      /** Favicon-Satz, erzeugt mit dem Favicon-Skript (siehe quelltext/README.md) */
      favicons: () =>
        [
          '<link rel="icon" href="favicon.ico" sizes="32x32">',
          '<link rel="icon" href="assets/icons/icon.svg" type="image/svg+xml">',
          '<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">',
          '<link rel="manifest" href="site.webmanifest">',
          cfg.themeColor ? `<meta name="theme-color" content="${esc(cfg.themeColor)}">` : '',
        ].filter(Boolean).join('\n'),
    };

    let html = layout(ctx, s.inhalt(ctx));
    html = html.replace(/^\s*<!doctype html>\s*/i, '');
    html =
      '<!doctype html>\n' +
      `<!-- Erzeugt mit quelltext/bauen.mjs aus ${s.quelle} – bitte dort ändern, nicht hier. -->\n` +
      html.trim() + '\n';

    // Plausibilitätsprüfungen – brechen den Bau ab, statt Fehler auszuliefern.
    const h1 = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) fehler.push(`${s.meta.datei}: ${h1} × <h1> (genau eine erwartet)`);
    if (/\s(?:href|src|srcset|action|poster|data)\s*=\s*"\/(?!\/)/i.test(html)) fehler.push(`${s.meta.datei}: Pfad mit führendem „/“ – nur relative Pfade verwenden`);
    if (/inspiration-/i.test(html)) fehler.push(`${s.meta.datei}: Verweis auf einen inspiration-*-Ordner`);
    if (/\$\{|\bundefined\b|\[object Object\]|\bNaN\b/.test(html)) fehler.push(`${s.meta.datei}: nicht aufgelöster Ausdruck (\${…}, undefined, NaN oder [object Object])`);
    if (!/<html[^>]*\slang="de"/i.test(html)) fehler.push(`${s.meta.datei}: <html lang="de"> fehlt`);

    await writeFile(path.join(ausgabe, s.meta.datei), html);
  }

  // sitemap.xml
  const eintraege = seiten
    .filter((s) => s.meta.sitemap !== false)
    .sort((a, b) => (a.meta.datei === 'index.html' ? -1 : b.meta.datei === 'index.html' ? 1 : 0))
    .map((s) => {
      const loc = new URL(s.meta.datei === 'index.html' ? '' : s.meta.datei, basisUrl).href;
      return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${website.stand}</lastmod>\n  </url>`;
    });
  await writeFile(
    path.join(ausgabe, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${eintraege.join('\n')}\n</urlset>\n`,
  );

  // robots.txt
  await writeFile(
    path.join(ausgabe, 'robots.txt'),
    [
      '# robots.txt – erzeugt mit quelltext/bauen.mjs',
      '#',
      '# Suchmaschinen lesen robots.txt nur im Wurzelverzeichnis einer Domain.',
      '# Solange dieser Entwurf in einem Unterordner liegt (GitHub-Pages-Vorschau),',
      '# ist die Datei wirkungslos; dort sorgt <meta name="robots" content="noindex">',
      '# auf jeder Seite dafür, dass die Vorschau nicht in den Suchindex gelangt.',
      '# Beim Livegang auf der eigenen Domain gilt der folgende Inhalt:',
      '',
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${new URL('sitemap.xml', basisUrl).href}`,
      '',
    ].join('\n'),
  );

  return { name, seiten: seiten.length, ausgabe: path.relative(WURZEL, ausgabe), fehler };
}

async function alleEntwuerfe() {
  const eintraege = await readdir(QUELLE, { withFileTypes: true });
  const namen = [];
  for (const e of eintraege) {
    if (!e.isDirectory() || !/^\d\d-/.test(e.name)) continue;
    try {
      await stat(path.join(QUELLE, e.name, 'entwurf.mjs'));
      namen.push(e.name);
    } catch { /* kein Entwurf */ }
  }
  return namen.sort();
}

const gewuenscht = process.argv.slice(2);
const namen = gewuenscht.length ? gewuenscht : await alleEntwuerfe();
let fehlerGesamt = 0;
for (const name of namen) {
  const r = await entwurfBauen(name);
  console.log(`✓ ${r.name}: ${r.seiten} Seiten → ${r.ausgabe}/`);
  for (const f of r.fehler) console.error(`  ✗ ${f}`);
  fehlerGesamt += r.fehler.length;
}
if (fehlerGesamt) {
  console.error(`\n${fehlerGesamt} Problem(e) gefunden – bitte beheben.`);
  process.exit(1);
}
