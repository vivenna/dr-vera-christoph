// Leistungen – Aufbau wie bei der Referenz: Einleitung mit Grafik, danach fünf
// wiederkehrende Zweispalten-Blöcke (Titel und Grafik links, auf breiten
// Bildschirmen per position: sticky mitlaufend; rechts die Liste als helle Karten).
// Anders als bei der Referenz sind auch auf dem Telefon alle 53 Punkte sichtbar.

export const seite = {
  datei: 'leistungen.html',
  titel: 'Leistungen – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung:
    'Vorsorge, apparative Diagnostik mit OCT und Gesichtsfeldmessung, YAG-Laser beim Nachstar, Führerscheingutachten und Hilfe bei Notfällen am Auge.',
  nav: 'leistungen',
  navText: 'Leistungen',
  karte: true,
};

export default function inhalt(ctx) {
  const { esc } = ctx;

  const sprungziele = ctx.leistungen
    .map((b) => `      <li><a href="#${b.id}">${esc(b.kurz)}</a></li>`)
    .join('\n');

  const bloecke = ctx.leistungen
    .map((b) => {
      const punkte = b.punkte.map((p) => `        <li>${esc(p)}</li>`).join('\n');
      // Im Notfall-Block zusätzlich die Rufnummern als Links
      const notfall =
        b.id === 'notfaelle'
          ? `
      <dl class="notruf">
        <div><dt>Praxis, während der Sprechzeiten</dt><dd>${ctx.telefonLink('link-gross')}</dd></div>
        <div><dt>Ärztlicher Bereitschaftsdienst</dt><dd><a class="link-gross" href="tel:116117">116 117</a></dd></div>
        <div><dt>Notruf bei Lebensgefahr</dt><dd><a class="link-gross" href="tel:112">112</a></dd></div>
      </dl>`
          : '';
      return `
  <section class="block" id="${b.id}" aria-labelledby="${b.id}-titel">
    <div class="block-kopf">
      <h2 id="${b.id}-titel">${esc(b.titel)}</h2>
      <img class="block-bild" src="assets/bilder/${b.id}.svg" alt="" width="240" height="240">
      <p class="block-einleitung">${esc(b.einleitung)}</p>${notfall}
    </div>
    <ul class="block-liste">
${punkte}
    </ul>
  </section>`;
    })
    .join('\n');


  return `
  <section class="einleitung" aria-labelledby="leistungen-titel">
    <div class="einleitung-text">
      <h1 id="leistungen-titel">Unsere Leistungen</h1>
      <p class="abschnitt-lead">${esc(ctx.leistungenEinleitung)}</p>
      <p>Hier finden Sie unser Leistungsspektrum in fünf Bereichen – von der Vorsorge bis zur Hilfe im Notfall.</p>
    </div>
    <img class="einleitung-bild" src="assets/bilder/leistungen-einleitung.svg" alt="" width="320" height="300">
  </section>

  <nav class="sprungliste" aria-label="Leistungsbereiche">
    <p class="sprungliste-titel">Direkt zu:</p>
    <ul>
${sprungziele}
    </ul>
  </nav>
${bloecke}`;
}
