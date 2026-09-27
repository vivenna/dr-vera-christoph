// Automatische Prüfung eines Entwurfs – simuliert GitHub Pages im Unterordner.
//
//   node werkzeuge/pruefen.mjs entwuerfe/01-nah-an-referenz [--bilder <ordner>] [--breiten 768,1024,1920] [--bericht <datei.json>] [--nur index.html,kontakt.html]
//
// Einmalig vorher: cd werkzeuge && npm install
// Chrome: Standardpfad für macOS, sonst Umgebungsvariable CHROME_PFAD setzen.
//
// Der Entwurf wird unter http://127.0.0.1:<port>/<repo>/<entwurf>/ ausgeliefert –
// genau wie auf GitHub Pages (Pfad aus quelltext/gemeinsam/website.mjs → basisUrl).
// Die inspiration-*-Ordner werden wie auf GitHub Pages NICHT ausgeliefert.
//
// Schweregrade: FEHLER (muss behoben werden), WARNUNG (prüfen), INFO.
// Exit-Code 1, wenn es FEHLER gibt.

import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const AXE = await fs.readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const CHROME = process.env.CHROME_PFAD || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { website } = await import(path.join(REPO, 'quelltext/gemeinsam/website.mjs'));
const VORSCHAU = website.basisUrl;
const PREFIX = new URL(VORSCHAU).pathname; // z. B. /vera-christoph/

// ── Argumente ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const ziel = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
if (!ziel) { console.error('Aufruf: node pruefen.mjs <entwurfsordner> [--bilder <ordner>] [--bericht <datei>] [--nur a.html,b.html]'); process.exit(2); }
const ENTWURF = path.resolve(REPO, ziel);
const REL = path.relative(REPO, ENTWURF).replace(/\\/g, '/') + '/';
const BILDER = opt('--bilder') ? path.resolve(opt('--bilder')) : null;
const BERICHT = opt('--bericht') ? path.resolve(opt('--bericht')) : null;
const NUR = opt('--nur') ? opt('--nur').split(',') : null;
const BREITEN = opt('--breiten') ? opt('--breiten').split(',').map(Number) : []; // zusätzliche Bildschirmfoto-Breiten, z. B. 768,1024,1920

// ── Befunde ─────────────────────────────────────────────────────────────────
const befunde = [];
const melde = (grad, seite, pruefung, text) => befunde.push({ grad, seite, pruefung, text });

// ── Server ──────────────────────────────────────────────────────────────────
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.md': 'text/markdown; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://x');
    const p = decodeURIComponent(u.pathname);
    if (!p.startsWith(PREFIX)) { res.writeHead(404); return res.end(); }
    let f = path.join(REPO, p.slice(PREFIX.length));
    if (!f.startsWith(REPO) || /\/inspiration-/.test(f) || /\/\.git(\/|$)/.test(f)) { res.writeHead(404); return res.end(); }
    let st = await fs.stat(f).catch(() => null);
    if (st?.isDirectory()) { f = path.join(f, 'index.html'); st = await fs.stat(f).catch(() => null); }
    if (!st) { const alt = f + '.html'; st = await fs.stat(alt).catch(() => null); if (st) f = alt; }
    if (!st) { res.writeHead(404); return res.end(); }
    const data = await fs.readFile(f);
    res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'content-length': data.length });
    res.end(data);
  } catch { res.writeHead(500); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const HOST = `http://127.0.0.1:${server.address().port}`;
const BASIS = `${HOST}${PREFIX}${REL}`;
const intern = (u) => u.startsWith(HOST + '/');
const zuDatei = (u) => { const x = new URL(u); return path.join(REPO, decodeURIComponent(x.pathname).slice(PREFIX.length)); };

// ── Seiten finden ───────────────────────────────────────────────────────────
async function htmlDateien(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'assets' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlDateien(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
let seiten = (await htmlDateien(ENTWURF)).map((p) => path.relative(ENTWURF, p).replace(/\\/g, '/')).sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)));
if (NUR) seiten = seiten.filter((s) => NUR.includes(s));
if (!seiten.length) { console.error('Keine HTML-Seiten gefunden in', ENTWURF); process.exit(2); }

