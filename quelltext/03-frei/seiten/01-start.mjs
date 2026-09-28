// Startseite: alle Kerninformationen auf einen Blick.
import { icon, anschrift, dachzeile, terminKnopf, telefonKnopf, sprechzeitenTabelle, BEREICHE } from '../bausteine.mjs';

export const seite = {
  datei: 'index.html',
  nav: 'start',
  menue: 'Start',
  titel: 'Dr. med. Vera Christoph – Augenärztin in Schleswig',
  beschreibung: 'Augenarztpraxis Dr. med. Vera Christoph in der Schleswiger Altstadt: Sprechzeiten, Leistungen, Anfahrt und Parken, Termine unter 04621 / 2 23 50.',
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;

  const kacheln = ctx.leistungen.map((b) => `
        <li class="kachel kachel--link">
          ${icon(BEREICHE[b.id].icon, 'icon icon--gross')}
          <h3 class="kachel__titel"><a href="leistungen.html#${b.id}">${b.titel}</a></h3>
          <p>${BEREICHE[b.id].kurztext}</p>
        </li>`).join('');

  return `
<section class="held" aria-labelledby="start-titel">
  <div class="rahmen held__raster">
    <div class="held__text">
      ${dachzeile('Augenarztpraxis in der Schleswiger Altstadt')}
      <h1 id="start-titel">Ihre Augenärztin mitten in Schleswig</h1>
      <p class="einleitung">Willkommen in der Praxis von ${esc(praxis.aerztin)}, ${esc(praxis.fachrichtung)}. Wir sind für Sie da, wenn es um Ihre Augen geht: bei der Vorsorge, bei Beschwerden, für ein Führerscheingutachten und im Notfall.</p>
      <div class="knopfreihe">
        ${terminKnopf(ctx)}
        ${telefonKnopf(ctx)}
      </div>
    </div>

    <section class="blick" aria-labelledby="blick-titel">
      <h2 class="blick__titel" id="blick-titel">Auf einen Blick</h2>
      <div class="blick__teil">
        <h3>${icon('uhr')}<span>Sprechzeiten</span></h3>
        ${sprechzeitenTabelle(ctx, { form: 'kompakt' })}
      </div>
      <div class="blick__teil">
        <h3>${icon('ort')}<span>Adresse</span></h3>
        <address>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</address>
        <p class="blick__warnung">${icon('parken')}<span>Das Parkhaus in der Innenstadt ist gesperrt. <a href="kontakt.html#parken">So parken Sie in der Nähe</a></span></p>
      </div>
    </section>
  </div>
  <img class="held__horizont" src="assets/bilder/horizont.svg" alt="" width="1600" height="220">
</section>

<section class="abschnitt abschnitt--schilf" aria-labelledby="willkommen-titel">
  <div class="rahmen">
    <div class="text text--willkommen">
      ${dachzeile('Über die Praxis')}
      <h2 id="willkommen-titel">Willkommen in unserer Praxis</h2>
      <p>Gutes Sehen begleitet uns durch jeden Tag – beim Lesen, beim Autofahren, beim Blick über die Schlei. Wenn sich daran etwas verändert, möchten Sie wissen, woran Sie sind. Darum geht es uns: um sorgfältige Untersuchungen, verständliche Erklärungen und eine Behandlung, die zu Ihnen passt.</p>
      <p>Unsere Praxis liegt in der ${esc(praxis.adresse.strasse)}, mitten in der Altstadt zwischen Stadtweg und Königstraße. Wir betreuen Patientinnen und Patienten aus Schleswig und Umgebung – beim ersten Besuch ebenso wie bei regelmäßigen Verlaufskontrollen.</p>
      <p class="unterschrift"><span class="unterschrift__name">${esc(praxis.aerztin)}</span><span>${esc(praxis.fachrichtung)}</span></p>
    </div>
  </div>
</section>

<section class="abschnitt" aria-labelledby="leistungen-titel">
  <div class="rahmen">
    <div class="abschnitt__kopf">
      ${dachzeile('Leistungen')}
      <h2 id="leistungen-titel">Was wir für Ihre Augen tun</h2>
      <p>Von der Vorsorge bis zur Laserbehandlung beim Nachstar: Hier sehen Sie, was wir untersuchen und behandeln – und bei welchen Beschwerden Sie nicht abwarten sollten.</p>
    </div>
    <ul class="kacheln" role="list">${kacheln}
      <li class="kachel kachel--alle">
        ${icon('wellen', 'icon icon--gross')}
        <h3 class="kachel__titel"><a href="leistungen.html">Alle Leistungen im Überblick</a></h3>
        <p>Die vollständige Liste mit Erklärungen zu jedem Bereich.</p>
      </li>
    </ul>
  </div>
</section>

<section class="abschnitt abschnitt--wasser" aria-labelledby="besuch-titel">
  <div class="rahmen">
    <div class="abschnitt__kopf">
      ${dachzeile('Ihr Besuch')}
      <h2 id="besuch-titel">Gut vorbereitet zu Ihrem Termin</h2>
    </div>
    <div class="dreier">
      <div class="dreier__teil">
        <h3>${icon('karte')}<span>Bitte mitbringen</span></h3>
        <ul class="haken">
          <li>Versichertenkarte</li>
          <li>Überweisung, falls vorhanden</li>
          <li>Brille oder Kontaktlinsen-Pass</li>
          <li>Medikamentenplan</li>
          <li>Vorbefunde und Arztbriefe</li>
        </ul>
      </div>
      <div class="dreier__teil">
        <h3>${icon('sonnenbrille')}<span>Nach Augentropfen nicht selbst fahren</span></h3>
        <p>Werden Ihre Pupillen für die Untersuchung erweitert, sehen Sie danach einige Stunden lang unscharf und sind blendempfindlich. Kommen Sie dann bitte nicht mit dem eigenen Auto und bringen Sie eine Sonnenbrille mit.</p>
      </div>
      <div class="dreier__teil">
        <h3>${icon('notfall')}<span>Im Notfall</span></h3>
        <p>Während der Sprechzeiten rufen Sie uns bitte sofort an. Außerhalb der Sprechzeiten hilft der ärztliche Bereitschaftsdienst unter <a href="tel:116117">116 117</a>, bei Lebensgefahr wählen Sie <a href="tel:112">112</a>.</p>
      </div>
    </div>
    <p class="weiter"><a class="weiter__link" href="besuch.html">${icon('pfeil')}<span>Sprechzeiten und alles zu Ihrem Besuch</span></a></p>
  </div>
</section>

<section class="abschnitt" aria-labelledby="anfahrt-titel">
  <div class="rahmen zweispaltig">
    <div class="text">
      ${dachzeile('Anfahrt')}
      <h2 id="anfahrt-titel">So finden Sie zu uns</h2>
      <p class="anschrift">${icon('ort')}<span>${anschrift(ctx)}</span></p>
      <p>${esc(ctx.anfahrt.lage)} Mit dem Bus erreichen Sie die Innenstadt über die Haltestelle ${esc(ctx.anfahrt.haltestelle)}.</p>
      <p class="weiter"><a class="weiter__link" href="kontakt.html">${icon('pfeil')}<span>Anfahrt, Karte und Kontakt</span></a></p>
    </div>
    <div class="hinweis">
      <h3 class="hinweis__titel" id="parken-titel">${icon('parken')}<span>Wichtig, wenn Sie mit dem Auto kommen</span></h3>
      <p>Das städtische Parkhaus in der Innenstadt ist seit Januar 2026 gesperrt und wird neu gebaut. Nah an der Praxis parken Sie zum Beispiel am <strong>SchleiCenter</strong> oder an der <strong>Alten Feuerwache</strong> – dort ist das Kurzzeitparken oft zwei Stunden kostenfrei. Überdacht stehen Sie im <strong>GEWOBA-Parkhaus</strong>.</p>
      <p class="weiter"><a class="weiter__link" href="kontakt.html#parken">${icon('pfeil')}<span>Alle Parkmöglichkeiten und das Faltblatt der Stadt</span></a></p>
    </div>
  </div>
</section>
`;
}
