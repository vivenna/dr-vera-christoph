// Seitenrahmen für Entwurf 3: <head>, Kopf mit Navigation, Fußzeile.
import { icon, markeInline, terminKnopf, sprechzeitenListe } from './bausteine.mjs';

export default function layout(ctx, inhalt) {
  const { praxis, esc } = ctx;

  // Hauptnavigation: alle Seiten mit `menue`-Beschriftung, in Dateireihenfolge
  const menue = ctx.seiten
    .filter((s) => s.menue)
    .map((s) => `<li><a href="${s.datei}"${ctx.aktiv(s.nav)}>${s.menue}</a></li>`)
    .join('\n        ');

  // Praxisname in der Fußzeile an der sinnvollen Stelle umbrechen:
  // „Augenarztpraxis“ / „Dr. med. Vera Christoph“
  const praxisnameZweizeilig = esc(praxis.praxisname).replace(` ${esc(praxis.aerztin)}`, `<br>${esc(praxis.aerztin)}`);

  const fussLinks = ctx.seiten
    .filter((s) => s.menue)
    .map((s) => `<li><a href="${s.datei}"${ctx.aktiv(s.nav)}>${s.menue}</a></li>`)
    .join('\n            ');

  return `<html lang="de">
<head>
${ctx.kopf()}
<script>document.documentElement.classList.add('js')</script>
<link rel="preload" href="assets/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/literata-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/stil.css">
${ctx.favicons()}
<script src="assets/js/seite.js" defer></script>
</head>
<body class="seite-${ctx.seite.nav ?? 'sonstige'}">
<a class="sprunglink" href="#inhalt">Zum Inhalt springen</a>

<header class="kopf">
  <div class="rahmen kopf__zeile">
    <a class="kopf__marke" href="index.html">
      <img src="assets/logo/logo-marke.svg" alt="" width="120" height="76">
      <span class="kopf__name">
        <span class="kopf__praxis">Dr. med. Vera Christoph</span>
        <span class="kopf__fach">Augenärztin in Schleswig</span>
      </span>
      <span class="nur-sr">– zur Startseite</span>
    </a>
    <button class="menue-knopf" type="button" aria-expanded="false" aria-controls="hauptmenue">
      ${icon('menue', 'icon icon--auf')}${icon('schliessen', 'icon icon--zu')}<span>Menü</span>
    </button>
    <div class="kopf__aktionen">
      <a class="knopf knopf--rand kopf__telefon" href="${praxis.telefon.href}">${icon('telefon')}<span class="kopf__tel-kurz">Anrufen</span><span class="kopf__tel-lang"><span class="nur-sr">Telefon: </span>${esc(praxis.telefon.anzeige)}</span></a>
      ${terminKnopf(ctx, 'knopf knopf--voll kopf__termin')}
    </div>
  </div>
  <nav class="hauptnav" id="hauptmenue" aria-label="Hauptnavigation">
    <div class="rahmen">
      <ul class="hauptnav__liste" role="list">
        ${menue}
      </ul>
    </div>
  </nav>
</header>

<main id="inhalt" tabindex="-1">
${inhalt}
</main>

<footer class="fuss">
  <div class="fuss__wasser" aria-hidden="true"><span></span><span></span><span></span></div>
  <div class="rahmen fuss__raster">
    <div class="fuss__praxis">
      ${markeInline('fuss__marke')}
      <h2 class="fuss__titel">${praxisnameZweizeilig}</h2>
      <p>${esc(praxis.fachrichtung)}</p>
      <address>
        ${esc(praxis.adresse.strasse)}<br>
        ${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}
      </address>
      <p class="fuss__telefon"><a href="${praxis.telefon.href}">${icon('telefon')}<span><span class="nur-sr">Telefon: </span>${esc(praxis.telefon.anzeige)}</span></a></p>
    </div>

    <div class="fuss__zeiten">
      <h2 class="fuss__titel">Sprechzeiten</h2>
      ${sprechzeitenListe(ctx, 'zeitliste zeitliste--fuss')}
    </div>

    <div class="fuss__notfall">
      <h2 class="fuss__titel">Im Notfall</h2>
      <p>Außerhalb der Sprechzeiten: ärztlicher Bereitschaftsdienst</p>
      <p class="fuss__nummer"><a href="tel:116117">${icon('telefon')}<span>116 117</span></a></p>
      <p>Bei Lebensgefahr: Notruf</p>
      <p class="fuss__nummer"><a href="tel:112">${icon('telefon')}<span>112</span></a></p>
    </div>

    <nav class="fuss__nav" aria-label="Seiten und Rechtliches">
      <h2 class="fuss__titel">Seiten</h2>
      <ul role="list">
            ${fussLinks}
            <li><a href="${ctx.termin.href}"${ctx.termin.attribute}${ctx.termin.extern ? '' : ctx.aktiv('termin')}>Termin vereinbaren${ctx.termin.extern ? '<span class="nur-sr"> (öffnet in neuem Fenster)</span>' : ''}</a></li>
            <li><a href="impressum.html"${ctx.aktiv('impressum')}>Impressum</a></li>
            <li><a href="datenschutz.html"${ctx.aktiv('datenschutz')}>Datenschutz</a></li>
      </ul>
    </nav>
  </div>
</footer>
</body>
</html>`;
}
