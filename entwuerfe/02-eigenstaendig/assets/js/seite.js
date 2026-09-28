// Entwurf 2 – kleines Skript ohne Abhängigkeiten.
// Die Seite funktioniert auch ohne JavaScript: Das Menü ist dann immer offen,
// die Karte lässt sich über den Link zu Google Maps ansehen.
(function () {
  'use strict';

  // ── Menü auf kleinen Bildschirmen ────────────────────────────────────────
  var knopf = document.querySelector('.menue-knopf');
  var liste = document.getElementById('hauptmenue');

  function setzeMenue(offen) {
    knopf.setAttribute('aria-expanded', String(offen));
    liste.classList.toggle('ist-offen', offen);
  }

  if (knopf && liste) {
    knopf.addEventListener('click', function () {
      setzeMenue(knopf.getAttribute('aria-expanded') !== 'true');
    });
    // Esc schließt das Menü und gibt den Fokus an den Knopf zurück
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') {
        setzeMenue(false);
        knopf.focus();
      }
    });
  }

  // ── Karte: erst nach Klick laden (Zwei-Klick-Lösung) ─────────────────────
  // Vorher wird keine Verbindung zu Google aufgebaut.
  var karten = document.querySelectorAll('[data-karte]');
  Array.prototype.forEach.call(karten, function (karte) {
    var laden = karte.querySelector('.karte-laden');
    var flaeche = karte.querySelector('.karte-flaeche');
    var quelle = karte.querySelector('.karte-quelle');
    if (!laden || !flaeche) return;
    laden.hidden = false;
    laden.addEventListener('click', function () {
      var rahmen = document.createElement('iframe');
      rahmen.src = karte.getAttribute('data-src');
      rahmen.title = karte.getAttribute('data-titel') || 'Karte';
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'strict-origin-when-cross-origin';
      rahmen.allowFullscreen = true;
      flaeche.textContent = '';
      flaeche.appendChild(rahmen);
      if (quelle) quelle.hidden = false;
      rahmen.focus();
    });
  });
})();
