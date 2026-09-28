// Kontakt: Kontaktwege, Anschrift, Karte (erst nach Klick), ausführlicher
// Parkhinweis mit Faltblatt der Stadt Schleswig, Bus und Park-and-Ride.

import { praxis } from '../../gemeinsam/praxis.mjs';
import {
  symbol, seitenkopf, abschnitt, terminKnopf, karte, parkListe, parkName,
  faltblattLink, faltblattQuelle, externerLink,
} from '../bausteine.mjs';

export const seite = {
  datei: 'kontakt.html',
  titel: `Kontakt und Anfahrt – Augenarztpraxis ${praxis.aerztin}, ${praxis.ort}`,
  beschreibung: `Telefon ${praxis.telefon.anzeige}, ${praxis.adresseEinzeilig}. Anfahrt mit Bus und Auto, Parkplätze in der Nähe, seit das Innenstadt-Parkhaus gesperrt ist.`,
  nav: 'kontakt',
  menue: 'Kontakt',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const p = ctx.praxis;
  const a = p.adresse;
  const l = ctx.anfahrt.links;

  const alleParkplaetze = `<details class="aufklapper">
<summary>Weitere Parkplätze in Gehweite (${ctx.parkplaetze.length} aus dem Faltblatt)</summary>
<ul class="park-liste park-liste-alle">
${ctx.parkplaetze.map((x) => `<li><span class="park-nr">${esc(x.nr)}</span><span><strong>${esc(parkName(x))}</strong><br>${esc(x.adresse)} · ${esc(x.art)}${/überdacht/.test(x.name) ? ', überdacht' : ''}</span></li>`).join('\n')}
</ul>
</details>`;

  return `
${seitenkopf({
  stichwort: 'Kontakt',
  titel: 'Kontakt und Anfahrt',
  einleitung: 'Am schnellsten erreichen Sie uns telefonisch während der Sprechzeiten. Hier finden Sie außerdem den Weg zur Praxis und aktuelle Hinweise zum Parken in der Innenstadt.',
})}

${abschnitt({
  id: 'kontaktwege',
  stichwort: 'Kontaktwege',
  titel: 'So erreichen Sie uns',
  inhalt: `<dl class="kontaktwege">
<div><dt>${symbol('telefon')}Telefon</dt><dd><a class="gross-link" href="${p.telefon.href}">${esc(p.telefon.anzeige)}</a><span class="kontaktwege-notiz">während der <a href="sprechzeiten.html">Sprechzeiten</a></span></dd></div>
<div><dt>${symbol('kalender')}Termin</dt><dd>${ctx.termin.extern ? 'Online oder telefonisch' : 'Telefonisch'}<span class="kontaktwege-link">${terminKnopf(ctx, { klasse: 'knopf knopf-zweit knopf-klein' })}</span></dd></div>
</dl>`,
})}

${abschnitt({
  id: 'anschrift',
  stichwort: 'Anschrift',
  titel: 'Hier finden Sie uns',
  inhalt: `<div class="text">
<address class="anschrift-gross">${esc(p.praxisname)}<br>${esc(a.strasse)}<br>${esc(a.plz)} ${esc(a.stadt)}</address>
<p>${esc(ctx.anfahrt.lage)}</p>
<p><strong>Zugang zur Praxis:</strong> ${ctx.angabe('barrierefreiheit')}</p>
</div>
${karte(ctx)}`,
})}

${abschnitt({
  id: 'parken',
  stichwort: 'Mit dem Auto',
  rand: `<p class="merksatz">${symbol('parken', 'symbol-gross')}<span>Innenstadt-Parkhaus gesperrt – Neubau voraussichtlich 2028</span></p>`,
  titel: 'Parken in der Nähe der Praxis',
  inhalt: `<div class="hinweis hinweis-parken">
${symbol('parken', 'hinweis-symbol')}
<div class="hinweis-inhalt">
<h3 class="hinweis-titel">Bitte planen Sie etwas mehr Zeit ein</h3>
<p>${esc(ctx.anfahrt.parkhausGesperrt)}</p>
</div>
</div>
<h3>Empfehlungen in Gehweite</h3>
<p>Die Nummern entsprechen der Karte im Faltblatt der Stadt Schleswig. ${esc(ctx.anfahrt.kurzparken)}</p>
${parkListe(ctx, 'park-liste park-liste-gross')}
${alleParkplaetze}
<h3>Park-and-Ride</h3>
<p>${esc(ctx.anfahrt.parkAndRide)} Die Busse halten an der Haltestelle ${esc(ctx.anfahrt.haltestelle)}.</p>
<div class="faltblatt">
${faltblattLink(ctx)}
<p class="faltblatt-quelle">${faltblattQuelle(ctx)}</p>
</div>
<p>Weitere aktuelle Informationen der Stadt: ${externerLink(ctx, l.ladenstrasse.href, l.ladenstrasse.text)} · Parkhaus der GEWOBA: ${externerLink(ctx, l.gewoba.href, l.gewoba.text)}</p>`,
})}

${abschnitt({
  id: 'bus',
  stichwort: 'Bus und Bahn',
  titel: 'Mit öffentlichen Verkehrsmitteln',
  inhalt: `<ul class="haken-liste">
<li>${symbol('bus')}<span>${esc(ctx.anfahrt.bus)}</span></li>
<li>${symbol('telefon')}<span>${esc(ctx.anfahrt.smile24)} Mehr unter ${externerLink(ctx, l.smile24.href, l.smile24.text)}.</span></li>
</ul>`,
})}
`;
}
