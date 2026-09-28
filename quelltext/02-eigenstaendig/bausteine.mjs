// Wiederkehrende Bausteine für Entwurf 2 (eigenständig).
// Wird von layout.mjs und den Seiten importiert. Alle Praxisdaten kommen aus `ctx`,
// hier steht nur Darstellung – keine Uhrzeit, keine Nummer, keine Adresse von Hand.

// ── Symbole ────────────────────────────────────────────────────────────────
// Eigene Strichsymbole im Stil der Augenmarke: feine Linien in Tinte (currentColor),
// ruhige Flächen in Iris (.f1) und Lederhaut (.f2). Raster 32 × 32.
const SYMBOLE = {
  auge: '<path class="f2" d="M3 16c3.6-5.6 8-8.4 13-8.4s9.4 2.8 13 8.4c-3.6 5.6-8 8.4-13 8.4S6.6 21.6 3 16z"/><circle class="f1" cx="16" cy="16" r="5"/><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/>',
  vorsorge: '<path class="f2" d="M2.5 14c3.2-5 7-7.5 11.5-7.5S22.3 9 25.5 14c-3.2 5-7 7.5-11.5 7.5S5.7 19 2.5 14z"/><circle class="f1" cx="14" cy="14" r="4.2"/><circle cx="14" cy="14" r="1.7" fill="currentColor" stroke="none"/><circle class="f3" cx="23" cy="22" r="5"/><path d="M26.6 25.6l3 3"/>',
  diagnostik: '<circle class="f2" cx="11" cy="16" r="8"/><circle class="f1" cx="11" cy="16" r="3.6"/><circle cx="11" cy="16" r="1.4" fill="currentColor" stroke="none"/><path d="M21.5 11c2.2 1.3 3.3 3 3.3 5s-1.1 3.7-3.3 5"/><path d="M25.5 7.5c3 2.1 4.5 4.9 4.5 8.5s-1.5 6.4-4.5 8.5"/>',
  laser: '<path class="f2" d="M2.5 19c3-4.6 6.6-7 11-7s8 2.4 11 7c-3 4.6-6.6 7-11 7s-8-2.4-11-7z"/><circle class="f1" cx="13.5" cy="19" r="4"/><circle cx="13.5" cy="19" r="1.6" fill="currentColor" stroke="none"/><path d="M27.5 4.5 16.4 16"/><circle cx="28.3" cy="3.7" r="1.7" fill="currentColor" stroke="none"/>',
  fuehrerschein: '<rect class="f2" x="3" y="7" width="26" height="18" rx="2.5"/><circle class="f1" cx="10.5" cy="14" r="2.8"/><path d="M6.5 21.5c.8-2.4 2.2-3.5 4-3.5s3.2 1.1 4 3.5"/><path d="M18 13h7M18 17h7M18 21h4.5"/>',
  notfaelle: '<circle class="f2" cx="16" cy="17.5" r="10.5"/><path d="M16 12.5v10M11 17.5h10" stroke-width="2.4"/><path d="M16 2v2.4M8.4 4.3l1.3 1.9M23.6 4.3l-1.3 1.9"/>',
  karte: '<rect class="f2" x="3" y="7.5" width="26" height="17" rx="2.5"/><rect class="f1" x="7" y="12" width="6" height="4.5" rx="1"/><path d="M7 20.5h11M19.5 13h5.5"/>',
  dokument: '<path class="f2" d="M8 3.5h11l6 6v19H8z"/><path d="M19 3.5v6h6"/><path d="M11.5 15h10M11.5 19h10M11.5 23h6"/>',
  brille: '<circle class="f1" cx="9" cy="19" r="5.5"/><circle class="f1" cx="23" cy="19" r="5.5"/><path d="M14.5 18.3c1-.9 2-.9 3 0"/><path d="M3.6 17.6 5.2 10.5h3M28.4 17.6 26.8 10.5h-3"/>',
  medikamente: '<rect class="f2" x="4" y="4" width="17" height="23" rx="2"/><path d="M8 10h9M8 14h9M8 18h4"/><rect class="f1" x="16.5" y="17.5" width="12" height="6.5" rx="3.25" transform="rotate(-40 22.5 20.75)"/><path d="M20.4 18.3 24.6 23.2"/>',
  mappe: '<path class="f2" d="M3.5 8.5V25a1.5 1.5 0 0 0 1.5 1.5h22a1.5 1.5 0 0 0 1.5-1.5V11.5A1.5 1.5 0 0 0 27 10H15l-2.5-3H5a1.5 1.5 0 0 0-1.5 1.5z"/><path d="M3.5 14.5h25"/>',
  auto: '<path class="f2" d="M4 21.5v-5l2.6-6.5h18.8l2.6 6.5v5z"/><path d="M4 16.5h24"/><circle class="f1" cx="9.5" cy="22.5" r="2.8"/><circle class="f1" cx="22.5" cy="22.5" r="2.8"/>',
  sonne: '<circle class="f1" cx="16" cy="16" r="5.5"/><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1"/>',
  personen: '<circle class="f1" cx="11" cy="11" r="4"/><path class="f2" d="M3.5 26c.6-5 3.4-7.5 7.5-7.5s6.9 2.5 7.5 7.5z"/><circle class="f1" cx="22" cy="12.5" r="3.4"/><path d="M20 19.2c.6-.2 1.3-.3 2-.3 3.6 0 6 2.3 6.5 6.6h-6.5"/>',
  telefon: '<path class="f2" d="M9 4.5h3.8l2 6-2.9 2c1.4 3 3.5 5.1 6.5 6.5l2-2.9 6 2V22c0 1.4-1.1 2.5-2.5 2.5C13.8 24 8 18.2 6.5 7c0-1.4 1.1-2.5 2.5-2.5z"/>',
  brief: '<rect class="f2" x="4" y="7.5" width="24" height="17" rx="2"/><path d="m5 9 11 8.5L27 9"/>',
  uhr: '<circle class="f2" cx="16" cy="16" r="12"/><path d="M16 9v7l4.5 3"/>',
  kalender: '<rect class="f2" x="4" y="6.5" width="24" height="21" rx="2.5"/><path d="M4 12.5h24M10 4v5M22 4v5"/><rect class="f1" x="9" y="16.5" width="5" height="4" rx=".8"/>',
  ort: '<path class="f2" d="M16 29s9-8.6 9-16a9 9 0 0 0-18 0c0 7.4 9 16 9 16z"/><circle class="f1" cx="16" cy="13" r="3.5"/>',
  bus: '<rect class="f2" x="6" y="4" width="20" height="21" rx="3"/><path d="M6 10.5h20M6 16.5h20M9.5 25v3M22.5 25v3"/><circle cx="11" cy="20.8" r="1.3" fill="currentColor" stroke="none"/><circle cx="21" cy="20.8" r="1.3" fill="currentColor" stroke="none"/>',
  parken: '<rect class="f2" x="4" y="4" width="24" height="24" rx="4"/><path d="M12.5 23V9h5a4 4 0 0 1 0 8h-5" stroke-width="2.2"/>',
  menue: '<path d="M5 9h22M5 16h22M5 23h22" stroke-width="2.2"/>',
  schliessen: '<path d="M8 8l16 16M24 8 8 24" stroke-width="2.2"/>',
  pfeil: '<path d="M5 16h21M19 9l7 7-7 7"/>',
  hoch: '<path d="M16 27V6M9 13l7-7 7 7"/>',
  download: '<path d="M16 4v17M9 14l7 7 7-7M5 27h22"/>',
  extern: '<path d="M18 5h9v9M27 5 15 17M24 19v7H6V8h7"/>',
  haken: '<path d="M6 16.5 12.5 23 26 9" stroke-width="2.2"/>',
};

