// Startseite – kurz wie bei der Referenz:
// Begrüßung mit Aquarell-Auge → Sprechzeiten → Anfahrt und Parken → Karte → Fuß.
// Statt des Rezensions-Sliders der Referenz steht hier ein ruhiger Block mit
// echtem Nutzen: wie man trotz gesperrtem Innenstadt-Parkhaus gut ankommt.

import { zeitenTabelle, faltblattLink, symbol } from '../bausteine.mjs';

export const seite = {
  datei: 'index.html',
  titel: 'Augenarztpraxis Dr. med. Vera Christoph – Augenärztin in Schleswig',
  beschreibung:
    'Augenärztin in der Schleswiger Altstadt: Vorsorge, Diagnostik, Laserbehandlung beim Nachstar und Führerscheingutachten. Sprechzeiten, Anfahrt und Parken.',
  nav: 'start',
  navText: 'Startseite',
  karte: true,
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;
  return `
  <section class="held" aria-labelledby="willkommen">
    <div class="held-text">
      <p class="held-gruss">Herzlich willkommen</p>
      <h1 id="willkommen">Augenheilkunde mitten in der Schleswiger Altstadt</h1>
      <p>In der <strong>${esc(praxis.adresse.strasse)}</strong>, zwischen Stadtweg und Königstraße, betreut <strong>${esc(praxis.aerztin)}</strong> als <strong>${esc(praxis.fachrichtung)}</strong> Patientinnen und Patienten aus Schleswig und der Umgebung. Wir untersuchen, beraten und behandeln – von der <strong>Vorsorge</strong> über genaue Messungen mit modernen Verfahren bis zur <strong>Laserbehandlung beim Nachstar</strong>.</p>
      <p>Uns ist wichtig, dass Sie gut informiert sind. Wir erklären, was wir untersuchen und warum, beantworten Ihre Fragen in Ruhe und besprechen die nächsten Schritte gemeinsam mit Ihnen.</p>
    </div>
    <div class="held-bild">
      <img src="assets/logo/logo-aquarell.svg" alt="" width="600" height="358">
    </div>
  </section>

  <section class="abschnitt zeiten" aria-labelledby="zeiten-titel">
    <h2 id="zeiten-titel" class="abschnitt-titel">Unsere Sprechzeiten</h2>
    ${zeitenTabelle(ctx)}
    <p class="zeiten-zusatz">${esc(praxis.sprechzeitenZusatz)}</p>
    <p class="zeiten-hinweis">${ctx.termin.extern
      ? `Einen Termin buchen Sie online oder vereinbaren ihn telefonisch unter ${ctx.telefonLink()}.`
      : `Einen Termin vereinbaren Sie am einfachsten telefonisch unter ${ctx.telefonLink()}.`}</p>
  </section>

  <section class="abschnitt anfahrt-kurz" aria-labelledby="anfahrt-titel">
    <h2 id="anfahrt-titel" class="abschnitt-titel">Anfahrt und Parken</h2>
    <p class="abschnitt-lead">Das Parkhaus in der Innenstadt ist seit Januar 2026 gesperrt. Damit Sie trotzdem entspannt ankommen, haben wir die nächstgelegenen Parkplätze und Busverbindungen rund um die ${esc(praxis.adresse.strasse)} zusammengestellt.</p>
    <ul class="kacheln">
      <li class="kachel">
        ${symbol('parken', 56)}
        <h3>Mit dem Auto</h3>
        <p>Kurzzeitparken gibt es am <strong>SchleiCenter</strong> (Schwarzer Weg 16–18) und an der <strong>Alten Feuerwache</strong> (Königstraße 16), häufig zwei Stunden kostenfrei. Überdacht parken Sie im <strong>GEWOBA-Parkhaus</strong>, Moltkestraße 34.</p>
      </li>
      <li class="kachel">
        ${symbol('bus', 56)}
        <h3>Mit Bus und Park-and-Ride</h3>
        <p>Parken Sie am Stadtfeld, am Schleihallen-Parkplatz oder am Theaterparkplatz. Von dort fahren Busse alle 15 Minuten in die Innenstadt bis zur Haltestelle <strong>${esc(ctx.anfahrt.haltestelle)}</strong>.</p>
      </li>
      <li class="kachel">
        ${symbol('dokument', 56)}
        <h3>Alle Parkplätze auf einen Blick</h3>
        <p>Die Stadt Schleswig hat alle Parkmöglichkeiten der Innenstadt mit Karte in einem Faltblatt zusammengefasst.</p>
        <p>${faltblattLink(ctx)}</p>
      </li>
    </ul>
    <p class="abschnitt-mehr"><a class="knopf knopf-rand" href="kontakt.html#parken">Mehr zu Anfahrt und Parken</a></p>
  </section>`;
}
