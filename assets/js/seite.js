/* Kleine Helfer ohne Abhängigkeiten.
   Die Seite funktioniert vollständig ohne dieses Skript:
   ohne JavaScript ist das Menü immer offen, die Karte bleibt als Link erreichbar. */
(function () {
  'use strict';

  /* ── 0. Saubere Adressen ohne „.html“ ─────────────────────────────────── */
  // Im Quelltext stehen alle Seitenlinks ohne Endung („leistungen“, „./“): So liefert
  // GitHub Pages sie aus, und so erscheinen sie in der Adresszeile.
  // Ein einfacher lokaler Server kennt diese Kurzformen nicht. Auf localhost,
  // 127.0.0.1 und bei file:// wird deshalb einmal geprüft, ob „leistungen“ erreichbar
  // ist; wenn nicht, hängt das Skript „.html“ an alle Seitenlinks (und „./“ wird
  // zu „index.html“). Auf der echten Domain passiert nichts.
  (function () {
    var h = location.hostname;
    var lokal = location.protocol === 'file:' || h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h === '::1' || /\.localhost$/.test(h);
    if (!lokal) return;
    var anpassen = function () {
      var links = document.querySelectorAll('a[href]');
      for (var i = 0; i < links.length; i++) {
        var ziel = links[i].getAttribute('href');
        var teile = /^([^#?]*)([#?].*)?$/.exec(ziel);
        if (!teile || /^[a-z][a-z0-9+.-]*:/i.test(teile[1]) || teile[1].charAt(0) === '/' && teile[1].charAt(1) === '/') continue;
        var pfad = teile[1];
        if (pfad === '' ) continue;                         // reiner Anker („#inhalt“)
        if (pfad === './') pfad = 'index.html';
        else if (/\.[a-z0-9]+$/i.test(pfad)) continue;      // Datei mit Endung (Bilder, PDF …)
        else pfad += '.html';
        links[i].setAttribute('href', pfad + (teile[2] || ''));
      }
    };
    if (location.protocol === 'file:' || !window.fetch) { anpassen(); return; }
    fetch('leistungen', { method: 'HEAD' }).then(function (antwort) {
      if (!antwort.ok) anpassen();
    }, anpassen);
  })();

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

  /* ── 1b. Kopf auf dem Telefon: beim Hochscrollen wieder einblenden ───── */
  var kopf = document.querySelector('.kopf');
  if (kopf && window.matchMedia) {
    var schmal = window.matchMedia('(max-width: 63.99em)');
    var letzte = 0;
    var plant = false;
    var pruefen = function () {
      plant = false;
      var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      var y = Math.min(Math.max(0, window.pageYOffset), max); // Gummiband-Effekt von iOS ausklammern
      var menueOffen = knopf && knopf.getAttribute('aria-expanded') === 'true';
      if (!schmal.matches || menueOffen || y < kopf.offsetHeight) {
        kopf.classList.remove('kopf--versteckt');
      } else if (Math.abs(y - letzte) > 6) {
        kopf.classList.toggle('kopf--versteckt', y > letzte);
      }
      if (Math.abs(y - letzte) > 6) letzte = y;
    };
    letzte = window.pageYOffset;
    window.addEventListener('scroll', function () {
      if (!plant) { plant = true; window.requestAnimationFrame(pruefen); }
    }, { passive: true });
    // Tastaturfokus im Kopf: sofort sichtbar
    kopf.addEventListener('focusin', function () { kopf.classList.remove('kopf--versteckt'); });
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

  /* ── 5. Hinweis zum Praxisurlaub ───────────────────────────────────────── */
  // Erscheint bei jedem neuen Besuch der Website, nicht beim Weiterklicken von Seite zu
  // Seite: Wer von einer Seite dieser Website kommt (Referrer), sieht ihn nicht erneut.
  // Es wird nichts im Browser gespeichert. Nach dem Urlaub verschwindet er von selbst.
  // Neuen Urlaub eintragen: `bis` (erster Tag nach dem Urlaub, mit Zeitzone) und die
  // Texte ändern. Ist `bis` vorbei, passiert nichts.
  var urlaub = {
    bis: '2026-10-24T00:00:00+02:00',
    titel: 'Praxisurlaub vom 12. bis 23. Oktober 2026',
    text: 'In dieser Zeit ist die Praxis geschlossen. Ab Montag, dem 26. Oktober 2026, sind wir wieder für Sie da.',
    vertretung: 'Augenklinik Rendsburg',
    adresse: 'Jungfernstieg 25, 24768 Rendsburg',
    telefon: '04331 / 5 90 20',
    telefonLink: 'tel:+49433159020'
  };
  var urlaubVorbei = Date.now() >= new Date(urlaub.bis).getTime();
  // Intern weitergeklickt = Referrer stammt von dieser Website. Die Weiterleitungsseiten
  // der alten Vorschau-Adresse (/entwuerfe/) zählen nicht: Wer über den alten Link kommt,
  // ist neu hier.
  var ref = document.referrer;
  var intern = false;
  try {
    var refUrl = new URL(ref);
    intern = refUrl.origin === location.origin && refUrl.pathname.indexOf('/entwuerfe/') === -1;
  } catch (fehler) { /* kein Referrer: direkter Aufruf, Lesezeichen oder neuer Tab */ }

  if (!urlaubVorbei && !intern && typeof HTMLDialogElement === 'function') {
    var dialog = document.createElement('dialog');
    dialog.className = 'urlaub';
    dialog.setAttribute('aria-labelledby', 'urlaub-titel');
    dialog.innerHTML =
      '<div class="urlaub__inhalt">' +
        '<p class="dachzeile">Hinweis</p>' +
        '<h2 id="urlaub-titel"></h2>' +
        '<p class="urlaub__text"></p>' +
        '<div class="urlaub__vertretung">' +
          '<h3>Vertretung in dringenden Fällen</h3>' +
          '<p><strong class="urlaub__name"></strong><br><span class="urlaub__adresse"></span></p>' +
          '<p><a class="urlaub__telefon" href=""></a></p>' +
        '</div>' +
        '<p class="urlaub__notfall">Außerhalb der Sprechzeiten erreichen Sie den ärztlichen Bereitschaftsdienst unter <a href="tel:116117">116 117</a>, bei Lebensgefahr den Notruf <a href="tel:112">112</a>.</p>' +
        '<button class="knopf knopf--voll" type="button" autofocus>Verstanden</button>' +
      '</div>';
    dialog.querySelector('#urlaub-titel').textContent = urlaub.titel;
    dialog.querySelector('.urlaub__text').textContent = urlaub.text;
    dialog.querySelector('.urlaub__name').textContent = urlaub.vertretung;
    dialog.querySelector('.urlaub__adresse').textContent = urlaub.adresse;
    var anruf = dialog.querySelector('.urlaub__telefon');
    anruf.textContent = urlaub.telefon;
    anruf.setAttribute('href', urlaub.telefonLink);
    dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    document.body.appendChild(dialog);
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }
})();
