// Seitenrahmen von Entwurf 1 – nah an der Referenz.
//
// Aufbau wie bei der Referenz: schmaler Infostreifen oben, darunter die
// schwebende Navigation als „Pille“, am Ende eine vollbreite Kartenfläche
// (Zwei-Klick-Lösung) und der farbige Fuß mit Claim und Termin-Schaltfläche.
// Verbessert gegenüber der Referenz: aktive Seite in der Pille markiert,
// Sprunglink, ein gemeinsames Stylesheet, Schrift lokal, Menü ohne JS nutzbar.

import { terminLink, fremdLink, zeitenGruppen } from './bausteine.mjs';

export default function layout(ctx, inhalt) {
  const { praxis, esc, seite } = ctx;

  // Schlichte Seite ohne Kopf, Navigation, Karte oder Fuß – etwa die
  // Zwischenseite der Terminbuchung, solange sie noch eingerichtet wird.
  if (seite.minimal) {
    return `<html lang="de">
<head>
${ctx.kopf()}
<link rel="stylesheet" href="assets/css/stil.css">
${ctx.favicons()}
</head>
<body class="seite-${esc(seite.datei.replace('.html', ''))} minimalseite">
<main id="inhalt" class="minimalseite-flaeche">
${inhalt}
</main>
</body>
</html>`;
  }

  // Hauptnavigation in der Reihenfolge der Seitendateien (NN-name.mjs)
  const menue = ctx.seiten
    .filter((s) => s.navText) // nur Seiten mit Menütext stehen in der Pille
    .map((s) => `        <li><a href="${s.datei}"${ctx.aktiv(s.nav)}>${esc(s.navText)}</a></li>`)
    .join('\n');

  const zeiten = zeitenGruppen(ctx)
    .map((g) => `            <dt>${esc(g.tage)}</dt>\n            <dd>${g.zeiten.map(esc).join('<br>')}</dd>`)
    .join('\n');

  // Vollbreite Kartenfläche direkt über dem Fuß (nicht auf jeder Seite)
  const karte = seite.karte
    ? `
  <section class="karte" aria-label="Karte: Lage der Praxis" data-karte="${esc(ctx.karte.einbettung)}">
    <div class="karte-buehne">
      <img class="karte-deko" src="assets/bilder/karte-flaeche.svg" alt="" width="1440" height="420" loading="lazy">
      <div class="karte-hinweis">
        <p class="karte-adresse">${esc(praxis.adresseEinzeilig)}</p>
        <p>Die Karte stammt von Google Maps und wird erst geladen, wenn Sie auf „Karte laden“ klicken. Mit dem Klick willigen Sie ein, dass Ihre IP-Adresse an Google übertragen wird. Mehr dazu in der <a href="datenschutz.html#karte">Datenschutzerklärung</a>.</p>
        <div class="karte-aktionen">
          <button type="button" class="knopf karte-laden">Karte laden</button>
          ${fremdLink(esc(ctx.karte.link), 'Karte bei Google Maps öffnen', 'link-gross')}
        </div>
      </div>
    </div>
    <p class="karte-quelle" hidden>
      <span class="karte-quelle-adresse">${esc(praxis.adresseEinzeilig)}</span>
      ${fremdLink(esc(ctx.karte.link), 'Karte bei Google Maps öffnen', 'link-gross')}
      <span class="karte-quelle-hinweis">Kartendaten ${fremdLink(esc(ctx.karte.lizenzLink), esc(ctx.karte.quellenhinweis), 'link-gross')}</span>
    </p>
  </section>`
    : '';

  return `<html lang="de">
<head>
${ctx.kopf()}
<script>document.documentElement.classList.add('js')</script>
<link rel="preload" href="assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/stil.css">
<script src="assets/js/seite.js" defer></script>
${ctx.favicons()}
</head>
<body class="seite-${esc(seite.datei.replace('.html', ''))}">
<a class="sprunglink" href="#inhalt">Zum Inhalt springen</a>

<header class="kopf">
  <div class="streifen">
    <a class="marke" href="index.html">
      <img src="assets/logo/logo-marke.svg" alt="" width="84" height="50">
      <span class="marke-text"><span class="marke-name">${esc(praxis.aerztin)}</span> <span class="marke-zusatz">Augenarztpraxis in ${esc(praxis.ort)}</span></span>
    </a>
    <p class="streifen-info">
      <a class="streifen-tel" href="${praxis.telefon.href}"><span class="streifen-bez">Tel.</span> ${esc(praxis.telefon.anzeige)}</a>
      <span class="streifen-adresse">${esc(praxis.adresseEinzeilig)}</span>
    </p>
    ${terminLink(ctx, 'knopf streifen-termin')}
    <button type="button" class="menue-knopf" aria-expanded="false" aria-controls="hauptmenue">
      <span class="menue-symbol" aria-hidden="true"></span><span class="menue-text">Menü</span>
    </button>
  </div>
  <nav class="pille" id="hauptmenue" aria-label="Hauptnavigation">
    <ul class="pille-liste">
${menue}
    </ul>
    <p class="pille-kontakt">Telefon: ${ctx.telefonLink('link-gross')}</p>
  </nav>
</header>

<main id="inhalt">
${inhalt}
${karte}
</main>

<footer class="fuss">
  <div class="fuss-marke" aria-hidden="true"></div>
  <div class="fuss-innen">
    <div class="fuss-aufruf">
      <p class="fuss-claim"><span class="fuss-claim-zeile">Aufmerksam für Ihre Augen&nbsp;–</span> <span class="fuss-claim-zeile">mitten in ${esc(praxis.ort)}</span></p>
      ${terminLink(ctx, 'knopf knopf-hell')}
    </div>
    <div class="fuss-spalten">
      <div class="fuss-block">
        <h2>Kontakt</h2>
        <p>Telefon: ${ctx.telefonLink('link-gross')}</p>
        <address>${esc(praxis.aerztin)}<br>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</address>
      </div>
      <div class="fuss-block">
        <h2>Sprechzeiten</h2>
        <dl class="fuss-zeiten">
${zeiten}
        </dl>
        <p>${esc(praxis.sprechzeitenZusatz)}</p>
      </div>
      <nav class="fuss-recht" aria-label="Rechtliches">
        <ul>
          <li><a href="impressum.html"${ctx.aktiv('impressum')}>Impressum</a></li>
          <li><a href="datenschutz.html"${ctx.aktiv('datenschutz')}>Datenschutzerklärung</a></li>
        </ul>
      </nav>
    </div>
  </div>
</footer>
</body>
</html>`;
}