// ── Browser ─────────────────────────────────────────────────────────────────
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--font-render-hinting=none'] });

async function oeffne(url, { js = true, breite = 1280, hoehe = 900 } = {}) {
  const p = await browser.newPage();
  await p.setJavaScriptEnabled(js);
  await p.setViewport({ width: breite, height: hoehe, deviceScaleFactor: 1 });
  const log = { anfragen: [], extern: [], fehlend: [], konsole: [], bytes: 0, schriften: 0 };
  await p.setRequestInterception(true);
  p.on('request', (r) => {
    const u = r.url();
    if (u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('about:')) return r.continue();
    log.anfragen.push(u);
    if (!intern(u)) { log.extern.push(`${r.resourceType()}: ${u}`); return r.abort(); }
    r.continue();
  });
  p.on('response', (r) => {
    if (!intern(r.url())) return;
    if (r.status() >= 400) log.fehlend.push(`${r.status()} ${r.url().replace(HOST, '')}`);
    log.bytes += Number(r.headers()['content-length'] || 0);
    if (/\.woff2?$/.test(r.url())) log.schriften++;
  });
  p.on('console', (m) => { if (m.type() === 'error' && !/net::ERR_FAILED|ERR_BLOCKED/.test(m.text())) log.konsole.push(m.text()); });
  p.on('pageerror', (e) => log.konsole.push(String(e)));
  await p.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  if (js) await p.evaluate(() => document.fonts.ready.then(() => true));
  return { p, log };
}

// ── Prüfroutinen im Browser ─────────────────────────────────────────────────
const DOM_INFO = () => {
  const q = (s) => document.querySelector(s);
  const meta = (n) => q(`meta[name="${n}"]`)?.getAttribute('content') ?? null;
  const prop = (n) => q(`meta[property="${n}"]`)?.getAttribute('content') ?? null;
  const sichtbar = (e) => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
  const attrs = [];
  for (const e of document.querySelectorAll('[href],[src],[srcset],[data-src],[poster],object[data]')) {
    for (const a of ['href', 'src', 'data-src', 'poster', 'data']) {
      const v = e.getAttribute(a);
      if (v != null && !(a === 'data' && e.tagName !== 'OBJECT')) attrs.push({ tag: e.tagName.toLowerCase(), attr: a, wert: v, target: e.getAttribute('target'), rel: e.getAttribute('rel') });
    }
    const ss = e.getAttribute('srcset');
    if (ss) for (const teil of ss.split(',')) attrs.push({ tag: e.tagName.toLowerCase(), attr: 'srcset', wert: teil.trim().split(/\s+/)[0] });
  }
  return {
    lang: document.documentElement.getAttribute('lang'),
    titel: document.title,
    beschreibung: meta('description'),
    robots: meta('robots'),
    viewport: meta('viewport'),
    kanonisch: q('link[rel="canonical"]')?.getAttribute('href') ?? null,
    og: { title: prop('og:title'), description: prop('og:description'), url: prop('og:url'), image: prop('og:image'), type: prop('og:type') },
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return 'ok'; } catch (e) { return 'ungültig: ' + e.message; } }),
    icon: !!q('link[rel~="icon"]'),
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().replace(/\s+/g, ' ')),
    ueberschriften: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => `${h.tagName} ${h.textContent.trim().replace(/\s+/g, ' ').slice(0, 70)}`),
    landmarken: { main: document.querySelectorAll('main').length, nav: document.querySelectorAll('nav').length, footer: document.querySelectorAll('footer').length, header: document.querySelectorAll('header').length },
    tabellenOhneTh: [...document.querySelectorAll('table')].filter((t) => !t.querySelector('th')).length,
    bilderOhneAlt: [...document.querySelectorAll('img:not([alt])')].map((i) => i.getAttribute('src')),
    platzhalter: [...document.querySelectorAll('.platzhalter')].map((e) => e.textContent.trim()),
    text: document.body.innerText,
    attributText: [...document.querySelectorAll('[aria-label],[title],[alt],[placeholder]')].map((e) => [e.getAttribute('aria-label'), e.getAttribute('title'), e.getAttribute('alt'), e.getAttribute('placeholder')].filter(Boolean).join(' ')).join(' | '),
    navLinks: [...document.querySelectorAll('nav a[href]')].map((a) => a.href),
    terminLinks: [...document.querySelectorAll('a[href]')].filter((a) => /termin/i.test(a.getAttribute('href'))).map((a) => ({ href: a.getAttribute('href'), sichtbar: sichtbar(a), text: a.textContent.trim().replace(/\s+/g, ' ') })),
    telLinks: document.querySelectorAll('a[href^="tel:"]').length,
    attrs,
    overflowVersteckt: ['html', 'body'].filter((t) => ['hidden', 'clip'].includes(getComputedStyle(q(t)).overflowX)),
  };
};

