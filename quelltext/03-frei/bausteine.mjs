// Wiederkehrende Bausteine für Entwurf 3: Symbole, Sprechzeiten, Schaltflächen.
// Alle Symbole sind eigene Zeichnungen im Stil der Bildmarke: ruhige Linien,
// runde Enden, gelegentlich die zwei kürzer werdenden „Wasserlinien“.

// ── Symbole (24 × 24, Strichstärke 1.8, Farbe über currentColor) ──────────
const PFADE = {
  telefon: '<path d="M8.2 3.5 10 8.1l-2.2 1.6a11.6 11.6 0 0 0 6.5 6.5l1.6-2.2 4.6 1.8v2.9a2 2 0 0 1-2.2 2A15.9 15.9 0 0 1 3.3 5.7a2 2 0 0 1 2-2.2z"/>',
  kalender: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M7.5 14h2M11 14h2M14.5 14h2M7.5 17.2h2M11 17.2h2"/>',
  ort: '<path d="M12 21s-6.5-5.7-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.4"/>',
  uhr: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.6 7.2 8.4 6 8.4-6"/>',
  fax: '<path d="M7 9V3.5h8l2 2V9"/><rect x="3" y="9" width="18" height="8.5" rx="2"/><path d="M7 14.5h10v6H7z"/>',
  sprache: '<path d="M4.5 5h15A1.5 1.5 0 0 1 21 6.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17h-1A1.5 1.5 0 0 1 3 15.5v-9A1.5 1.5 0 0 1 4.5 5z"/><path d="M7.5 9.5h9M7.5 12.8h5.5"/>',
  parken: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><path d="M9.5 17V7.5h3.3a2.8 2.8 0 0 1 0 5.6H9.5"/>',
  bus: '<rect x="5" y="3.5" width="14" height="14.5" rx="2.5"/><path d="M5 11h14M8 18v2.5M16 18v2.5M8.2 14.5h.1M15.7 14.5h.1"/>',
  download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>',
  extern: '<path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 4 18.5v-10A1.5 1.5 0 0 1 5.5 7H10"/>',
  pfeil: '<path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5"/>',
  menue: '<path d="M4 7h16M4 12h12M4 17h8"/>',
  schliessen: '<path d="M6 6l12 12M18 6 6 18"/>',
  karte: '<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><rect x="5.5" y="9" width="4" height="3.2" rx=".6"/><path d="M5.5 15.5h6M13.5 9.5h5M13.5 12.5h5"/>',
  ueberweisung: '<path d="M6 3h8.5L19 7.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4.5h5M8 12h8M8 15h8M8 18h5"/>',
  brille: '<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.4c1.2-.9 2.8-.9 4 0M3.1 13.2 4.8 7.5h1.5M20.9 13.2 19.2 7.5h-1.5"/>',
  sonnenbrille: '<path d="M3 11h7.5v2.2a3.8 3.8 0 0 1-7.5 0zM13.5 11H21v2.2a3.8 3.8 0 0 1-7.5 0z" fill="currentColor"/><path d="M10.5 11.8c1-.6 2-.6 3 0M3 11 4.5 6.5H6M21 11l-1.5-4.5H18"/>',
  medikamente: '<path d="M10.4 20.3a4.9 4.9 0 0 1-6.9-6.9l6.3-6.3a4.9 4.9 0 0 1 6.9 6.9z"/><path d="m6.7 10.2 7 7M17 3.5v4M15 5.5h4"/>',
  befunde: '<path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.2l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18z"/><path d="M3.5 11h17"/>',
  begleitung: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle cx="16.5" cy="9" r="2.5"/><path d="M15.6 14.1a4.6 4.6 0 0 1 5.4 4.5v.9"/>',
  zugang: '<path d="M4 20h4v-4h4v-4h4V8h4"/><path d="M4 20h16"/>',
  warnung: '<path d="M12 4 21.2 19.5H2.8z"/><path d="M12 10v4.2M12 17.1v.1"/>',
  notfall: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/>',
  auge: '<path d="M2.5 12C6 6.5 18 6.5 21.5 12 18 17.5 6 17.5 2.5 12z"/><path d="M8.6 11.6a3.4 3.4 0 0 1 6.8 0z" fill="currentColor"/><path d="M9 13.8h6M10.1 15.6h3.8"/>',
  schichtbild: '<path d="M3.5 8V5A1.5 1.5 0 0 1 5 3.5h3M16 3.5h3A1.5 1.5 0 0 1 20.5 5v3M20.5 16v3a1.5 1.5 0 0 1-1.5 1.5h-3M8 20.5H5A1.5 1.5 0 0 1 3.5 19v-3"/><path d="M7 9.2c1.7-1.2 3.3-1.2 5 0s3.3 1.2 5 0M7 12.6c1.7-1.2 3.3-1.2 5 0s3.3 1.2 5 0M7 16c1.7-.9 3.3-.9 5 0s3.3.9 5 0"/>',
  laser: '<path d="M7 4c-1.8 2.4-1.8 13.6 0 16 1.8-2.4 1.8-13.6 0-16z"/><path d="M2 8.5h3.6M2 15.5h3.6M8.6 8.6 17.5 12l-8.9 3.4"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>',
  lenkrad: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.4"/><path d="M3.6 11h6M14.4 11h6M12 14.4v6"/>',
  haken: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  wellen: '<path d="M3 9h18M3 13.5h13M3 18h8"/>',
};

