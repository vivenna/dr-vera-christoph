// Einstellungen für die Veröffentlichung – gelten für alle Entwürfe.
// Nach jeder Änderung: `node quelltext/bauen.mjs`

export const website = {
  // ════════════════════════════════════════════════════════════════════════
  //  ZIEL DER TERMIN-SCHALTFLÄCHE – die einzige Stelle, an der es steht.
  // ════════════════════════════════════════════════════════════════════════
  //  Solange die Online-Terminbuchung noch gebaut wird, führt jede
  //  Termin-Schaltfläche auf die schlichte Zwischenseite `terminbuchung.html`
  //  des jeweiligen Entwurfs (nur Titel „Terminbuchung wird noch eingerichtet“
  //  und eine Schaltfläche zurück zur Startseite). Sobald die Buchung auf
  //  ihrer eigenen Domain läuft, hier die vollständige Adresse eintragen,
  //  zum Beispiel:
  //
  //      terminUrl: 'https://termine.beispiel.de/dr-christoph',
  //
  //  und neu bauen. Externe Adressen (beginnend mit http:// oder https://)
  //  erhalten automatisch target="_blank" und rel="noopener noreferrer".
  //  Die Zwischenseite bleibt bestehen und verweist dann ebenfalls auf die Buchung.
  terminUrl: 'terminbuchung.html',

  // Öffentliche Adresse des Repositorys auf GitHub Pages. Daraus entstehen
  // canonical-Links, Open-Graph-Adressen und die sitemap.xml.
  // Für den Livegang auf die eigene Domain ändern, z. B. 'https://www.beispiel.de/'.
  basisUrl: 'https://vivenna.github.io/vera-christoph/',

  // false = Vorschau: jede Seite trägt <meta name="robots" content="noindex">,
  // damit Suchmaschinen die Entwürfe mit ihren Platzhaltern nicht aufnehmen
  // und später nicht mit der echten Website konkurrieren.
  // Für den Livegang auf true setzen.
  indexierbar: false,

  // Datum für <lastmod> in der sitemap.xml (JJJJ-MM-TT).
  stand: '2026-09-27',
};
