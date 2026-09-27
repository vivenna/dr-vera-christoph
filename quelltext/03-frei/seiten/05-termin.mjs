// Termin: Zwischenseite, solange die Online-Terminbuchung entsteht.
import { icon, dachzeile, sprechzeitenListe } from '../bausteine.mjs';
import { praxis as p } from '../../gemeinsam/praxis.mjs';
import { website } from '../../gemeinsam/website.mjs';

// Die Beschreibung folgt dem Termin-Ziel, sobald die Online-Buchung eingetragen ist.
const extern = /^https?:\/\//i.test(website.terminUrl);

export const seite = {
  datei: 'termin.html',
  nav: 'termin',
  titel: 'Termin vereinbaren – Augenarztpraxis Dr. Christoph, Schleswig',
  beschreibung: extern
    ? `Termine in der Augenarztpraxis ${p.aerztin} buchen Sie online oder vereinbaren sie telefonisch unter ${p.telefon.anzeige}.`
    : `Termine in der Augenarztpraxis ${p.aerztin} vereinbaren Sie telefonisch unter ${p.telefon.anzeige}. Die Online-Terminbuchung ist in Vorbereitung.`,
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;

  const einleitung = ctx.termin.extern
    ? 'Ihren Termin können Sie jetzt auch online buchen. Wenn Sie lieber mit uns sprechen, rufen Sie uns einfach an.'
    : 'Unsere Online-Terminbuchung wird gerade eingerichtet. Bis sie bereitsteht, vereinbaren Sie Ihren Termin bitte telefonisch – wir finden gemeinsam einen passenden Zeitpunkt.';

  const online = ctx.termin.extern
    ? `<p class="knopfreihe"><a class="knopf knopf--voll" href="${ctx.termin.href}"${ctx.termin.attribute}>${icon('extern')}<span>Zur Online-Terminbuchung<span class="nur-sr"> (öffnet in neuem Fenster)</span></span></a></p>`
    : '';

  return `
<section class="abschnitt termin" aria-labelledby="termin-titel">
  <div class="rahmen termin__raster">
    <div class="termin__text">
      ${dachzeile('Termin')}
      <h1 id="termin-titel">Termin vereinbaren</h1>
      <p class="einleitung">${einleitung}</p>
      ${online}
      <div class="telefonkarte">
        <h2>${icon('telefon')}<span>Rufen Sie uns an</span></h2>
        <p class="telefonkarte__nummer">${ctx.telefonLink()}</p>
        <p>Am besten erreichen Sie uns während der Sprechzeiten:</p>
        ${sprechzeitenListe(ctx, 'zeitliste zeitliste--karte')}
      </div>
    </div>
    <div class="termin__seite">
      <img class="termin__bild" src="assets/bilder/kalender.svg" alt="" width="360" height="300">
      <h2>Gut zu wissen</h2>
      <ul class="gutzuwissen" role="list">
        <li>${icon('notfall')}<p><strong>Akute Beschwerden?</strong> Bei plötzlicher Sehverschlechterung, Lichtblitzen oder einer Verletzung rufen Sie bitte sofort an. Außerhalb der Sprechzeiten: <a href="tel:116117">116 117</a>, bei Lebensgefahr <a href="tel:112">112</a>.</p></li>
        <li>${icon('karte')}<p><strong>Was Sie mitbringen:</strong> Versichertenkarte, eine Überweisung (falls vorhanden), Ihre Brille und Vorbefunde. <a href="besuch.html#mitbringen">Die ganze Liste</a></p></li>
        <li>${icon('ort')}<p><strong>Anfahrt:</strong> ${esc(praxis.adresseEinzeilig)}. Das Innenstadt-Parkhaus ist gesperrt, <a href="kontakt.html#parken">hier finden Sie Alternativen</a>.</p></li>
      </ul>
    </div>
  </div>
</section>
`;
}