/** Dekoratives Inline-SVG-Symbol (für Screenreader ausgeblendet) */
export function symbol(name, klasse = '') {
  const inhalt = SYMBOLE[name];
  if (!inhalt) throw new Error(`Symbol „${name}“ gibt es nicht`);
  return `<svg class="symbol symbol-${name}${klasse ? ' ' + klasse : ''}" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inhalt}</svg>`;
}

// ── Schaltflächen ──────────────────────────────────────────────────────────

/** Termin-Schaltfläche – Ziel und target/rel kommen immer aus ctx.termin */
export function terminKnopf(ctx, { text = 'Termin vereinbaren', klasse = 'knopf', aktuell = true } = {}) {
  return `<a class="${klasse}" href="${ctx.termin.href}"${ctx.termin.attribute}${aktuell && !ctx.termin.extern ? ctx.aktiv('termin') : ''}>${ctx.esc(text)}${ctx.termin.extern ? '<span class="unsichtbar"> (öffnet in neuem Fenster)</span>' : ''}</a>`;
}

/** Telefon als Schaltfläche, Nummer aus ctx.praxis */
export function telefonKnopf(ctx, { klasse = 'knopf knopf-zweit', vorsatz = '' } = {}) {
  const t = ctx.praxis.telefon;
  return `<a class="${klasse}" href="${t.href}">${symbol('telefon')}<span>${vorsatz ? ctx.esc(vorsatz) + ' ' : ''}${ctx.esc(t.anzeige)}</span></a>`;
}

