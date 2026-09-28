// Terminbuchung – schlichte Zwischenseite, solange die Online-Terminbuchung
// noch eingerichtet wird. Kein Kopf, keine Navigation, keine Karte, kein Fuß:
// nur Titel und eine Schaltfläche zurück zur Startseite (siehe layout.mjs,
// `seite.minimal`). Jede Termin-Schaltfläche der Website führt hierher, bis
// in quelltext/gemeinsam/website.mjs eine externe `terminUrl` eingetragen ist.

export const seite = {
  datei: 'terminbuchung.html',
  titel: 'Terminbuchung wird noch eingerichtet – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung: 'Die Online-Terminbuchung der Augenarztpraxis Dr. med. Vera Christoph wird noch eingerichtet.',
  nav: 'termin',
  karte: false,
  minimal: true,
};

export default function inhalt() {
  return `
  <h1>Terminbuchung wird noch eingerichtet</h1>
  <p><a class="knopf" href="index.html">Zurück zur Startseite</a></p>`;
}