const UEBERLAUF = () => {
  const w = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  const clipt = (e) => { for (let a = e.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) { const o = getComputedStyle(a).overflowX; if (o !== 'visible') return true; } return false; };
  const raus = [];
  for (const e of document.querySelectorAll('body *')) {
    if (!e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > w + 1 && !clipt(e) && getComputedStyle(e).position !== 'fixed') {
      raus.push(`${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).join('.') : ''} (rechts ${Math.round(r.right)} px)`);
    }
  }
  return { w, sw, raus: raus.slice(0, 6), anzahl: raus.length };
};

const SCHRIFTGROESSEN = () => {
  const out = [];
  const gesehen = new Set();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const t = tw.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || gesehen.has(el)) continue;
    gesehen.add(el);
    if (el.closest('script,style,noscript,svg,[aria-hidden="true"]')) continue;
    if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 2 || r.height <= 2) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 18) out.push({ px: Math.round(fs * 10) / 10, el: `${el.tagName.toLowerCase()}${typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : ''}`, text: t.textContent.trim().replace(/\s+/g, ' ').slice(0, 45) });
  }
  return out;
};

const KLICKFLAECHEN = () => {
  const out = [];
  for (const e of document.querySelectorAll('a[href], button, summary, input:not([type="hidden"]), select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')) {
    if (!e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const r = e.getBoundingClientRect();
    if (r.width <= 2 || r.height <= 2 || r.right < 0 || r.bottom < 0) continue;
    if (r.width >= 44 && r.height >= 44) continue;
    if (e.tagName === 'A' && getComputedStyle(e).display === 'inline') {
      // Links im Fließtext sind nach WCAG 2.5.8 ausgenommen
      const block = e.closest('p, li, td, dd, dt, figcaption, address, blockquote, label');
      if (block && block.textContent.replace(/\s+/g, ' ').trim().length > e.textContent.replace(/\s+/g, ' ').trim().length + 3) continue;
    }
    out.push(`${e.tagName.toLowerCase()} „${(e.textContent || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40)}“ ${Math.round(r.width)}×${Math.round(r.height)}`);
  }
  return out;
};

const FOKUS_INFO = () => {
  const e = document.activeElement;
  if (!e || e === document.body || e === document.documentElement) return null;
  const cs = getComputedStyle(e);
  const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
  const schatten = cs.boxShadow && cs.boxShadow !== 'none';
  const r = e.getBoundingClientRect();
  const sichtbar = e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && r.width > 0 && r.height > 0;
  const imBild = r.bottom > 0 && r.right > 0 && r.left < innerWidth && r.top < innerHeight;
  return { schluessel: e.outerHTML.slice(0, 160), name: `${e.tagName.toLowerCase()} „${(e.textContent || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 35)}“`, markiert: outline || schatten, sichtbar, imBild };
};

async function fokusTest(p, seite, breite) {
  await p.evaluate(() => { window.scrollTo(0, 0); document.activeElement?.blur?.(); });
  const gesehen = new Set();
  let erstes = null;
  let anzahl = 0;
  for (let i = 0; i < 150; i++) {
    await p.keyboard.press('Tab');
    const f = await p.evaluate(FOKUS_INFO);
    if (!f) continue;
    if (gesehen.has(f.schluessel)) break;
    gesehen.add(f.schluessel);
    anzahl++;
    if (!erstes) erstes = f.name;
    if (!f.sichtbar || !f.imBild) melde('FEHLER', seite, `Tastatur ${breite}px`, `fokussierbar, aber nicht sichtbar: ${f.name}`);
    else if (!f.markiert) melde('WARNUNG', seite, `Tastatur ${breite}px`, `kein Outline/Box-Shadow beim Fokus (visuell prüfen): ${f.name}`);
  }
  return { erstes, anzahl };
}

// ── Textprüfungen ───────────────────────────────────────────────────────────
const ERLAUBTE_ZEITEN = new Set(['9.00', '12.00', '14.00', '16.00', '15.00', '17.00']);
const ENGLISCH = /\b(Home|Menu|Close|Open menu|Skip to|Book now|Book an|Appointment|Contact us|Services|Privacy|Imprint|Legal notice|Office hours|Read more|Learn more|Submit|Next|Previous|Toggle|Navigation menu|Search|Loading|Map data)\b/;
function textPruefungen(seite, info, roh) {
  const mails = roh.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  for (const m of new Set(mails)) melde('FEHLER', seite, 'Erfundene Angaben', `E-Mail-Adresse im Quelltext: ${m}`);
  const fax = info.text.match(/fax[^\n]{0,30}?\d[\d /-]{5,}/i);
  if (fax) melde('FEHLER', seite, 'Erfundene Angaben', `Faxnummer im Text: „${fax[0]}“`);
  const zeiten = [...info.text.matchAll(/(?<![\d.,])(\d{1,2})[.:](\d{2})(?![\d]|\.\d)/g)].map((m) => `${Number(m[1])}.${m[2]}`);
  const fremd = [...new Set(zeiten.filter((z) => !ERLAUBTE_ZEITEN.has(z)))];
  if (fremd.length) melde('WARNUNG', seite, 'Sprechzeiten', `Uhrzeit(en) außerhalb der Visitenkarte: ${fremd.join(', ')} – prüfen, ob das Uhrzeiten sind`);
  const en = (info.text + ' ' + info.attributText).match(ENGLISCH);
  if (en) melde('WARNUNG', seite, 'Sprache', `englisches Wort gefunden: „${en[0]}“`);
  for (const w of ['Lorem', 'ipsum', 'TODO', 'FIXME', 'XXX']) if (info.text.includes(w)) melde('FEHLER', seite, 'Füllsel', `„${w}“ im sichtbaren Text`);
  if (/\bEntwurf\b/i.test(info.text)) melde('WARNUNG', seite, 'Füllsel', 'Wort „Entwurf“ im sichtbaren Text – keine Entwurfsmarkierungen im Text');
  if (/Rezension|Bewertung|Sterne|★/i.test(info.text)) melde('WARNUNG', seite, 'Bewertungen', 'Text erwähnt Bewertungen/Rezensionen – es darf keinen Bewertungsbereich geben');
  if (/inspiration-/i.test(roh)) melde('FEHLER', seite, 'Pfade', 'Verweis auf inspiration-*-Ordner');
  if (/fonts\.googleapis|fonts\.gstatic|googletagmanager|google-analytics|maps\.google|googleapis/i.test(roh)) melde('FEHLER', seite, 'Datenschutz', 'Verweis auf Google-Dienste im Quelltext');
  const eckig = info.text.match(/\[[^\]\n]{3,140}\]/g) || [];
  return { eckig: [...new Set(eckig)], zeiten: [...new Set(zeiten)] };
}

