// Leistungen: alle 53 Punkte in fünf Bereichen, auf jeder Breite vollständig sichtbar.
import { icon, seitenkopf, sprungliste, terminKnopf, telefonKnopf, notfallWege, BEREICHE, anzahl } from '../bausteine.mjs';

export const seite = {
  datei: 'leistungen.html',
  nav: 'leistungen',
  menue: 'Leistungen',
  titel: 'Leistungen – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung: 'Vorsorge, apparative Diagnostik wie OCT, Laserbehandlung beim Nachstar, Führerscheingutachten und Notfälle: alle Leistungen der Augenarztpraxis in Schleswig.',
};

export default function inhalt(ctx) {
  const bloecke = ctx.leistungen.map((b, i) => {
    const nr = String(i + 1).padStart(2, '0');
    const notfall = b.id === 'notfaelle';
    return `
<section class="bereich${i % 2 ? ' bereich--schilf' : ''}${notfall ? ' bereich--notfall' : ''}" id="${b.id}" aria-labelledby="${b.id}-titel">
  <div class="rahmen bereich__raster">
    <div class="bereich__kopf">
      <p class="bereich__marke" aria-hidden="true"><span class="bereich__nr">${nr}</span>${icon(BEREICHE[b.id].icon, 'icon icon--gross')}</p>
      <h2 id="${b.id}-titel">${b.titel}</h2>
      <p>${b.einleitung}</p>
      <p class="bereich__anzahl">${anzahl(b.punkte.length, b.id)}</p>
    </div>
    <div class="bereich__inhalt">
      <ul class="punkte">
        ${b.punkte.map((p) => `<li>${p}</li>`).join('\n        ')}
      </ul>
    </div>
  </div>
  ${notfall ? `<div class="rahmen bereich__notfall">
    <h3>So erreichen Sie schnell Hilfe</h3>
    ${notfallWege(ctx, 'h4')}
  </div>` : ''}
</section>`;
  }).join('\n');

  const sprung = sprungliste('Leistungsbereiche', ctx.leistungen.map((b) => [b.id, b.titel, BEREICHE[b.id].icon]));

  return `
${seitenkopf({
  dach: 'Leistungen',
  titel: 'Unsere Leistungen',
  einleitung: `${ctx.leistungenEinleitung} Auf dieser Seite finden Sie alle Untersuchungen und Behandlungen, die wir anbieten, geordnet in fünf Bereiche.`,
  sprung,
})}
${bloecke}

<section class="abschnitt abschnitt--wasser" aria-labelledby="fragen-titel">
  <div class="rahmen aufruf">
    <div>
      <h2 id="fragen-titel">Fragen zu einer Untersuchung?</h2>
      <p>Rufen Sie uns an. Wir sagen Ihnen gern, was bei Ihrem Termin auf Sie zukommt und was Sie mitbringen sollten.</p>
    </div>
    <div class="knopfreihe">
      ${terminKnopf(ctx)}
      ${telefonKnopf(ctx)}
    </div>
  </div>
</section>
`;
}