/** Externer Link, öffnet in neuem Fenster */
export function externerLink(ctx, href, text, klasse = '') {
  return `<a${klasse ? ` class="${klasse}"` : ''} href="${ctx.esc(href)}" target="_blank" rel="noopener noreferrer">${ctx.esc(text)}<span class="unsichtbar"> (öffnet in neuem Fenster)</span></a>`;
}

// ── Sprechzeiten ───────────────────────────────────────────────────────────

/** Liste von Tagen als Text: „Montag bis Freitag“, „Dienstag und Donnerstag“, „Mo–Fr“ */
export function tageText(ctx, tage, { kurz = false } = {}) {
  const alle = ctx.praxis.sprechzeiten;
  const name = (t) => (kurz ? t.kurz : t.tag);
  const laeufe = [];
  for (const i of tage.map((t) => alle.indexOf(t))) {
    const letzter = laeufe.at(-1);
    if (letzter && i === letzter.at(-1) + 1) letzter.push(i);
    else laeufe.push([i]);
  }
  const teile = laeufe.flatMap((l) =>
    l.length >= 3 ? [`${name(alle[l[0]])}${kurz ? '–' : ' bis '}${name(alle[l.at(-1)])}`] : l.map((i) => name(alle[i])),
  );
  if (teile.length === 1) return teile[0];
  return teile.slice(0, -1).join(', ') + (kurz ? ', ' : ' und ') + teile.at(-1);
}

/**
 * Sprechzeiten so gruppiert wie auf der Visitenkarte:
 * gleiche Uhrzeiten → ein Eintrag mit allen Tagen, in der Reihenfolge der Daten.
 */
export function sprechzeitenGruppen(ctx) {
  const gruppen = [];
  for (const tag of ctx.praxis.sprechzeiten) {
    for (const zeit of tag.zeiten) {
      const schluessel = zeit.join('-');
      let g = gruppen.find((x) => x.schluessel === schluessel);
      if (!g) gruppen.push((g = { schluessel, zeit, tage: [] }));
      g.tage.push(tag);
    }
  }
  return gruppen;
}

