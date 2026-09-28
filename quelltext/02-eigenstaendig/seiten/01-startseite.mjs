// Startseite: Begrüßung mit Praxiskarte, Sprechzeiten als Wochenleiste,
// Kurzvorstellung, die fünf Leistungsbereiche und der Weg zur Praxis.

import { praxis } from '../../gemeinsam/praxis.mjs';
import {
  symbol, terminKnopf, wochenleiste, parkhinweisKurz, bereichSymbol, abschnitt, trennen,
} from '../bausteine.mjs';

export const seite = {
  datei: 'index.html',
  titel: `Augenarztpraxis ${praxis.aerztin} – Augenärztin in ${praxis.ort}`,
  beschreibung: `Augenarztpraxis ${praxis.aerztin} in der Schleswiger Altstadt: Vorsorge, Diagnostik, Laserbehandlung und Hilfe bei akuten Beschwerden. Telefon ${praxis.telefon.anzeige}.`,
  nav: 'start',
  menue: 'Startseite',
};

// Kurzbeschreibungen der fünf Bereiche für die Übersicht auf der Startseite
const KURZ = {
  vorsorge: 'Sehschärfe, Augendruck, Netzhaut und Sehnerv – gründlich untersucht, auch ohne Beschwerden.',
  diagnostik: 'Genaue Messverfahren wie OCT, Gesichtsfeld- und Hornhautdickenmessung.',
  laser: 'Ambulante Behandlung mit dem YAG-Laser, wenn sich nach einer Star-Operation ein Nachstar bildet.',
  fuehrerschein: 'Sehtest und augenärztliche Bescheinigung für die Fahrerlaubnis.',
  notfaelle: 'Bei welchen Beschwerden Sie sofort anrufen sollten – und wen Sie außerhalb der Sprechzeiten erreichen.',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const p = ctx.praxis;
  const a = p.adresse;

  const terminNotiz = ctx.termin.extern
    ? 'Termine können Sie online buchen oder telefonisch vereinbaren.'
    : 'Ihren Termin vereinbaren Sie bitte telefonisch.';

  return `
<div class="einstieg raster">
<div class="einstieg-text">
<p class="stichwort">Augenarztpraxis ${esc(p.aerztin)}</p>
<h1>Augenheilkunde in der Schleswiger Altstadt</h1>
<p class="einleitung">Willkommen in unserer Praxis! Wir untersuchen, beraten und behandeln Sie bei allen Anliegen rund um Ihre Augen – von der Vorsorge bis zu plötzlichen Beschwerden.</p>
<p>Uns ist wichtig, dass Sie nach Ihrem Termin wissen, wie es um Ihre Augen steht. Deshalb erklären wir Befunde in verständlichen Worten und besprechen mit Ihnen, welche nächsten Schritte sinnvoll sind.</p>
<div class="knopf-reihe">
${terminKnopf(ctx)}
<a class="knopf knopf-zweit" href="leistungen.html">Unsere Leistungen</a>
</div>
<p class="termin-notiz">${symbol('kalender')}<span>${esc(terminNotiz)}</span></p>
</div>
<div class="praxiskarte">
<img class="praxiskarte-marke" src="assets/logo/logo-marke.svg" alt="" width="200" height="119">
<p class="praxiskarte-name">${esc(p.aerztin)}</p>
<p class="praxiskarte-fach">${esc(p.fachrichtung)}</p>
<address class="praxiskarte-adresse">${esc(a.strasse)}<br>${esc(a.plz)} ${esc(a.stadt)}</address>
<p class="praxiskarte-telefon"><a href="${p.telefon.href}"><span class="praxiskarte-tel">Tel.</span> ${esc(p.telefon.anzeige)}</a></p>
</div>
</div>

${abschnitt({
  id: 'sprechzeiten',
  stichwort: 'Sprechzeiten',
  rand: `<p class="rand-text">Am schnellsten erreichen Sie uns telefonisch unter <a href="${p.telefon.href}">${esc(p.telefon.anzeige)}</a>.</p>`,
  titel: 'Sprechzeiten auf einen Blick',
  inhalt: `${wochenleiste(ctx)}
<p class="woche-zusatz">${esc(p.sprechzeitenZusatz)}</p>
<p><a class="mehr-link" href="sprechzeiten.html">Sprechzeiten und Erreichbarkeit${symbol('pfeil')}</a></p>`,
})}

${abschnitt({
  id: 'praxis',
  stichwort: 'Die Praxis',
  titel: `Willkommen bei ${esc(p.aerztin)}`,
  klasse: 'abschnitt-praxis',
  inhalt: `<div class="text">
<p>${esc(p.aerztin)} ist ${esc(p.fachrichtung)} und betreut in ihrer Praxis in der ${esc(a.strasse.replace(/\s+\d.*$/, ''))} Patientinnen und Patienten aus ${esc(p.ort)} und Umgebung.</p>
<p>Ob Vorsorge, neue Brillenwerte, eine Verlaufskontrolle beim grünen Star oder plötzliche Beschwerden: Wir untersuchen sorgfältig, nehmen Ihre Fragen ernst und sagen Ihnen offen, was wir sehen.</p>
<ul class="haken-liste">
<li>${symbol('haken')}<span>Vorsorge und Kontrollen – auch wenn Sie keine Beschwerden haben</span></li>
<li>${symbol('haken')}<span>Verständliche Erklärungen zu Befunden und Behandlung</span></li>
<li>${symbol('haken')}<span>Mitten in der Altstadt, Bushaltestelle ${esc(ctx.anfahrt.haltestelle)} in der Innenstadt</span></li>
</ul>
<p class="unterschrift">${symbol('auge')}<span class="unterschrift-text"><span class="unterschrift-name">${esc(p.aerztin)}</span><span>${esc(p.fachrichtung)}</span></span></p>
</div>`,
})}

${abschnitt({
  id: 'leistungen',
  stichwort: 'Leistungen',
  rand: `<p class="rand-fakt"><span class="rand-zahl">${ctx.leistungen.length}</span> Bereiche – von der Vorsorge bis zur Hilfe im Notfall</p>`,
  titel: 'Was wir für Sie tun',
  inhalt: `<p class="einleitung-klein">${esc(ctx.leistungenEinleitung)}</p>
<ol class="bereiche">
${ctx.leistungen
  .map(
    (b, i) => `<li class="bereich-kachel${b.id === 'notfaelle' ? ' bereich-notfall' : ''}">
<span class="bereich-kopf"><span class="bereich-nr" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${symbol(bereichSymbol[b.id] ?? 'auge', 'symbol-bereich')}</span>
<a class="bereich-link" href="leistungen.html#${b.id}">${trennen(esc(b.titel))}</a>
<span class="bereich-text">${esc(KURZ[b.id] ?? '')}</span>
<span class="bereich-anzahl">${b.punkte.length} ${b.id === 'notfaelle' ? 'Anlässe' : 'Leistungen'}</span>
</li>`,
  )
  .join('\n')}
</ol>`,
})}

${abschnitt({
  id: 'anfahrt',
  stichwort: 'Anfahrt',
  titel: 'So finden Sie zu uns',
  inhalt: `<p>${esc(ctx.anfahrt.lage)}</p>
<dl class="wege">
<div><dt>${symbol('ort')}Anschrift</dt><dd>${esc(a.strasse)}<br>${esc(a.plz)} ${esc(a.stadt)}</dd></div>
<div><dt>${symbol('bus')}Mit dem Bus</dt><dd>${esc(ctx.anfahrt.bus)}</dd></div>
<div><dt>${symbol('auto')}Park-and-Ride</dt><dd>${esc(ctx.anfahrt.parkAndRide)}</dd></div>
</dl>
${parkhinweisKurz(ctx)}
<p><a class="mehr-link" href="kontakt.html">Kontakt, Karte und Anfahrt${symbol('pfeil')}</a></p>`,
})}
`;
}
