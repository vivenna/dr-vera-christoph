// Sprechzeiten: Tabelle, „sowie nach Vereinbarung“, Erreichbarkeit,
// Hilfe außerhalb der Sprechzeiten und ein kurzer Weg zur Praxis.

import { praxis } from '../../gemeinsam/praxis.mjs';
import {
  symbol, seitenkopf, abschnitt, sprechzeitenTabelle, notfallKacheln, parkhinweisKurz, terminKnopf, tageText,
} from '../bausteine.mjs';

export const seite = {
  datei: 'sprechzeiten.html',
  titel: `Sprechzeiten – Augenarztpraxis ${praxis.aerztin}, ${praxis.ort}`,
  beschreibung: `Sprechzeiten der Augenarztpraxis ${praxis.aerztin} in Schleswig, sowie nach Vereinbarung. Telefon ${praxis.telefon.anzeige}, Hilfe außerhalb der Sprechzeiten.`,
  nav: 'sprechzeiten',
  menue: 'Sprechzeiten',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const p = ctx.praxis;
  const a = p.adresse;
  const tage = tageText(ctx, p.sprechzeiten);

  return `
${seitenkopf({
  stichwort: 'Sprechzeiten',
  titel: 'Sprechzeiten',
  einleitung: `Hier sehen Sie, wann wir für Sie da sind. Termine außerhalb dieser Zeiten sind ${esc(p.sprechzeitenZusatz.replace(/^sowie\s+/, ''))} möglich.`,
  rand: `<p class="rand-fakt">${symbol('uhr')}<span>${esc(tage)}</span></p>`,
})}

<section class="abschnitt raster abschnitt-tabelle" aria-labelledby="woche-titel">
<div class="rand">
<p class="stichwort">Wochenübersicht</p>
<p class="rand-text">${ctx.termin.extern ? 'Termine buchen Sie online oder vereinbaren sie telefonisch.' : 'Termine vereinbaren Sie am einfachsten telefonisch.'}</p>
</div>
<div class="haupt">
<h2 id="woche-titel" class="unsichtbar">Sprechzeiten nach Wochentagen</h2>
${sprechzeitenTabelle(ctx, { beschriftung: `Sprechzeiten der Praxis ${p.aerztin}` })}
<p class="zeiten-nachsatz">${symbol('kalender')}<span>${esc(p.sprechzeitenZusatz.charAt(0).toUpperCase() + p.sprechzeitenZusatz.slice(1))}</span></p>
</div>
</section>

${abschnitt({
  id: 'erreichbarkeit',
  stichwort: 'Erreichbarkeit',
  titel: 'So erreichen Sie uns',
  inhalt: `<dl class="kontaktwege">
<div><dt>${symbol('telefon')}Telefon</dt><dd><a class="gross-link" href="${p.telefon.href}">${esc(p.telefon.anzeige)}</a><span class="kontaktwege-notiz">während der Sprechzeiten</span></dd></div>
<div><dt>${symbol('kalender')}Termin</dt><dd>${ctx.termin.extern ? 'Online oder telefonisch' : 'Telefonisch – die Online-Terminbuchung ist in Vorbereitung'}<span class="kontaktwege-link">${terminKnopf(ctx, { klasse: 'knopf knopf-zweit knopf-klein' })}</span></dd></div>
<div><dt>${symbol('brief')}E-Mail</dt><dd>${ctx.email()}</dd></div>
</dl>`,
})}

${abschnitt({
  id: 'ausserhalb',
  stichwort: 'Notfall',
  titel: 'Außerhalb der Sprechzeiten',
  inhalt: `<p>Bei plötzlichen Sehstörungen, starken Schmerzen oder Verletzungen am Auge warten Sie bitte nicht bis zum nächsten Termin.</p>
${notfallKacheln(ctx)}
<p><a class="mehr-link" href="leistungen.html#notfaelle">Woran Sie einen Augennotfall erkennen${symbol('pfeil')}</a></p>`,
})}

${abschnitt({
  id: 'lage',
  stichwort: 'Lage',
  titel: 'Der Weg zur Praxis',
  inhalt: `<p><strong>${esc(a.strasse)}, ${esc(a.plz)} ${esc(a.stadt)}</strong></p>
<p>${esc(ctx.anfahrt.lage)} ${esc(ctx.anfahrt.bus)}</p>
${parkhinweisKurz(ctx)}
<p><a class="mehr-link" href="kontakt.html">Kontakt, Karte und Anfahrt${symbol('pfeil')}</a></p>`,
})}
`;
}