/** Kompakte Sprechzeiten wie auf der Visitenkarte (Fußzeile, Termin-Seite) */
export function sprechzeitenKompakt(ctx, { kurz = false, klasse = 'zeiten-kompakt' } = {}) {
  const zeilen = sprechzeitenGruppen(ctx)
    .map((g) => `<div><dt>${ctx.esc(tageText(ctx, g.tage, { kurz }))}</dt><dd>${ctx.esc(ctx.spanne(g.zeit))}</dd></div>`)
    .join('');
  return `<dl class="${klasse}">${zeilen}</dl><p class="zeiten-zusatz">${ctx.esc(ctx.praxis.sprechzeitenZusatz)}</p>`;
}

/** Vormittag/Nachmittag eines Tages trennen (Beginn vor 13 Uhr = Vormittag) */
const stunde = (t) => {
  const [h, m = '0'] = String(t).split(/[.:]/);
  return Number(h) + Number(m) / 60;
};
function tagesteile(tag) {
  const vm = tag.zeiten.filter(([von]) => stunde(von) < 13);
  const nm = tag.zeiten.filter(([von]) => stunde(von) >= 13);
  return { vm, nm };
}

/** Zelleninhalt: mehrere Zeitspannen mit „und“ für Screenreader, sichtbar untereinander */
function zeitenZelle(ctx, zeiten) {
  if (!zeiten.length) return '<span aria-hidden="true">–</span><span class="unsichtbar">keine Sprechzeit</span>';
  return zeiten.map((z) => `<span class="zeit">${ctx.esc(ctx.spanne(z))}</span>`).join('<span class="unsichtbar"> und </span>');
}

/** Die Sprechzeiten-Tabelle (Wochentag · vormittags · nachmittags) */
export function sprechzeitenTabelle(ctx, { beschriftung = 'Sprechzeiten der Praxis', beschriftungSichtbar = false } = {}) {
  const zeilen = ctx.praxis.sprechzeiten
    .map((tag) => {
      const { vm, nm } = tagesteile(tag);
      return `<tr role="row"><th scope="row" role="rowheader">${ctx.esc(tag.tag)}</th><td role="cell">${zeitenZelle(ctx, vm)}</td><td role="cell">${zeitenZelle(ctx, nm)}</td></tr>`;
    })
    .join('\n');
  // Die expliziten Rollen erhalten die Tabellensemantik auch dann, wenn die Tabelle
  // auf dem Telefon per CSS als Raster dargestellt wird.
  return `<table class="zeiten-tabelle" role="table">
<caption${beschriftungSichtbar ? '' : ' class="unsichtbar"'}>${ctx.esc(beschriftung)}</caption>
<thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Wochentag</th><th scope="col" role="columnheader">Vormittag</th><th scope="col" role="columnheader">Nachmittag</th></tr></thead>
<tbody role="rowgroup">
${zeilen}
</tbody>
</table>`;
}

/**
 * Wochenleiste: jede Zeile ein Wochentag mit den Zeiten als Text und einem
 * Balken auf einer Stundenskala (nur Grafik, für Screenreader ausgeblendet).
 * Der Balken besteht aus einem Feld je Stunde; belegte Stunden tragen die
 * Klasse „an“. Das CSS-Raster legt die Felder automatisch nebeneinander,
 * deshalb passt die Grafik zu jeder Änderung der Sprechzeiten – ohne Inline-Stile.
 */