/** Inline-SVG-Symbol; dekorativ (aria-hidden), Farbe über currentColor */
export function icon(name, klasse = 'icon') {
  const pfad = PFADE[name];
  if (!pfad) throw new Error(`Symbol „${name}“ fehlt`);
  return `<svg class="${klasse}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${pfad}</svg>`;
}

/** Bildmarke einfarbig (currentColor), inline – ohne IDs, darf mehrfach auf einer Seite stehen */
export function markeInline(klasse = 'marke') {
  return `<svg class="${klasse}" viewBox="0 0 120 76" width="120" height="76" aria-hidden="true" focusable="false">` +
    '<path d="M7 38C29 8.5 91 8.5 113 38C91 67.5 29 67.5 7 38Z" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round"/>' +
    '<path d="M43.5 38A16.5 16.5 0 0 1 76.5 38Z M49.8 31a3.6 3.6 0 1 0 7.2 0a3.6 3.6 0 1 0 -7.2 0Z M43.9 41.6H76.1A16.5 16.5 0 0 1 74.75 45.4H45.25A16.5 16.5 0 0 1 43.9 41.6ZM47.36 48.6H72.64A16.5 16.5 0 0 1 69.04 51.8H50.96A16.5 16.5 0 0 1 47.36 48.6Z" fill="currentColor" fill-rule="evenodd"/>' +
    '</svg>';
}

/** Anschrift in einer Zeile; „24837 Schleswig“ wird nie auseinandergerissen */
export function anschrift(ctx) {
  const a = ctx.praxis.adresse;
  return `${ctx.esc(a.strasse)}, <span class="zusammen">${ctx.esc(a.plz)} ${ctx.esc(a.stadt)}</span>`;
}

/** Dachzeile über einer Überschrift (mit den drei Wasserlinien davor, per CSS) */
export const dachzeile = (text) => `<p class="dachzeile">${text}</p>`;

/** Termin-Schaltfläche – immer ctx.termin.href und ctx.termin.attribute */
export function terminKnopf(ctx, klasse = 'knopf knopf--voll', text = 'Termin vereinbaren') {
  const hinweis = ctx.termin.extern ? '<span class="nur-sr"> (öffnet in neuem Fenster)</span>' : '';
  return `<a class="${klasse}" href="${ctx.termin.href}"${ctx.termin.attribute}>${icon('kalender')}<span>${text}${hinweis}</span></a>`;
}

/** Telefon als Schaltfläche mit Symbol */
export function telefonKnopf(ctx, klasse = 'knopf knopf--rand') {
  return `<a class="${klasse}" href="${ctx.praxis.telefon.href}">${icon('telefon')}<span>${ctx.esc(ctx.praxis.telefon.anzeige)}</span></a>`;
}

/** Leistungsbereiche: Symbol und Kurzbeschreibung für Übersichten */
export const BEREICHE = {
  vorsorge: { icon: 'auge', kurztext: 'Sehtest und Brillenverordnung, Augendruck, Vorsorge bei grünem Star und Makuladegeneration, Hilfe bei Beschwerden.' },
  diagnostik: { icon: 'schichtbild', kurztext: 'Genaue Messungen von Netzhaut, Sehnerv, Hornhaut und Gesichtsfeld, zum Beispiel mit der OCT.' },
  laser: { icon: 'laser', kurztext: 'Wenn sich nach einer Operation des grauen Stars ein Nachstar bildet: Behandlung mit dem YAG-Laser.' },
  fuehrerschein: { icon: 'lenkrad', kurztext: 'Alle vorgeschriebenen Sehtests und die Bescheinigung für die Führerscheinstelle.' },
  notfaelle: { icon: 'notfall', kurztext: 'Plötzliche Sehstörungen, Verletzungen oder starke Schmerzen: Hier lesen Sie, wann Sie sofort handeln sollten.' },
};

/** Anzahl der Punkte eines Bereichs; bei den Notfällen sind es Anlässe, keine Leistungen */
export const anzahl = (n, id = '') =>
  id === 'notfaelle' ? `${n} Notfall-Anlässe` : `${n} ${n === 1 ? 'Leistung' : 'Leistungen'}`;

/**
 * Sprechzeiten-Tabelle, erzeugt aus ctx.praxis.sprechzeiten.
 * form: 'voll' (Tag | Vormittag | Nachmittag) oder 'kompakt' (Tag | Zeiten)
 */
