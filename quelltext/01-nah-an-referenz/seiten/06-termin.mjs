// Termin – Zwischenseite, solange die Online-Terminbuchung noch entsteht.
// Jede Termin-Schaltfläche führt hierher, bis in quelltext/gemeinsam/website.mjs
// eine externe Adresse unter `terminUrl` eingetragen ist. Dann zeigt diese Seite
// automatisch einen Link zur Online-Buchung.

import { zeitenTabelle, terminLink } from '../bausteine.mjs';
import { website } from '../../gemeinsam/website.mjs';

// Die Beschreibung folgt dem Termin-Ziel, sobald die Online-Buchung eingetragen ist.
const extern = /^https?:\/\//i.test(website.terminUrl);

export const seite = {
  datei: 'termin.html',
  titel: 'Termin vereinbaren – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung: extern
    ? 'So vereinbaren Sie einen Termin in der Augenarztpraxis Dr. med. Vera Christoph in Schleswig: online oder telefonisch.'
    : 'So vereinbaren Sie einen Termin in der Augenarztpraxis Dr. med. Vera Christoph in Schleswig: telefonisch, am besten während der Sprechzeiten.',
  nav: 'termin',
  karte: false,
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;

  const einleitung = ctx.termin.extern
    ? `<p class="abschnitt-lead">Ihren Termin können Sie jetzt auch online buchen. Die Terminbuchung öffnet sich in einem neuen Fenster. Telefonisch erreichen Sie uns wie gewohnt.</p>
    <p class="termin-aktion">${terminLink(ctx, 'knopf knopf-gross', 'Zur Online-Terminbuchung')}</p>`
    : `<p class="abschnitt-lead">Unsere Online-Terminbuchung entsteht gerade. Bis sie bereitsteht, vereinbaren Sie Ihren Termin bitte telefonisch – wir finden gemeinsam einen passenden Zeitpunkt.</p>`;

  return `
  <section class="abschnitt abschnitt-erster termin" aria-labelledby="termin-titel">
    ${ctx.termin.extern ? '' : '<img class="termin-bild" src="assets/bilder/icon-kalender.svg" alt="" width="96" height="96">'}
    <h1 id="termin-titel" class="abschnitt-titel">Termin vereinbaren</h1>
    ${einleitung}
    <p class="termin-aktion"><a class="knopf knopf-gross" href="${praxis.telefon.href}">Anrufen: ${esc(praxis.telefon.anzeige)}</a></p>
    <p class="termin-klein">Telefonisch erreichen Sie uns am besten während unserer Sprechzeiten:</p>
    ${zeitenTabelle(ctx, { klasse: 'zeiten-kompakt' })}
    <p class="zeiten-zusatz">${esc(praxis.sprechzeitenZusatz)}</p>
  </section>

  <section class="abschnitt termin-tipps" aria-labelledby="tipps-titel">
    <h2 id="tipps-titel" class="abschnitt-titel abschnitt-titel-klein">Gut zu wissen</h2>
    <ul class="tipps">
      <li><strong>Was Sie mitbringen:</strong> Gesundheitskarte, gegebenenfalls Überweisung, Brille und Vorbefunde. <a href="wichtige-infos.html">Alle Hinweise für Ihren Besuch</a></li>
      <li><strong>Bei akuten Beschwerden</strong> wie plötzlicher Sehverschlechterung oder einer Verletzung rufen Sie bitte sofort an. Außerhalb der Sprechzeiten: ärztlicher Bereitschaftsdienst <a href="tel:116117">116 117</a>, bei Lebensgefahr Notruf <a href="tel:112">112</a>.</li>
      <li><strong>Anfahrt:</strong> Das Innenstadt-Parkhaus ist gesperrt. <a href="kontakt.html#parken">So finden Sie einen Parkplatz</a></li>
    </ul>
  </section>`;
}
