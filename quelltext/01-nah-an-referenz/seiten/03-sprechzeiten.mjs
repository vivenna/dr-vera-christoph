// Sprechzeiten – wie bei der Referenz: große Tabelle mit dünnen Linien,
// darunter „sowie nach Vereinbarung“, danach Erreichbarkeit und Lage als
// ruhige Zweispalten-Liste. Alle Zeiten kommen aus quelltext/gemeinsam/praxis.mjs.

import { zeitenTabelle, terminLink } from '../bausteine.mjs';

export const seite = {
  datei: 'sprechzeiten.html',
  titel: 'Sprechzeiten – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung:
    'Sprechzeiten, telefonische Erreichbarkeit und Anfahrt der Augenarztpraxis Dr. med. Vera Christoph in der Plessenstraße 13 in Schleswig.',
  nav: 'sprechzeiten',
  navText: 'Sprechzeiten',
  karte: true,
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;
  return `
  <section class="abschnitt abschnitt-erster zeiten" aria-labelledby="zeiten-titel">
    <h1 id="zeiten-titel" class="abschnitt-titel">Unsere Sprechzeiten</h1>
    ${zeitenTabelle(ctx)}
    <p class="zeiten-zusatz">${esc(praxis.sprechzeitenZusatz)}</p>
  </section>

  <section class="abschnitt" aria-labelledby="erreichbar-titel">
    <h2 id="erreichbar-titel" class="abschnitt-titel">So erreichen Sie uns</h2>
    <dl class="angaben">
      <div><dt>Telefon</dt><dd>${ctx.telefonLink('link-gross')}</dd></div>
      <div><dt>Termin</dt><dd>${terminLink(ctx, 'link-gross')}</dd></div>
      <div><dt>Adresse</dt><dd>${esc(praxis.adresseEinzeilig)}</dd></div>
      <div><dt>Bus</dt><dd>Haltestelle ${esc(ctx.anfahrt.haltestelle)} – dort halten auch die Park-and-Ride-Busse im 15-Minuten-Takt</dd></div>
      <div><dt>Auto</dt><dd>Kurzzeitparken am SchleiCenter und an der Alten Feuerwache, überdacht im GEWOBA-Parkhaus. Das Innenstadt-Parkhaus ist gesperrt. <a href="kontakt.html#parken">Alle Hinweise zum Parken</a></dd></div>
      <div><dt>Außerhalb der Sprechzeiten</dt><dd>Ärztlicher Bereitschaftsdienst <a href="tel:116117">116 117</a>, bei Lebensgefahr Notruf <a href="tel:112">112</a></dd></div>
    </dl>
  </section>`;
}