export function sprechzeitenTabelle(ctx, { form = 'voll', beschriftung = 'Sprechzeiten der Praxis', klasse = '' } = {}) {
  const leer = '<span aria-hidden="true">–</span><span class="nur-sr">keine Sprechzeit</span>';
  const zeilen = ctx.praxis.sprechzeiten.map((tag) => {
    if (form === 'kompakt') {
      const zeiten = tag.zeiten.map((z) => `<span class="zeit">${ctx.spanne(z)}</span>`).join(' ');
      return `<tr data-tag="${tag.tag}"><th scope="row">${tag.tag}</th><td>${zeiten}</td></tr>`;
    }
    const [vor, nach] = tag.zeiten;
    return `<tr data-tag="${tag.tag}"><th scope="row">${tag.tag}</th><td>${vor ? ctx.spanne(vor) : leer}</td><td>${nach ? ctx.spanne(nach) : leer}</td></tr>`;
  });
  const kopf = form === 'kompakt'
    ? '<tr><th scope="col">Tag</th><th scope="col">Sprechzeit</th></tr>'
    : '<tr><th scope="col">Tag</th><th scope="col">Vormittag</th><th scope="col">Nachmittag</th></tr>';
  return `<table class="zeiten zeiten--${form}${klasse ? ' ' + klasse : ''}">
  <caption class="nur-sr">${beschriftung}</caption>
  <thead class="${form === 'kompakt' ? 'nur-sr' : ''}">${kopf}</thead>
  <tbody>
    ${zeilen.join('\n    ')}
  </tbody>
</table>
<p class="zeiten__zusatz">… ${ctx.praxis.sprechzeitenZusatz}</p>`;
}

/** Sprechzeiten als knappe Liste (Fußzeile, Terminseite) */
export function sprechzeitenListe(ctx, klasse = 'zeitliste') {
  const zeilen = ctx.praxis.sprechzeiten
    .map((tag) => `<div><dt>${tag.tag}</dt><dd>${tag.zeiten.map((z) => `<span class="zeit">${ctx.spanne(z)}</span>`).join(' ')}</dd></div>`)
    .join('');
  return `<dl class="${klasse}">${zeilen}</dl><p class="zeitliste__zusatz">${ctx.praxis.sprechzeitenZusatz}</p>`;
}

/** Drei Notfall-Wege: Praxis, Bereitschaftsdienst, Notruf */
export function notfallWege(ctx, ebene = 'h3') {
  return `<ul class="notfallwege" role="list">
  <li class="notfallweg">
    <${ebene} class="notfallweg__titel">Während der Sprechzeiten</${ebene}>
    <p>Rufen Sie uns bitte sofort an. Wir sagen Ihnen, wie es weitergeht.</p>
    <a class="notfallweg__nummer" href="${ctx.praxis.telefon.href}">${icon('telefon')}<span>${ctx.esc(ctx.praxis.telefon.anzeige)}</span></a>
  </li>
  <li class="notfallweg">
    <${ebene} class="notfallweg__titel">Außerhalb der Sprechzeiten</${ebene}>
    <p>Der ärztliche Bereitschaftsdienst ist rund um die Uhr erreichbar.</p>
    <a class="notfallweg__nummer" href="tel:116117">${icon('telefon')}<span>116 117</span></a>
  </li>
  <li class="notfallweg notfallweg--ernst">
    <${ebene} class="notfallweg__titel">Bei Lebensgefahr</${ebene}>
    <p>Wählen Sie sofort den Notruf – zum Beispiel bei schweren Verletzungen.</p>
    <a class="notfallweg__nummer" href="tel:112">${icon('telefon')}<span>112</span></a>
  </li>
</ul>`;
}

/** Seitenkopf der Unterseiten: Dachzeile, <h1>, Einleitung und optional eine Sprungliste */
export function seitenkopf({ dach, titel, einleitung, sprung = '' }) {
  return `<div class="seitenkopf">
  <div class="rahmen seitenkopf__raster">
    <div class="seitenkopf__text">
      ${dach ? dachzeile(dach) : ''}
      <h1>${titel}</h1>
      ${einleitung ? `<p class="einleitung">${einleitung}</p>` : ''}
    </div>
    ${sprung}
  </div>
</div>`;
}

/** Sprungliste zu Abschnitten derselben Seite */
export function sprungliste(beschriftung, eintraege) {
  return `<nav class="sprung" aria-label="${beschriftung}">
  <p class="sprung__titel" aria-hidden="true">Auf dieser Seite</p>
  <ul role="list">
    ${eintraege.map(([ziel, text, sym]) => `<li><a href="#${ziel}">${sym ? icon(sym) : ''}<span>${text}</span>${icon('pfeil', 'icon icon--pfeil')}</a></li>`).join('\n    ')}
  </ul>
</nav>`;
}
