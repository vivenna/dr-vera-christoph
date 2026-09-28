/* Entwurf 1 – kleines Skript ohne Abhängigkeiten.
   1. Menü auf dem Telefon auf- und zuklappen (Esc schließt, Fokus kehrt zurück).
   2. Karte erst nach Klick laden (Zwei-Klick-Lösung, vorher keine fremde Anfrage).
   Ohne JavaScript bleibt alles nutzbar: Das Menü ist dann als Liste sichtbar,
   und der Link „Karte bei Google Maps öffnen“ steht immer bereit. */
(function () {
  'use strict';

  /* ---------- 1. Menü ---------- */
  var kopf = document.querySelector('.kopf');
  var knopf = document.querySelector('.menue-knopf');

  if (kopf && knopf) {
    var breit = window.matchMedia('(min-width: 768px)');

    var setzen = function (offen) {
      kopf.classList.toggle('menue-offen', offen);
      knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    };

    knopf.addEventListener('click', function () {
      setzen(knopf.getAttribute('aria-expanded') !== 'true');
    });

    // Esc schließt das Menü und gibt den Fokus an die Schaltfläche zurück
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && kopf.classList.contains('menue-offen')) {
        setzen(false);
        knopf.focus();
      }
    });

    // Klick außerhalb schließt das Menü
    document.addEventListener('click', function (e) {
      if (kopf.classList.contains('menue-offen') && !kopf.contains(e.target)) setzen(false);
    });

    // Beim Wechsel auf die breite Ansicht (Pille) das Menü zurücksetzen
    var zuruecksetzen = function () { if (breit.matches) setzen(false); };
    if (breit.addEventListener) breit.addEventListener('change', zuruecksetzen);
    else if (breit.addListener) breit.addListener(zuruecksetzen);
  }

  /* ---------- 2. Karte nach Klick ---------- */
  var bereiche = document.querySelectorAll('[data-karte]');
  Array.prototype.forEach.call(bereiche, function (bereich) {
    var laden = bereich.querySelector('.karte-laden');
    if (!laden) return;

    laden.addEventListener('click', function () {
      var rahmen = document.createElement('iframe');
      rahmen.className = 'karte-rahmen';
      rahmen.title = 'Karte: Lage der Praxis, Plessenstraße 13';
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'strict-origin-when-cross-origin';
      rahmen.allowFullscreen = true;
      rahmen.src = bereich.getAttribute('data-karte');

      var buehne = bereich.querySelector('.karte-buehne');
      buehne.parentNode.replaceChild(rahmen, buehne);

      // Zeile unter der Karte einblenden: Adresse, Link zu Google Maps und
      // Quellenhinweis „© Google Maps“ bleiben so weiter sichtbar
      var quelle = bereich.querySelector('.karte-quelle');
      if (quelle) quelle.hidden = false;

      // Fokus nicht verlieren: auf die Karte setzen
      rahmen.setAttribute('tabindex', '0');
      rahmen.focus();
    });
  });
})();
