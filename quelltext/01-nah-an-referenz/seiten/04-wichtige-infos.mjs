// Wichtige Infos – wie bei der Referenz als Icon-Zeilen: großes Symbol links,
// fettes Stichwort und Text rechts. Symbole sind eigene SVGs (statt Google
// Material Icons). Keine Karte auf dieser Seite, wie in der Referenz.
// Keine erfundenen Praxisregeln – nur allgemein gültige Hinweise.

import { symbol, terminLink } from '../bausteine.mjs';

export const seite = {
  datei: 'wichtige-infos.html',
  titel: 'Wichtige Infos für Ihren Besuch – Augenarztpraxis Dr. med. Vera Christoph',
  beschreibung:
    'Was Sie zum Termin mitbringen, warum Sie nach dem Erweitern der Pupillen nicht selbst fahren sollten und was im Notfall am Auge zu tun ist.',
  nav: 'infos',
  navText: 'Wichtige Infos',
  karte: false,
};

export default function inhalt(ctx) {
  const termin = ctx.termin.extern
    ? `Ihren Termin können Sie online buchen oder telefonisch unter ${ctx.telefonLink()} vereinbaren.`
    : `Ihren Termin vereinbaren Sie bitte telefonisch unter ${ctx.telefonLink()}.`;

  const zeilen = [
    ['karte', 'Versichertenkarte und Überweisung:', 'Bitte bringen Sie Ihre Gesundheitskarte (Versichertenkarte) mit und, falls vorhanden, Ihre Überweisung.'],
    ['dokument', 'Befunde und Medikamente:', 'Vorbefunde, Arztbriefe und Ihr aktueller Medikamentenplan helfen uns, Ihre Augen im Zusammenhang zu beurteilen.'],
    ['brille', 'Brille und Kontaktlinsen:', 'Bringen Sie Ihre aktuelle Brille mit, bei Kontaktlinsen bitte auch den Kontaktlinsen-Pass.'],
    ['tropfen', 'Pupillen erweitern:', 'Für manche Untersuchungen des Augenhintergrunds erweitern wir die Pupillen mit Augentropfen. Danach sehen Sie für mehrere Stunden unscharf und sind blendempfindlich. Bringen Sie deshalb am besten eine Sonnenbrille mit.'],
    ['auto', 'Nicht selbst fahren:', 'Nach dem Erweitern der Pupillen sind Sie für mehrere Stunden nicht fahrtüchtig. Kommen Sie deshalb bitte nicht mit dem eigenen Auto, sondern mit Bus, Taxi oder einer Begleitung.'],
    ['begleitung', 'Begleitung:', 'Eine vertraute Begleitperson ist willkommen, etwa wenn Ihre Pupillen erweitert werden oder Sie Unterstützung auf dem Weg brauchen.'],
    ['telefon', 'Im Notfall:', `Bei einer Verätzung spülen Sie das Auge zuerst sofort mit viel Wasser. Bei plötzlicher Sehverschlechterung, Verletzungen oder Verätzungen rufen Sie uns während der Sprechzeiten bitte umgehend an: ${ctx.telefonLink()}. Außerhalb der Sprechzeiten erreichen Sie den ärztlichen Bereitschaftsdienst unter <a href="tel:116117">116 117</a>, bei Lebensgefahr den Notruf <a href="tel:112">112</a>.`],
    ['kalender', 'Termine:', termin],
  ];

  const liste = zeilen
    .map(([icon, stichwort, text]) => `
    <li class="info-zeile">
      ${symbol(icon, 64, 'info-symbol')}
      <p><strong>${stichwort}</strong> ${text}</p>
    </li>`)
    .join('');

  return `
  <section class="infos abschnitt-erster" aria-labelledby="infos-titel">
    <h1 id="infos-titel" class="abschnitt-titel">Wichtige Infos für Ihren Besuch</h1>
    <p class="abschnitt-lead">Mit ein paar Vorbereitungen verläuft Ihr Termin ruhiger – für Sie und für uns.</p>
    <ul class="info-zeilen">${liste}
    </ul>
    <p class="abschnitt-mehr">${terminLink(ctx)}</p>
  </section>`;
}
