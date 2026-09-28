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
        rahmen.referrerPolicy = 'strict-origin-when-cross-origin';
        rahmen.allowFullscreen = true;
        var flaeche = karte.querySelector('.karte__flaeche');
        flaeche.innerHTML = '';
        flaeche.appendChild(rahmen);
        var quelle = karte.querySelector('[data-karte-quelle]');
        if (quelle) quelle.hidden = false;
        rahmen.focus();
      });
    })(karten[k]);
  }

  /* ── 4. Inhalte beim Scrollen sanft einblenden ─────────────────────────── */
  // Nur wenn der Browser es kann, keine reduzierte Bewegung gewünscht ist und kein
  // Automatisierungswerkzeug die Seite prüft (dort soll alles sofort sichtbar sein).
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !ruhig && !navigator.webdriver) {
    var auswahl = [
      'main .abschnitt__kopf', 'main .text', 'main .kachel', 'main .dreier__teil', 'main .hinweis',
      'main .blick', 'main .bereich__kopf', 'main .bereich__inhalt', 'main .bereich__notfall',
      'main .notfallweg', 'main .infokarte', 'main .telefonkarte', 'main .zweispaltig > *',
      'main .aufruf', 'main .download', 'main .zeiten--gross', 'main .karte'
    ].join(',');
    var sichtbarBis = window.innerHeight;
    var kandidaten = document.querySelectorAll(auswahl);
    var beobachter = new IntersectionObserver(function (eintraege) {
      var neu = 0;
      for (var e = 0; e < eintraege.length; e++) {
        if (!eintraege[e].isIntersecting) continue;
        var el = eintraege[e].target;
        // Gleichzeitig erscheinende Elemente (z. B. Kacheln) leicht gestaffelt
        el.style.setProperty('--verzoegerung', Math.min(neu, 4) * 90 + 'ms');
        el.classList.add('ist-sichtbar');
        beobachter.unobserve(el);
        neu++;
      }
    }, { rootMargin: '0px 0px -8% 0px' });

    for (var n = 0; n < kandidaten.length; n++) {
      var el = kandidaten[n];
      // Verschachtelte Treffer nicht doppelt animieren; was schon im Bild ist, bleibt ruhig stehen
      if (el.parentElement.closest('.einblenden')) continue;
      if (el.getBoundingClientRect().top < sichtbarBis) continue;
      el.classList.add('einblenden');
      beobachter.observe(el);
    }
    document.documentElement.classList.add('bewegung');

    // Springt der Tastaturfokus in einen noch verborgenen Bereich, sofort zeigen
    document.addEventListener('focusin', function (e) {
      var bereich = e.target.closest && e.target.closest('.einblenden:not(.ist-sichtbar)');
      if (bereich) { bereich.classList.add('ist-sichtbar'); beobachter.unobserve(bereich); }
    });
  }
})();
