// Kontakt – wie bei der Referenz zwei ruhige Angaben-Listen (Kontaktwege und
// Lage), ergänzt um den ausführlichen Parkhinweis mit dem Faltblatt der Stadt.
// Unbekannte Angaben (E-Mail, Fax, Sprachen, Barrierefreiheit) erscheinen als
// sichtbare Platzhalter und füllen sich automatisch aus gemeinsam/praxis.mjs.

import { terminLink, fremdLink, faltblattLink, symbol } from '../bausteine.mjs';

export const seite = {
  datei: 'kontakt.html',
  titel: 'Kontakt, Anfahrt und Parken – Augenarztpraxis Dr. med. Vera Christoph',
  beschreibung:
    'Telefon, Adresse und Anfahrt der Augenarztpraxis in der Plessenstraße 13, Schleswig – mit Parkhinweisen, weil das Innenstadt-Parkhaus gesperrt ist.',
  nav: 'kontakt',
  navText: 'Kontakt',
  karte: true,
};

export default function inhalt(ctx) {
  const { praxis, esc, anfahrt } = ctx;

  // Die drei am besten erreichbaren Parkplätze stehen ausführlich im Text,
  // die übrigen aus dem Faltblatt als kompakte Liste.
  const empfohlen = ['P5', 'P3', 'P6'];
  const weitere = ctx.parkplaetze
    .filter((p) => !empfohlen.includes(p.nr))
    .map((p) => `        <li><strong>${esc(p.name)}</strong><br>${esc(p.adresse)} · ${esc(p.art)} <span class="parknummer">(${esc(p.nr)} im Faltblatt)</span></li>`)
    .join('\n');

  return `
  <section class="abschnitt abschnitt-erster" aria-labelledby="kontakt-titel">
    <h1 id="kontakt-titel" class="abschnitt-titel">Kontakt</h1>
    <dl class="angaben">
      <div><dt>Telefon</dt><dd>${ctx.telefonLink('link-gross')}</dd></div>
      <div><dt>Telefax</dt><dd>${ctx.fax()}</dd></div>
      <div><dt>E-Mail</dt><dd>${ctx.email()}</dd></div>
      <div><dt>Termin</dt><dd>${terminLink(ctx, 'link-gross')}</dd></div>
      <div><dt>Sprachen</dt><dd>${ctx.angabe('sprachen')}</dd></div>
      <div><dt>Barrierefreiheit</dt><dd>${ctx.angabe('barrierefreiheit')}</dd></div>
    </dl>
  </section>

  <section class="abschnitt" id="anfahrt" aria-labelledby="anfahrt-titel">
    <h2 id="anfahrt-titel" class="abschnitt-titel">Unsere Lage</h2>
    <dl class="angaben">
      <div><dt>Adresse</dt><dd>${esc(praxis.aerztin)}<br>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</dd></div>
      <div><dt>Lage</dt><dd>${esc(anfahrt.lage)}</dd></div>
      <div><dt>Bus</dt><dd>${esc(anfahrt.bus)}</dd></div>
      <div><dt>Park-and-Ride</dt><dd>${esc(anfahrt.parkAndRide)}</dd></div>
      <div><dt>Auf Abruf</dt><dd>${esc(anfahrt.smile24)} Mehr unter ${fremdLink(anfahrt.links.smile24.href, esc(anfahrt.links.smile24.text))}.</dd></div>
    </dl>
  </section>

  <section class="abschnitt parken" id="parken" aria-labelledby="parken-titel">
    <h2 id="parken-titel" class="abschnitt-titel">Parken in der Altstadt</h2>
    <div class="hinweis-kasten">
      ${symbol('parken', 56)}
      <p><strong>Bitte beachten:</strong> ${esc(anfahrt.parkhausGesperrt)}</p>
    </div>
    <div class="parken-spalten">
      <div class="parken-text">
        <h3>Unsere Empfehlung</h3>
        <p>Am nächsten liegen die Kurzzeitparkplätze an der <strong>Alten Feuerwache</strong> (Königstraße 16) und am <strong>SchleiCenter</strong> (Schwarzer Weg 16–18). ${esc(anfahrt.kurzparken)}</p>
        <p>Für längere Aufenthalte eignet sich das überdachte <strong>GEWOBA-Parkhaus</strong> in der Moltkestraße 34 mit E-Ladesäulen.</p>
        <p><strong>Wichtig:</strong> Werden bei Ihrem Termin die Pupillen erweitert, kommen Sie bitte nicht mit dem eigenen Auto. Danach sind Sie für mehrere Stunden nicht fahrtüchtig – nutzen Sie den Bus, ein Taxi oder lassen Sie sich bringen.</p>
        <h3>Das Faltblatt der Stadt</h3>
        <p>Alle Parkplätze der Innenstadt mit Karte hat die Stadt Schleswig in einem Faltblatt zusammengestellt. Herausgeber: ${esc(ctx.faltblatt.herausgeber)}, Stand ${esc(ctx.faltblatt.stand)}.</p>
        <p>${faltblattLink(ctx)}</p>
        <p>Aktuelle Hinweise der Stadt finden Sie unter ${fremdLink(anfahrt.links.ladenstrasse.href, esc(anfahrt.links.ladenstrasse.text))}, Informationen zum GEWOBA-Parkhaus unter ${fremdLink(anfahrt.links.gewoba.href, esc(anfahrt.links.gewoba.text))}.</p>
      </div>
      <div class="parken-liste">
        <h3>Weitere Parkplätze in Gehweite</h3>
        <ul>
${weitere}
        </ul>
      </div>
    </div>
  </section>`;
}
