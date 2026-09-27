/* Entwurf 3 – kleine Helfer ohne Abhängigkeiten.
   Die Seite funktioniert vollständig ohne dieses Skript:
   ohne JavaScript ist das Menü immer offen, die Karte bleibt als Link erreichbar. */
(function () {
  'use strict';

  /* ── 1. Mobiles Menü ─────────────────────────────────────────────────── */
  var knopf = document.querySelector('.menue-knopf');
  var menue = document.getElementById('hauptmenue');

  if (knopf && menue) {
    var setzen = function (offen) {
      knopf.setAttribute('aria-expanded', String(offen));
      menue.classList.toggle('ist-offen', offen);
    };
    knopf.addEventListener('click', function () {
      var offen = knopf.getAttribute('aria-expanded') !== 'true';
      setzen(offen);
      // Das Menü steht im Quelltext hinter den Schaltflächen „Anrufen“ und „Termin“.
      // Damit Tastaturnutzer nicht erst darüber springen, geht der Fokus beim
      // Öffnen direkt auf den ersten Menüpunkt.
      if (offen) {
        var erster = menue.querySelector('a');
        if (erster) erster.focus();
      }
    });
    // Esc schließt das Menü und gibt den Fokus an die Schaltfläche zurück
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && knopf.getAttribute('aria-expanded') === 'true') {
        setzen(false);
        knopf.focus();
      }
    });
  }

  /* ── 2. Heutigen Wochentag in den Sprechzeiten markieren ───────────────── */
  var heute = '';
  try {
    heute = new Intl.DateTimeFormat('de-DE', { weekday: 'long', timeZone: 'Europe/Berlin' }).format(new Date());
  } catch (fehler) {
    heute = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][new Date().getDay()];
  }
  var zeilen = document.querySelectorAll('tr[data-tag]');
  for (var i = 0; i < zeilen.length; i++) {
    if (zeilen[i].getAttribute('data-tag') !== heute) continue;
    zeilen[i].classList.add('ist-heute');
    var zelle = zeilen[i].querySelector('th');
    if (zelle) {
      var marke = document.createElement('span');
      marke.className = 'heute-marke';
      marke.textContent = 'heute';
      zelle.appendChild(document.createTextNode(' '));
      zelle.appendChild(marke);
    }
  }

  /* ── 3. Karte erst nach Klick laden (Zwei-Klick-Lösung) ────────────────── */
  var karten = document.querySelectorAll('[data-karte]');
  for (var k = 0; k < karten.length; k++) {
    (function (karte) {
      var laden = karte.querySelector('[data-karte-laden]');
      if (!laden) return;
      laden.addEventListener('click', function () {
        var rahmen = document.createElement('iframe');
        rahmen.src = karte.getAttribute('data-src');
        rahmen.title = 'Karte: Lage der Praxis, Plessenstraße 13';
        rahmen.loading = 'lazy';
        var flaeche = karte.querySelector('.karte__flaeche');
        flaeche.innerHTML = '';
        flaeche.appendChild(rahmen);
        var quelle = karte.querySelector('[data-karte-quelle]');
        if (quelle) quelle.hidden = false;
        rahmen.focus();
      });
    })(karten[k]);
  }
})();