export function wochenleiste(ctx) {
  const tage = ctx.praxis.sprechzeiten;
  const alle = tage.flatMap((t) => t.zeiten);
  const von = Math.floor(Math.min(...alle.map(([a]) => stunde(a)))) - 1;
  const bis = Math.ceil(Math.max(...alle.map(([, b]) => stunde(b)))) + 1;
  const stunden = Array.from({ length: bis - von }, (_, i) => von + i);
  // Skala: jede zweite volle Stunde beschriftet, das Ende mit „Uhr“
  const skala =
    stunden.map((h) => `<span>${(h - von) % 2 === 0 ? h : ''}</span>`).join('') +
    `<span class="skala-ende">${bis} Uhr</span>`;
  const zeilen = tage
    .map((tag) => {
      const belegt = (h) => tag.zeiten.some(([a, b]) => stunde(a) < h + 1 && stunde(b) > h);
      const felder = stunden.map((h) => (belegt(h) ? '<span class="an"></span>' : '<span></span>')).join('');
      const zeiten = tag.zeiten.map((z) => `<span class="zeit">${ctx.esc(ctx.spanne(z))}</span>`).join('<span class="unsichtbar"> und </span>');
      return `<li class="woche-tag"><span class="woche-name">${ctx.esc(tag.tag)}</span><span class="woche-zeiten">${zeiten}</span><span class="woche-balken" aria-hidden="true">${felder}</span></li>`;
    })
    .join('\n');
  return `<div class="woche">
<div class="woche-skala" aria-hidden="true">${skala}</div>
<ul class="woche-liste">
${zeilen}
</ul>
</div>`;
}

// ── Anschrift ──────────────────────────────────────────────────────────────

export function anschrift(ctx, { mitName = true } = {}) {
  const a = ctx.praxis.adresse;
  return `<address class="anschrift">${mitName ? `${ctx.esc(ctx.praxis.praxisname)}<br>` : ''}${ctx.esc(a.strasse)}<br>${ctx.esc(a.plz)} ${ctx.esc(a.stadt)}</address>`;
}

// ── Parken ─────────────────────────────────────────────────────────────────

/** Link auf das Faltblatt: Herausgeber, Titel, Stand, Dateityp und Größe im Linktext */
export function faltblattLink(ctx, klasse = 'download') {
  const f = ctx.faltblatt;
  const stadt = f.herausgeber.split(' – ')[0]; // „Stadt Schleswig“
  return `<a class="${klasse}" href="assets/downloads/${ctx.esc(f.datei)}">${symbol('download')}<span>Faltblatt der ${ctx.esc(stadt)} herunterladen: „${ctx.esc(f.titel)}“, Stand ${ctx.esc(f.stand)} <span class="download-info">(${ctx.esc(f.groesse)})</span></span></a>`;
}

/** Vollständiger Herausgeber des Faltblatts (der Stand steht schon im Linktext) */
export function faltblattQuelle(ctx) {
  return `Herausgeber: ${ctx.esc(ctx.faltblatt.herausgeber)}`;
}

/** Die drei empfohlenen Parkmöglichkeiten aus dem Faltblatt (nach Nummer) */
export function parkEmpfehlungen(ctx) {
  const wahl = ['P3', 'P5', 'P6'];
  return wahl.map((nr) => ctx.parkplaetze.find((p) => p.nr === nr)).filter(Boolean);
}

/** Kurzname ohne Klammerzusatz, z. B. „GEWOBA-Parkhaus“ */
export const parkName = (p) => p.name.replace(/\s*\(.*\)$/, '');

/** Die drei Empfehlungen als kurze Liste */
export function parkListe(ctx, klasse = 'park-liste') {
  return `<ul class="${klasse}">${parkEmpfehlungen(ctx)
    .map((p) => `<li><span class="park-nr">${ctx.esc(p.nr)}</span><span><strong>${ctx.esc(parkName(p))}</strong><br>${ctx.esc(p.adresse)} · ${ctx.esc(p.art)}${/überdacht/.test(p.name) ? ', überdacht' : ''}</span></li>`)
    .join('')}</ul>`;
}

/** Kurzer Parkhinweis für Startseite und Sprechzeiten */
export function parkhinweisKurz(ctx, { ueberschrift = 'h3' } = {}) {
  return `<div class="hinweis hinweis-parken">
${symbol('parken', 'hinweis-symbol')}
<div class="hinweis-inhalt">
<${ueberschrift} class="hinweis-titel">Bitte beachten: Das Innenstadt-Parkhaus ist gesperrt</${ueberschrift}>
<p>${ctx.esc(ctx.anfahrt.parkhausGesperrt)}</p>
<p>In Gehweite der Praxis finden Sie zum Beispiel diese Parkmöglichkeiten:</p>
${parkListe(ctx)}
<p><a class="mehr-link" href="kontakt.html#parken">Weitere Parkplätze und Faltblatt der Stadt${symbol('pfeil')}</a></p>
</div>
</div>`;
}

