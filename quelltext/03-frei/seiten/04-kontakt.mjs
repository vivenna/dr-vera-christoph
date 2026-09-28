// Anfahrt und Kontakt: Kontaktwege, Karte (Zwei-Klick), Parken, Bus und Park-and-Ride.
import { icon, anschrift, seitenkopf, sprungliste, terminKnopf } from '../bausteine.mjs';

export const seite = {
  datei: 'kontakt.html',
  nav: 'kontakt',
  menue: 'Anfahrt und Kontakt',
  titel: 'Anfahrt, Parken und Kontakt – Augenarztpraxis Dr. Christoph, Schleswig',
  beschreibung: 'So erreichen Sie die Augenarztpraxis in der Plessenstraße 13 in Schleswig: Telefon, Karte, Parkplätze trotz gesperrtem Parkhaus, Bus und Park-and-Ride.',
};

export default function inhalt(ctx) {
  const { praxis, esc, anfahrt, faltblatt, karte } = ctx;
  const extern = (link, text = link.text) =>
    `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${esc(text)}<span class="nur-sr"> (öffnet in neuem Fenster)</span></a>`;

  // Empfehlungen aus dem Faltblatt: nah, kurz und überdacht
  const empfohlen = ['P3', 'P5', 'P6'];
  const empfehlungen = ctx.parkplaetze.filter((p) => empfohlen.includes(p.nr))
    .sort((a, b) => empfohlen.indexOf(a.nr) - empfohlen.indexOf(b.nr));
  const warum = {
    P3: 'Kurzzeitparken, nah an der Praxis',
    P5: 'Kurzzeitparken, nah an der Praxis',
    P6: 'überdacht, für längere Termine',
  };

  const parkliste = ctx.parkplaetze.map((p) => `
        <li class="parkplatz${empfohlen.includes(p.nr) ? ' parkplatz--tipp' : ''}">
          <span class="parkplatz__nr" aria-hidden="true">${p.nr}</span>
          <span class="parkplatz__text"><strong>${esc(p.name)}</strong><span class="nur-sr"> (${p.nr} im Faltblatt)</span><br>${esc(p.adresse)} · ${esc(p.art)}</span>
        </li>`).join('');

  const sprung = sprungliste('Abschnitte dieser Seite', [
    ['kontaktwege', 'Kontaktwege', 'telefon'],
    ['lage', 'Lage und Karte', 'ort'],
    ['parken', 'Parken', 'parken'],
    ['bus', 'Bus und Park-and-Ride', 'bus'],
  ]);

  return `
${seitenkopf({
  dach: 'Anfahrt und Kontakt',
  titel: 'So erreichen Sie uns',
  einleitung: `${esc(anfahrt.lage)} Am schnellsten erreichen Sie uns telefonisch.`,
  sprung,
})}

<section class="abschnitt" id="kontaktwege" aria-labelledby="kontaktwege-titel">
  <div class="rahmen zweispaltig zweispaltig--breit">
    <div>
      <h2 id="kontaktwege-titel">Kontaktwege</h2>
      <dl class="kontaktliste">
        <div class="kontaktliste__zeile kontaktliste__zeile--haupt">
          <dt>${icon('telefon')}<span>Telefon</span></dt>
          <dd><a class="kontaktliste__telefon" href="${praxis.telefon.href}">${esc(praxis.telefon.anzeige)}</a></dd>
        </div>
        <div class="kontaktliste__zeile">
          <dt>${icon('ort')}<span>Anschrift</span></dt>
          <dd>${esc(praxis.praxisname)}<br>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</dd>
        </div>
      </dl>
    </div>
    <div class="infokarte">
      <h3>${icon('kalender')}<span>Termin vereinbaren</span></h3>
      <p>${ctx.termin.extern
        ? 'Ihren Termin buchen Sie online oder vereinbaren ihn telefonisch während der Sprechzeiten.'
        : 'Termine vergeben wir telefonisch während der Sprechzeiten.'}</p>
      ${terminKnopf(ctx)}
      <p class="infokarte__klein"><a href="besuch.html#sprechzeiten">Unsere Sprechzeiten</a></p>
    </div>
  </div>
</section>

<section class="abschnitt abschnitt--schilf" id="lage" aria-labelledby="lage-titel">
  <div class="rahmen zweispaltig zweispaltig--karte">
    <div class="text">
      <h2 id="lage-titel">Lage und Karte</h2>
      <p class="anschrift">${icon('ort')}<span>${anschrift(ctx)}</span></p>
      <p>${esc(anfahrt.lage)} Zu Fuß sind es von der Fußgängerzone nur wenige Schritte.</p>
      <p class="weiter"><a class="weiter__link" href="${karte.link}" target="_blank" rel="noopener noreferrer">${icon('extern')}<span>Karte bei Google Maps öffnen<span class="nur-sr"> (öffnet in neuem Fenster)</span></span></a></p>
    </div>
    <div class="karte" data-karte data-src="${esc(karte.einbettung)}">
      <div class="karte__flaeche">
        <img class="karte__bild" src="assets/bilder/karte-platzhalter.svg" alt="" width="800" height="520">
        <div class="karte__hinweis">
          <p class="karte__titel">${icon('ort')}<span>Karte der Umgebung</span></p>
          <p>Zum Schutz Ihrer Daten zeigen wir die Karte erst auf Ihren Wunsch. Mit einem Klick auf „Karte laden“ willigen Sie ein, dass Ihre IP-Adresse an Google übertragen wird. <a href="datenschutz.html#karte">Mehr dazu</a></p>
          <p class="karte__ohne-js">In Ihrem Browser ist JavaScript ausgeschaltet. Die Karte öffnen Sie über den Link „Karte bei Google Maps öffnen“.</p>
          <button class="knopf knopf--voll karte__knopf" type="button" data-karte-laden>${icon('ort')}<span>Karte laden</span></button>
        </div>
      </div>
      <p class="karte__quelle" data-karte-quelle hidden>Kartendaten: <a href="${karte.lizenzLink}" target="_blank" rel="noopener noreferrer">${esc(karte.quellenhinweis)}<span class="nur-sr"> (öffnet in neuem Fenster)</span></a></p>
    </div>
  </div>
</section>

<section class="abschnitt" id="parken" aria-labelledby="parken-titel">
  <div class="rahmen">
    <div class="abschnitt__kopf">
      <h2 id="parken-titel">Parken in der Innenstadt</h2>
    </div>
    <div class="hinweis hinweis--gross">
      <div class="hinweis__kopf">
        ${icon('warnung', 'icon icon--riesig')}
        <h3 class="hinweis__titel">Das Innenstadt-Parkhaus ist gesperrt</h3>
      </div>
      <div class="hinweis__text">
        <p>${esc(anfahrt.parkhausGesperrt)} Bitte planen Sie für die Parkplatzsuche etwas mehr Zeit ein.</p>
        <p>${esc(anfahrt.kurzparken)}</p>
      </div>
    </div>

    <h3 class="zwischentitel">Unsere Empfehlung</h3>
    <ul class="kacheln kacheln--drei" role="list">
      ${empfehlungen.map((p) => `<li class="kachel kachel--flach">
        ${icon('parken', 'icon icon--gross')}
        <h4 class="kachel__titel">${esc(p.name.replace(/ \(.*\)$/, ''))}</h4>
        <p>${esc(p.adresse)}</p>
        <p class="kachel__fuss">${warum[p.nr]}</p>
      </li>`).join('\n      ')}
    </ul>

    <div class="zweispaltig zweispaltig--parken">
      <div>
        <h3 class="zwischentitel">Parkplätze in Gehweite</h3>
        <p>Nach Entfernung zur Praxis sortiert; die Nummern entsprechen der Karte im Faltblatt der Stadt.</p>
        <ul class="parkliste" role="list">${parkliste}
        </ul>
      </div>
      <div class="download">
        <h3 class="zwischentitel">Faltblatt der Stadt</h3>
        <p>Die Stadt Schleswig hat alle Parkmöglichkeiten mit Karte in einem Faltblatt zusammengestellt.</p>
        <a class="download__link" href="assets/downloads/${faltblatt.datei}" type="application/pdf">
          ${icon('download', 'icon icon--gross')}
          <span><strong>Faltblatt „${esc(faltblatt.titel)}“ herunterladen</strong><br>${esc(faltblatt.groesse)}, Stand ${esc(faltblatt.stand)}</span>
        </a>
        <p class="download__quelle">Herausgeber: ${esc(faltblatt.herausgeber)}. Die Angaben können sich bis zur Eröffnung des neuen Parkhauses ändern.</p>
        <p>Aktuelle Informationen: ${extern(anfahrt.links.ladenstrasse)}, zum überdachten GEWOBA-Parkhaus: ${extern(anfahrt.links.gewoba)}</p>
      </div>
    </div>
  </div>
</section>

<section class="abschnitt abschnitt--wasser" id="bus" aria-labelledby="bus-titel">
  <div class="rahmen">
    <h2 id="bus-titel">Mit Bus und Park-and-Ride</h2>
    <div class="dreier">
      <div class="dreier__teil">
        <h3>${icon('bus')}<span>Bus</span></h3>
        <p>${esc(anfahrt.bus)}</p>
      </div>
      <div class="dreier__teil">
        <h3>${icon('parken')}<span>Park-and-Ride</span></h3>
        <p>${esc(anfahrt.parkAndRide)}</p>
      </div>
      <div class="dreier__teil">
        <h3>${icon('begleitung')}<span>Bus auf Abruf</span></h3>
        <p>${esc(anfahrt.smile24)} Mehr unter ${extern(anfahrt.links.smile24)}.</p>
      </div>
    </div>
  </div>
</section>
`;
}
