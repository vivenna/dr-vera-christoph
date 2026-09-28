// Seitenrahmen für Entwurf 2 (eigenständig).
//
// Kopf: linksbündige Wortmarke, Textnavigation mit Balken unter der aktiven Seite,
// Telefonnummer und Termin-Schaltfläche immer sichtbar.
// Auf dem Telefon (unter 900 px) wandern „Anrufen“ und „Termin vereinbaren“ in eine
// feste Aktionsleiste am unteren Rand; das Menü klappt nur mit JavaScript zu.
// Fuß: hell (Lederhaut), mehrspaltig – Praxis, Sprechzeiten, Kontakt, Anfahrt.

import { symbol, terminKnopf, sprechzeitenKompakt } from './bausteine.mjs';

// Eigennamen, die die automatische Silbentrennung falsch trennt („Google
// Ma-ps“), werden in <span class="wort"> gefasst (CSS: hyphens: manual).
// Nur im Text, nie in Attributen.
const SCHUETZEN = /Google Maps(?![^<]*>)/g;

export default function layout(ctx, inhalt) {
  const { praxis, esc, seite } = ctx;
  inhalt = inhalt.replace(SCHUETZEN, '<span class="wort">$&</span>');

  // Schlichte Seite ohne Kopf, Navigation oder Fuß – etwa die Zwischenseite
  // der Terminbuchung, solange sie noch eingerichtet wird.
  if (seite.minimal) {
    return `<html lang="de">
<head>
${ctx.kopf()}
<link rel="stylesheet" href="assets/css/stil.css">
${ctx.favicons()}
</head>
<body class="minimalseite">
<main id="inhalt" class="minimalseite-flaeche">
${inhalt}
</main>
</body>
</html>`;
  }

  const t = praxis.telefon;
  const a = praxis.adresse;
  const jahr = ctx.website.stand.slice(0, 4);

  const navPunkte = ctx.seiten
    .filter((s) => s.menue)
    .map((s) => `<li><a href="${s.datei}"${ctx.aktiv(s.nav)}>${esc(s.menue)}</a></li>`)
    .join('\n');

  return `<html lang="de">
<head>
${ctx.kopf()}
<script>document.documentElement.classList.add('js')</script>
<link rel="preload" href="assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/stil.css">
${ctx.favicons()}
<script src="assets/js/seite.js" defer></script>
</head>
<body>
<a class="sprunglink" href="#inhalt">Zum Inhalt springen</a>

<header class="kopf">
<div class="kopf-innen">
<a class="marke" href="index.html">
<img class="marke-bild" src="assets/logo/logo-marke.svg" alt="" width="74" height="44">
<span class="marke-text"><span class="marke-name">${esc(praxis.aerztin)}</span><span class="marke-zusatz">${esc(praxis.fachrichtung)}<span class="marke-ort"> · ${esc(praxis.ort)}</span></span></span>
</a>
<div class="kopf-aktionen">
<a class="kopf-telefon" href="${t.href}">${symbol('telefon')}<span class="kopf-telefon-lang"><span class="kopf-telefon-label">Telefon</span> <span class="kopf-telefon-nummer">${esc(t.anzeige)}</span></span><span class="kopf-telefon-kurz">Anrufen</span></a>
${terminKnopf(ctx, { klasse: 'knopf kopf-termin' })}
</div>
<button class="menue-knopf" type="button" aria-expanded="false" aria-controls="hauptmenue">${symbol('menue', 'menue-auf')}${symbol('schliessen', 'menue-zu')}<span>Menü</span></button>
<nav class="hauptnav" aria-label="Hauptnavigation">
<ul class="hauptnav-liste" id="hauptmenue">
${navPunkte}
</ul>
</nav>
</div>
</header>

<main id="inhalt">
${inhalt}
</main>

<footer class="fuss">
<div class="fuss-kopf raster">
<p class="fuss-leitsatz">Sorgfältig untersuchen, verständlich erklären.</p>
${terminKnopf(ctx, { aktuell: false })}
</div>
<div class="fuss-spalten raster">
<div class="fuss-spalte">
<h2 class="fuss-titel">Praxis</h2>
<p class="fuss-marke"><span class="fuss-marke-bild" aria-hidden="true"></span><span><strong>${esc(praxis.aerztin)}</strong><br>${esc(praxis.fachrichtung)}</span></p>
<address>${esc(a.strasse)}<br>${esc(a.plz)} ${esc(a.stadt)}</address>
</div>
<div class="fuss-spalte">
<h2 class="fuss-titel">Sprechzeiten</h2>
${sprechzeitenKompakt(ctx)}
</div>
<div class="fuss-spalte">
<h2 class="fuss-titel">Kontakt</h2>
<p class="fuss-zeile">${symbol('telefon')}<a class="fuss-telefon" href="${t.href}"><span class="unsichtbar">Telefon </span>${esc(t.anzeige)}</a></p>
<p class="fuss-zeile"><a class="fuss-link" href="kontakt.html">Alle Kontaktwege</a></p>
</div>
<div class="fuss-spalte">
<h2 class="fuss-titel">Anfahrt</h2>
<p>${symbol('bus', 'fuss-symbol')}Bus bis Haltestelle ${esc(ctx.anfahrt.haltestelle)}</p>
<p>${symbol('parken', 'fuss-symbol')}Das Innenstadt-Parkhaus ist gesperrt.</p>
<p class="fuss-zeile"><a class="fuss-link" href="kontakt.html#parken">Parkplätze in der Nähe</a></p>
</div>
</div>
<div class="fuss-unten">
<div class="raster fuss-unten-innen">
<nav class="fuss-recht" aria-label="Rechtliches">
<ul>
<li><a href="impressum.html"${ctx.aktiv('impressum')}>Impressum</a></li>
<li><a href="datenschutz.html"${ctx.aktiv('datenschutz')}>Datenschutz</a></li>
</ul>
</nav>
<p class="fuss-copy">© ${esc(jahr)} ${esc(praxis.praxisname)}</p>
</div>
</div>
</footer>
</body>
</html>`;
}