// ── Karte (Zwei-Klick-Lösung) ──────────────────────────────────────────────

export function karte(ctx) {
  const k = ctx.karte;
  const a = ctx.praxis.adresse;
  return `<div class="karte" data-karte data-src="${ctx.esc(k.einbettung)}" data-titel="Karte: Lage der Praxis, ${ctx.esc(a.strasse)}">
<div class="karte-flaeche">
<img class="karte-bild" src="assets/bilder/karte-platzhalter.svg" alt="" width="1200" height="560" loading="lazy">
<div class="karte-hinweis">
<p class="karte-text">Die Karte wird erst geladen, wenn Sie auf „Karte laden“ klicken. Mit dem Klick willigen Sie ein, dass Ihre IP-Adresse an Google übertragen wird. Mehr dazu in der <a href="datenschutz.html#karte">Datenschutzerklärung</a>.</p>
<p class="karte-ohne-js">Über den Link „Karte bei Google Maps öffnen“ unter dieser Fläche sehen Sie die Lage der Praxis direkt auf google.com/maps.</p>
<button class="knopf karte-laden" type="button" hidden>Karte laden</button>
</div>
</div>
<div class="karte-leiste">
<p class="karte-adresse">${symbol('ort')}<span>${ctx.esc(a.strasse)}, ${ctx.esc(a.plz)} ${ctx.esc(a.stadt)}</span></p>
<p class="karte-links"><a class="karte-extern" href="${ctx.esc(k.link)}" target="_blank" rel="noopener noreferrer"><span>Karte bei Google Maps öffnen</span>${symbol('extern')}<span class="unsichtbar"> (öffnet in neuem Fenster)</span></a></p>
<p class="karte-quelle" hidden>Kartendaten: <a href="${ctx.esc(k.lizenzLink)}" target="_blank" rel="noopener noreferrer"><span>${ctx.esc(k.quellenhinweis)}</span><span class="unsichtbar"> (öffnet in neuem Fenster)</span></a></p>
</div>
</div>`;
}

// ── Leistungen ─────────────────────────────────────────────────────────────

/** Symbol je Leistungsbereich */
export const bereichSymbol = { vorsorge: 'vorsorge', diagnostik: 'diagnostik', laser: 'laser', fuehrerschein: 'fuehrerschein', notfaelle: 'notfaelle' };

// Fachbegriffe, die nicht in Klammern stehen, aber trotzdem hervorgehoben werden
const FACHBEGRIFFE = ['Ishihara-Tafeln', 'Amsler-Gitter', 'Lang-Test', 'Titmus-Test', 'YAG-Kapsulotomie', 'Nachstar', 'Neuroophthalmologische Abklärung'];

/**
 * Leistungstext mit hervorgehobenen Fachbegriffen: Begriffe in Klammern und die
 * Liste oben werden als <b class="fachbegriff"> ausgezeichnet. Der Wortlaut
 * bleibt unverändert (er kommt aus quelltext/gemeinsam/leistungen.mjs).
 */
export function mitFachbegriffen(ctx, text) {
  let html = ctx.esc(text);
  html = html.replace(/\(([^()]+)\)/g, '(<b class="fachbegriff">$1</b>)');
  for (const f of FACHBEGRIFFE) {
    const e = ctx.esc(f);
    if (html.includes(`>${e}<`)) continue;
    html = html.replace(new RegExp(`(^|[\\s„])(${e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?=[\\s,.:;“)]|$)`), '$1<b class="fachbegriff">$2</b>');
  }
  return html;
}

