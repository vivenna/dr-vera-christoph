// Leistungen: oben die fünf Bereiche als Sprungziele, darunter jeder Bereich
// mit Nummer und Symbol in der Randspalte (klebt beim Scrollen), Einleitung und
// einer zweispaltigen Liste mit hervorgehobenen Fachbegriffen. Alle 53 Punkte
// stehen auf jeder Bildschirmbreite vollständig da, nichts wird ausgeblendet.

import { praxis } from '../../gemeinsam/praxis.mjs';
import { symbol, bereichSymbol, mitFachbegriffen, seitenkopf, notfallKacheln, terminKnopf, trennen } from '../bausteine.mjs';

export const seite = {
  datei: 'leistungen.html',
  titel: `Leistungen – Augenarztpraxis ${praxis.aerztin}, ${praxis.ort}`,
  beschreibung: 'Vorsorge, apparative Diagnostik wie OCT und Gesichtsfeld, YAG-Laser beim Nachstar, Führerscheingutachten und Hilfe bei Augennotfällen in Schleswig.',
  nav: 'leistungen',
  menue: 'Leistungen',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const nr = (i) => String(i + 1).padStart(2, '0');

  const uebersicht = `<nav class="bereich-nav raster" id="bereiche" aria-label="Leistungsbereiche">
<div class="rand"><p class="stichwort">Die ${ctx.leistungen.length} Bereiche</p></div>
<ol class="bereich-sprung haupt">
${ctx.leistungen
  .map(
    (b, i) => `<li><a href="#${b.id}"><span class="bereich-nr" aria-hidden="true">${nr(i)}</span>${symbol(bereichSymbol[b.id] ?? 'auge', 'symbol-bereich')}<span class="bereich-sprung-titel">${trennen(esc(b.titel))}</span><span class="bereich-anzahl">${b.punkte.length} ${b.id === 'notfaelle' ? 'Anlässe' : 'Leistungen'}</span></a></li>`,
  )
  .join('\n')}
</ol>
</nav>`;

  const bereiche = ctx.leistungen
    .map(
      (b, i) => `<section class="abschnitt raster bereich${b.id === 'notfaelle' ? ' bereich-notfall' : ''}" id="${b.id}" aria-labelledby="${b.id}-titel">
<div class="rand">
<div class="rand-kleber">
<p class="bereich-marke"><span class="bereich-nr" aria-hidden="true">${nr(i)}</span>${symbol(bereichSymbol[b.id] ?? 'auge', 'symbol-bereich')}</p>
<p class="rand-fakt">${b.punkte.length} Leistungen</p>
<p class="hoch"><a class="hoch-link" href="#bereiche">${symbol('hoch')}Zur Übersicht</a></p>
</div>
</div>
<div class="haupt">
<h2 id="${b.id}-titel">${trennen(esc(b.titel))}</h2>
<p class="einleitung-klein">${esc(b.einleitung)}</p>
${b.id === 'notfaelle' ? notfallKacheln(ctx) : ''}
<ul class="leistungsliste">
${b.punkte.map((p) => `<li>${mitFachbegriffen(ctx, p)}</li>`).join('\n')}
</ul>
</div>
</section>`,
    )
    .join('\n\n');

  return `
${seitenkopf({
  stichwort: 'Leistungen',
  titel: 'Untersuchung, Beratung und Behandlung',
  einleitung: esc(ctx.leistungenEinleitung),
  rand: `<p class="rand-fakt"><span class="rand-zahl">${ctx.leistungen.length}</span> Bereiche – von der Vorsorge bis zur Hilfe im Notfall</p>`,
})}

${uebersicht}

${bereiche}

<section class="abschnitt raster abschnitt-schluss" aria-labelledby="fragen-titel">
<div class="rand"><p class="stichwort">Fragen?</p></div>
<div class="haupt">
<h2 id="fragen-titel">Sie sind unsicher, welche Untersuchung Sie brauchen?</h2>
<p>Rufen Sie uns an – wir besprechen gern mit Ihnen, welcher Termin für Ihr Anliegen passt.</p>
<div class="knopf-reihe">
${terminKnopf(ctx)}
<a class="knopf knopf-zweit" href="${ctx.praxis.telefon.href}">${symbol('telefon')}<span>${esc(ctx.praxis.telefon.anzeige)}</span></a>
</div>
</div>
</section>
`;
}
