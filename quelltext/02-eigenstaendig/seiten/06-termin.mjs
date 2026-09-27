// Termin: Zwischenseite, solange die Online-Terminbuchung noch entsteht.
// Sobald in quelltext/gemeinsam/website.mjs eine externe `terminUrl` steht,
// zeigt diese Seite automatisch einen Link zur Buchung (ctx.termin.extern).

import { praxis } from '../../gemeinsam/praxis.mjs';
import { website } from '../../gemeinsam/website.mjs';

// Die Beschreibung folgt dem Termin-Ziel, sobald die Online-Buchung eingetragen ist.
const extern = /^https?:\/\//i.test(website.terminUrl);
import { symbol, seitenkopf, abschnitt, sprechzeitenKompakt, notfallKacheln } from '../bausteine.mjs';

export const seite = {
  datei: 'termin.html',
  titel: `Termin vereinbaren – Augenarztpraxis ${praxis.aerztin}, ${praxis.ort}`,
  beschreibung: extern
    ? `Termin in der Augenarztpraxis ${praxis.aerztin}: online buchen oder telefonisch unter ${praxis.telefon.anzeige} vereinbaren.`
    : `Termin in der Augenarztpraxis ${praxis.aerztin}: telefonisch unter ${praxis.telefon.anzeige}. Die Online-Terminbuchung ist in Vorbereitung.`,
  nav: 'termin',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const t = ctx.praxis.telefon;

  const einleitung = ctx.termin.extern
    ? 'Ihren Termin können Sie online buchen. Wenn Ihnen das Telefon lieber ist, rufen Sie uns während der Sprechzeiten einfach an.'
    : 'Unsere Online-Terminbuchung entsteht gerade. Bis sie fertig ist, vereinbaren Sie Ihren Termin bitte telefonisch – wir sind während der Sprechzeiten gern für Sie da.';

  const buchung = ctx.termin.extern
    ? `<p><a class="knopf knopf-gross" href="${ctx.termin.href}"${ctx.termin.attribute}>Zur Online-Terminbuchung<span class="unsichtbar"> (öffnet in neuem Fenster)</span></a></p>`
    : '';

  return `
${seitenkopf({
  stichwort: ctx.termin.extern ? 'Online und telefonisch' : 'Online-Buchung in Vorbereitung',
  titel: 'Termin vereinbaren',
  einleitung,
  rand: symbol('kalender', 'symbol-bild'),
  zusatz: `${buchung}
<div class="anruf-karte">
<p class="anruf-titel">Rufen Sie uns an</p>
<p><a class="knopf knopf-gross" href="${t.href}">${symbol('telefon')}<span>${esc(t.anzeige)}</span></a></p>
<p class="anruf-notiz">Auf dem Telefon genügt ein Tipp auf die Nummer.</p>
</div>`,
})}

${abschnitt({
  id: 'zeiten',
  stichwort: 'Sprechzeiten',
  titel: 'Wann Sie uns erreichen',
  inhalt: `<div class="zweiteilig">
<div class="text">
${sprechzeitenKompakt(ctx, { klasse: 'zeiten-kompakt zeiten-gross' })}
<p><a class="mehr-link" href="sprechzeiten.html">Alle Sprechzeiten als Tabelle${symbol('pfeil')}</a></p>
</div>
<div class="kasten">
<h3>Halten Sie beim Anruf bereit</h3>
<ul class="haken-liste">
<li>${symbol('karte')}<span>Ihre Versichertenkarte</span></li>
<li>${symbol('dokument')}<span>eine Überweisung, falls vorhanden</span></li>
<li>${symbol('auge')}<span>kurz den Anlass: Vorsorge, Kontrolle oder neue Beschwerden</span></li>
</ul>
</div>
</div>`,
})}

${abschnitt({
  id: 'akut',
  stichwort: 'Akute Beschwerden',
  titel: 'Wenn es nicht warten kann',
  inhalt: `<p>Bei plötzlichen Sehstörungen, starken Schmerzen oder einer Verletzung am Auge rufen Sie uns bitte sofort an – nicht erst über die Terminbuchung.</p>
${notfallKacheln(ctx)}`,
})}
`;
}