// ── Hauptlauf ───────────────────────────────────────────────────────────────
const zusammenfassung = { entwurf: REL, seiten: {}, platzhalter: new Set(), externeLinks: new Set() };
let hauptseiten = null;
const alleTexte = {};
if (BILDER) await fs.mkdir(BILDER, { recursive: true });

for (const seite of seiten) {
  const url = BASIS + seite;
  const roh = await fs.readFile(path.join(ENTWURF, seite), 'utf8');
  const s = (zusammenfassung.seiten[seite] = {});

  // 1) Desktop mit JavaScript
  const { p, log } = await oeffne(url, { breite: 1280 });
  const info = await p.evaluate(DOM_INFO);
  alleTexte[seite] = info.text;
  if (!hauptseiten && seite === 'index.html') hauptseiten = [...new Set(info.navLinks.filter(intern).map((u) => u.split('#')[0]))];

  for (const e of log.extern) melde('FEHLER', seite, 'Externe Anfrage', e);
  for (const f of log.fehlend) melde('FEHLER', seite, 'Fehlende Datei', f);
  for (const k of log.konsole) melde('FEHLER', seite, 'Konsole', k.slice(0, 200));
  s.kb = Math.round(log.bytes / 1024);
  s.schriftdateien = log.schriften;
  if (log.schriften > 3) melde('WARNUNG', seite, 'Leistung', `${log.schriften} Schriftdateien geladen (Ziel: höchstens 2–3)`);
  if (log.bytes > 600 * 1024) melde('WARNUNG', seite, 'Leistung', `Seitengewicht ${s.kb} KB`);

  // Meta & Struktur
  if (info.lang !== 'de') melde('FEHLER', seite, 'Meta', `lang="${info.lang}" statt "de"`);
  if (!info.titel) melde('FEHLER', seite, 'Meta', '<title> fehlt');
  if (!info.beschreibung) melde('FEHLER', seite, 'Meta', 'meta description fehlt');
  else if (info.beschreibung.length > 165) melde('WARNUNG', seite, 'Meta', `description ist ${info.beschreibung.length} Zeichen lang (Ziel ≤ 160)`);
  if (!info.viewport) melde('FEHLER', seite, 'Meta', 'viewport fehlt');
  if (!info.kanonisch || !/^https:\/\//.test(info.kanonisch)) melde('FEHLER', seite, 'Meta', `canonical fehlt oder nicht absolut: ${info.kanonisch}`);
  for (const [k, v] of Object.entries(info.og)) if (!v) melde('FEHLER', seite, 'Meta', `og:${k} fehlt`);
  if (!info.jsonld.length) melde('WARNUNG', seite, 'Meta', 'kein JSON-LD');
  for (const j of info.jsonld) if (j !== 'ok') melde('FEHLER', seite, 'Meta', `JSON-LD ${j}`);
  if (!info.icon) melde('FEHLER', seite, 'Meta', 'Favicon-Link fehlt');
  for (const abs of [info.og.image, info.og.url, info.kanonisch].filter(Boolean)) {
    if (!abs.startsWith(VORSCHAU)) { melde('WARNUNG', seite, 'Meta', `absolute Adresse außerhalb der Vorschau-Domain: ${abs}`); continue; }
    let lokal = path.join(REPO, decodeURIComponent(new URL(abs).pathname).slice(PREFIX.length));
    if (fss.existsSync(lokal) && fss.statSync(lokal).isDirectory()) lokal = path.join(lokal, 'index.html');
    if (!fss.existsSync(lokal)) melde('FEHLER', seite, 'Meta', `Adresse zeigt ins Leere: ${abs}`);
  }
  if (info.og.url && info.kanonisch && info.og.url !== info.kanonisch) melde('WARNUNG', seite, 'Meta', 'og:url und canonical unterscheiden sich');
  if (info.h1.length !== 1) melde('FEHLER', seite, 'Struktur', `${info.h1.length} × <h1>: ${info.h1.join(' | ')}`);
  if (info.landmarken.main !== 1) melde('FEHLER', seite, 'Struktur', `${info.landmarken.main} × <main>`);
  if (!info.landmarken.nav) melde('FEHLER', seite, 'Struktur', 'kein <nav>');
  if (!info.landmarken.footer) melde('FEHLER', seite, 'Struktur', 'kein <footer>');
  if (info.tabellenOhneTh) melde('FEHLER', seite, 'Struktur', `${info.tabellenOhneTh} Tabelle(n) ohne <th>`);
  for (const b of info.bilderOhneAlt) melde('FEHLER', seite, 'Struktur', `<img> ohne alt: ${b}`);
  if (info.overflowVersteckt.length) melde('WARNUNG', seite, 'Responsiv', `overflow-x: hidden/clip auf ${info.overflowVersteckt.join(', ')} – kann Überlauf verdecken`);
  s.ueberschriften = info.ueberschriften;

  // Termin & Telefon
  if (!info.terminLinks.length) melde('FEHLER', seite, 'Termin', 'keine Termin-Schaltfläche (Link mit „termin“ im href)');
  else if (!info.terminLinks.some((t) => t.sichtbar)) melde('FEHLER', seite, 'Termin', 'Termin-Schaltfläche nicht sichtbar (1280 px)');
  s.terminLinks = info.terminLinks.map((t) => `${t.text} → ${t.href}`);
  if (!info.telLinks) melde('WARNUNG', seite, 'Kontakt', 'kein tel:-Link auf der Seite');

  // Texte
  const t = textPruefungen(seite, info, roh);
  t.eckig.forEach((x) => zusammenfassung.platzhalter.add(x));
  info.platzhalter.forEach((x) => zusammenfassung.platzhalter.add(x));
  s.uhrzeiten = t.zeiten;

  // Links und Ressourcen
  for (const a of info.attrs) {
    const v = a.wert.trim();
    if (!v || v.startsWith('#') && v.length === 1) continue;
    if (/^(mailto|tel|data):/i.test(v)) continue;
    if (/^javascript:/i.test(v)) { melde('FEHLER', seite, 'Links', `javascript:-Link (${a.tag})`); continue; }
    if (/^\/(?!\/)/.test(v)) { melde('FEHLER', seite, 'Pfade', `Pfad mit führendem „/“: ${v}`); continue; }
    let abs;
    try { abs = new URL(v, url).href; } catch { melde('FEHLER', seite, 'Links', `ungültige Adresse: ${v}`); continue; }
    if (!intern(abs)) {
      if (a.tag === 'link') continue; // canonical u. ä.
      zusammenfassung.externeLinks.add(abs);
      if (a.tag === 'a' && a.target === '_blank' && !/noopener/.test(a.rel || '')) melde('WARNUNG', seite, 'Links', `target=_blank ohne rel="noopener": ${abs}`);
      continue;
    }
    const [ohneFrag, frag] = abs.split('#');
    const datei = zuDatei(ohneFrag.split('?')[0]);
    if (!datei.startsWith(ENTWURF + path.sep) && datei !== ENTWURF) { melde('FEHLER', seite, 'Eigenständigkeit', `verweist aus dem Entwurfsordner hinaus: ${v}`); continue; }
    let ziel = datei;
    if (fss.existsSync(ziel) && fss.statSync(ziel).isDirectory()) ziel = path.join(ziel, 'index.html');
    if (!fss.existsSync(ziel)) { melde('FEHLER', seite, 'Links', `Ziel fehlt: ${v}`); continue; }
    if (frag && ziel.endsWith('.html')) {
      const zhtml = fss.readFileSync(ziel, 'utf8');
      if (!new RegExp(`id=["']${frag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(zhtml)) melde('FEHLER', seite, 'Links', `Sprungmarke fehlt: ${v}`);
    }
  }

  // axe Desktop
  const axe = async (pg, breite) => {
    await pg.addScriptTag({ content: AXE });
    const r = await pg.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
    for (const v of r.violations) {
      const ziele = v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' ; ');
      const grad = ['critical', 'serious'].includes(v.impact) || v.id === 'color-contrast' ? 'FEHLER' : 'WARNUNG';
      melde(grad, seite, `axe ${breite}px`, `${v.id} (${v.impact}, ${v.nodes.length}×): ${v.help} → ${ziele}`);
    }
    return r.incomplete.filter((x) => x.id === 'color-contrast').reduce((n, x) => n + x.nodes.length, 0);
  };
  s.kontrastUnklar = await axe(p, 1280);

  // Schriftgrößen Desktop
  for (const f of await p.evaluate(SCHRIFTGROESSEN)) melde(f.px < 16 ? 'FEHLER' : 'WARNUNG', seite, 'Schriftgröße 1280px', `${f.px}px ${f.el} „${f.text}“`);

  // Tastatur Desktop
  s.fokusDesktop = await fokusTest(p, seite, 1280);
  if (s.fokusDesktop.erstes && !/inhalt/i.test(s.fokusDesktop.erstes)) melde('WARNUNG', seite, 'Tastatur', `erstes Tab-Ziel ist ${s.fokusDesktop.erstes} – Sprunglink „Zum Inhalt“ empfohlen`);

  // Überlauf in allen Breiten
  for (const b of [320, 360, 390, 768, 1024, 1440]) {
    await p.setViewport({ width: b, height: 900, deviceScaleFactor: 1 });
    await new Promise((r) => setTimeout(r, 120));
    const u = await p.evaluate(UEBERLAUF);
    if (u.sw > u.w + 1) melde('FEHLER', seite, `Überlauf ${b}px`, `horizontale Scrollleiste (${u.sw} > ${u.w}): ${u.raus.join(', ')}`);
    else if (u.anzahl) melde('WARNUNG', seite, `Überlauf ${b}px`, `Elemente ragen über den Rand (evtl. abgeschnitten): ${u.raus.join(', ')}`);
  }

  // Bilder Desktop
  if (BILDER) {
    const n = seite.replace(/\//g, '_').replace('.html', '');
    await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await new Promise((r) => setTimeout(r, 150));
    await p.evaluate(() => { document.activeElement?.blur?.(); window.scrollTo(0, 0); });
    await p.screenshot({ path: path.join(BILDER, `${n}-1440-oben.png`) });
    await p.screenshot({ path: path.join(BILDER, `${n}-1440-ganz.png`), fullPage: true });
  }
  await p.close();

  // 2) Telefon mit JavaScript
  const m = await oeffne(url, { breite: 390, hoehe: 844 });
  s.kontrastUnklar += await axe(m.p, 390);
  for (const f of await m.p.evaluate(SCHRIFTGROESSEN)) melde(f.px < 16 ? 'FEHLER' : 'WARNUNG', seite, 'Schriftgröße 390px', `${f.px}px ${f.el} „${f.text}“`);
  for (const k of await m.p.evaluate(KLICKFLAECHEN)) melde('FEHLER', seite, 'Klickfläche 390px', `kleiner als 44×44: ${k}`);
  s.fokusTelefon = await fokusTest(m.p, seite, 390);
  if (BILDER) {
    const n = seite.replace(/\//g, '_').replace('.html', '');
    await m.p.evaluate(() => { document.activeElement?.blur?.(); window.scrollTo(0, 0); });
    await m.p.screenshot({ path: path.join(BILDER, `${n}-390-oben.png`) });
    await m.p.screenshot({ path: path.join(BILDER, `${n}-390-ganz.png`), fullPage: true });
  }
  await m.p.close();

  // 2b) Zusätzliche Bildschirmfotos
  if (BILDER && BREITEN.length) {
    const n = seite.replace(/\//g, '_').replace('.html', '');
    for (const b of BREITEN) {
      const z = await oeffne(url, { breite: b, hoehe: b < 700 ? 844 : 900 });
      await z.p.screenshot({ path: path.join(BILDER, `${n}-${b}-oben.png`) });
      await z.p.screenshot({ path: path.join(BILDER, `${n}-${b}-ganz.png`), fullPage: true });
      await z.p.close();
    }
  }

  // 3) Telefon ohne JavaScript – Navigation und Termin müssen erreichbar sein
  const o = await oeffne(url, { js: false, breite: 390, hoehe: 844 });
  const ohneJs = await o.p.evaluate(() => [...document.querySelectorAll('a[href]')].filter((a) => a.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && a.getBoundingClientRect().width > 2).map((a) => a.href.split('#')[0]));
  s.ohneJsSichtbareLinks = ohneJs.length;
  if (hauptseiten) for (const h of hauptseiten) if (!ohneJs.includes(h)) melde('FEHLER', seite, 'Ohne JavaScript', `Hauptseite nicht erreichbar (kein sichtbarer Link) bei 390px: ${h.replace(BASIS, '')}`);
  if (!ohneJs.some((h) => /termin/i.test(h))) melde('FEHLER', seite, 'Ohne JavaScript', 'Termin-Link ohne JavaScript nicht sichtbar (390px)');
  await o.p.close();
}

// ── Seitenübergreifend ──────────────────────────────────────────────────────
const dateiDa = (f) => fss.existsSync(path.join(ENTWURF, f));
for (const f of ['index.html', 'termin.html', 'impressum.html', 'datenschutz.html', 'sitemap.xml', 'robots.txt', 'README.md', 'favicon.ico', 'site.webmanifest']) if (!dateiDa(f)) melde('FEHLER', '(Entwurf)', 'Pflichtdatei', `${f} fehlt`);
if (dateiDa('site.webmanifest')) {
  try {
    const mf = JSON.parse(fss.readFileSync(path.join(ENTWURF, 'site.webmanifest'), 'utf8'));
    for (const ic of mf.icons || []) if (!dateiDa(ic.src)) melde('FEHLER', '(Entwurf)', 'Manifest', `Icon fehlt: ${ic.src}`);
    if (mf.lang && mf.lang !== 'de') melde('FEHLER', '(Entwurf)', 'Manifest', `lang ${mf.lang}`);
  } catch (e) { melde('FEHLER', '(Entwurf)', 'Manifest', 'ungültiges JSON: ' + e.message); }
}
const pdfs = (await fs.readdir(ENTWURF, { recursive: true })).filter((f) => /parkplatz-faltblatt.*\.pdf$/i.test(f));
if (!pdfs.length) melde('WARNUNG', '(Entwurf)', 'Parken', 'Faltblatt-PDF nicht im Entwurfsordner');
const gesamt = Object.values(alleTexte).join('\n');
if (!/Parkhaus/.test(gesamt) || !/Park(platz|plätze|en)/.test(gesamt)) melde('FEHLER', '(Entwurf)', 'Parken', 'kein Parkhinweis (Parkhaus + Parkplätze) gefunden');
if (!/18\.12\.2025|Dezember 2025/.test(gesamt)) melde('WARNUNG', '(Entwurf)', 'Parken', 'Stand des Faltblatts (18.12.2025) nicht genannt');
if (!/Stadt Schleswig/.test(gesamt)) melde('WARNUNG', '(Entwurf)', 'Parken', 'Herausgeber „Stadt Schleswig“ nicht genannt');
if (!/nach Vereinbarung/.test(gesamt)) melde('FEHLER', '(Entwurf)', 'Sprechzeiten', '„nach Vereinbarung“ fehlt');
const readme = dateiDa('README.md') ? fss.readFileSync(path.join(ENTWURF, 'README.md'), 'utf8') : '';
if (readme && !/terminUrl|website\.mjs/.test(readme)) melde('WARNUNG', '(Entwurf)', 'README', 'README nennt die Stelle der Termin-Adresse nicht (quelltext/gemeinsam/website.mjs → terminUrl)');

await browser.close();
server.close();

// ── Ausgabe ─────────────────────────────────────────────────────────────────
const zaehle = (g) => befunde.filter((b) => b.grad === g).length;
console.log(`\nPrüfung ${REL}  (${seiten.length} Seiten, ausgeliefert unter ${BASIS})\n`);
for (const grad of ['FEHLER', 'WARNUNG']) {
  const liste = befunde.filter((b) => b.grad === grad);
  if (!liste.length) continue;
  console.log(`── ${grad} (${liste.length}) ──`);
  for (const b of liste) console.log(`  [${b.seite}] ${b.pruefung}: ${b.text}`);
  console.log('');
}
console.log('── INFO ──');
for (const [n, s] of Object.entries(zusammenfassung.seiten)) console.log(`  ${n}: ${s.kb} KB, ${s.schriftdateien} Schriftdatei(en), Uhrzeiten: ${s.uhrzeiten.join(' ') || '–'}, Tab-Ziele: ${s.fokusDesktop.anzahl}/${s.fokusTelefon.anzahl}, Kontrast unklar: ${s.kontrastUnklar}`);
console.log(`  Platzhalter: ${[...zusammenfassung.platzhalter].join(' · ') || '–'}`);
console.log(`  Externe Links: ${[...zusammenfassung.externeLinks].join(' · ') || '–'}`);
console.log(`\nErgebnis: ${zaehle('FEHLER')} FEHLER, ${zaehle('WARNUNG')} WARNUNGEN${BILDER ? `, Bildschirmfotos in ${BILDER}` : ''}`);
if (BERICHT) await fs.writeFile(BERICHT, JSON.stringify({ befunde, seiten: zusammenfassung.seiten, platzhalter: [...zusammenfassung.platzhalter], externeLinks: [...zusammenfassung.externeLinks] }, null, 2));
process.exit(zaehle('FEHLER') ? 1 : 0);