// ── Trennstellen für Überschriften ─────────────────────────────────────────
// Überschriften werden nicht automatisch getrennt (CSS: hyphens: manual), damit
// keine Brüche wie „Schles-wiger“ entstehen. Damit lange Wörter auf schmalen
// Telefonen trotzdem passen, bekommen sie hier weiche Trennstellen (&shy;).
const TRENNSTELLEN = [
  ['Führerscheingutachten', 'Führerschein', 'gutachten'],
  ['Datenschutzerklärung', 'Datenschutz', 'erklärung'],
  ['Datenschutzbeauftragte', 'Datenschutz', 'beauftragte'],
  ['Aufsichtsbehörde', 'Aufsichts', 'behörde'],
  ['Pupillenerweiterung', 'Pupillen', 'erweiterung'],
  ['Verkehrsmitteln', 'Verkehrs', 'mitteln'],
  ['Medikamentenplan', 'Medikamenten', 'plan'],
  ['Versichertenkarte', 'Versicherten', 'karte'],
  ['Kontaktlinsen', 'Kontakt', 'linsen'],
  ['Berufsrechtliche', 'Berufs', 'rechtliche'],
];

/** Setzt weiche Trennstellen in bekannte lange Wörter (Eingabe: fertiges HTML ohne Attribute) */
export function trennen(html) {
  let aus = String(html);
  for (const [wort, vorn, hinten] of TRENNSTELLEN) aus = aus.split(wort).join(`${vorn}&shy;${hinten}`);
  return aus;
}

// ── Seitengerüst: Randspalte + Hauptspalte ─────────────────────────────────
// Auf dem Desktop (ab 1100 px) ein 12-Spalten-Raster: links eine schmale
// Randspalte (3 Spalten) für Stichwort und Kurzinfos, rechts der Inhalt.
// Darunter stehen Stichwort und Inhalt einfach untereinander.

/** Kopf einer Seite mit der einzigen <h1> */
export function seitenkopf({ stichwort, titel, einleitung = '', rand = '', zusatz = '' }) {
  return `<div class="seitenkopf raster">
<div class="rand"><p class="stichwort">${stichwort}</p>${rand}</div>
<div class="haupt">
<h1>${trennen(titel)}</h1>
${einleitung ? `<p class="einleitung">${einleitung}</p>` : ''}${zusatz}
</div>
</div>`;
}

/** Ein Abschnitt mit <h2>; `rand` füllt die Randspalte */
export function abschnitt({ id, stichwort = '', rand = '', titel, inhalt, klasse = '' }) {
  return `<section class="abschnitt raster${klasse ? ' ' + klasse : ''}" id="${id}" aria-labelledby="${id}-titel">
<div class="rand">${stichwort ? `<p class="stichwort">${stichwort}</p>` : ''}${rand}</div>
<div class="haupt">
<h2 id="${id}-titel">${trennen(titel)}</h2>
${inhalt}
</div>
</section>`;
}

// ── Notfall ────────────────────────────────────────────────────────────────

/** Drei Nummern für Notfälle: Praxis (während der Sprechzeiten), 116 117, 112 */
export function notfallKacheln(ctx) {
  const t = ctx.praxis.telefon;
  return `<ul class="notfall-kacheln">
<li><span class="notfall-wann">Während der Sprechzeiten</span><a class="notfall-nummer" href="${t.href}">${ctx.esc(t.anzeige)}</a><span class="notfall-wer">unsere Praxis – bitte sofort anrufen</span></li>
<li><span class="notfall-wann">Außerhalb der Sprechzeiten</span><a class="notfall-nummer" href="tel:116117">116 117</a><span class="notfall-wer">ärztlicher Bereitschaftsdienst</span></li>
<li class="notfall-112"><span class="notfall-wann">Bei Lebensgefahr</span><a class="notfall-nummer" href="tel:112">112</a><span class="notfall-wer">Notruf</span></li>
</ul>`;
}
