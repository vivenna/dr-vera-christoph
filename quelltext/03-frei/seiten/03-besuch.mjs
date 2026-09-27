// Sprechzeiten und Ihr Besuch: Zeiten, Vorbereitung, Pupillenerweiterung, Begleitung, Notfälle.
import { icon, seitenkopf, sprungliste, terminKnopf, sprechzeitenTabelle, notfallWege } from '../bausteine.mjs';

export const seite = {
  datei: 'besuch.html',
  nav: 'besuch',
  menue: 'Sprechzeiten und Besuch',
  titel: 'Sprechzeiten und Ihr Besuch – Augenarztpraxis Dr. Christoph, Schleswig',
  beschreibung: 'Sprechzeiten der Augenarztpraxis in Schleswig, was Sie zum Termin mitbringen, Hinweise zur Pupillenerweiterung, Begleitpersonen und Notfälle.',
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;

  const mitbringen = [
    ['karte', 'Versichertenkarte', 'Ihre elektronische Gesundheitskarte, damit wir Ihre Versichertendaten erfassen können.'],
    ['ueberweisung', 'Überweisung', 'Falls Sie eine Überweisung von Ihrer Hausärztin oder Ihrem Hausarzt haben.'],
    ['brille', 'Brille und Kontaktlinsen', 'Ihre aktuelle Brille, auch die Lesebrille. Wenn Sie Kontaktlinsen tragen, bitte auch den Kontaktlinsen-Pass.'],
    ['medikamente', 'Medikamentenplan', 'Eine Liste aller Medikamente, die Sie regelmäßig nehmen – Augentropfen eingeschlossen.'],
    ['befunde', 'Vorbefunde', 'Arztbriefe und frühere Befunde, zum Beispiel nach einer Augenoperation oder von einer anderen Augenarztpraxis.'],
    ['sonnenbrille', 'Sonnenbrille', 'Für den Heimweg, falls Ihre Pupillen für die Untersuchung erweitert werden.'],
  ].map(([sym, titel, text]) => `
      <li class="kachel kachel--flach">
        ${icon(sym, 'icon icon--gross')}
        <h3 class="kachel__titel">${titel}</h3>
        <p>${text}</p>
      </li>`).join('');

  const sprung = sprungliste('Abschnitte dieser Seite', [
    ['sprechzeiten', 'Sprechzeiten', 'uhr'],
    ['mitbringen', 'Was Sie mitbringen', 'karte'],
    ['pupillen', 'Nach dem Erweitern der Pupillen', 'sonnenbrille'],
    ['begleitung', 'Begleitung und Zugang', 'begleitung'],
    ['notfall', 'Im Notfall', 'notfall'],
  ]);

  return `
${seitenkopf({
  dach: 'Ihr Besuch',
  titel: 'Sprechzeiten und Ihr Besuch',
  einleitung: 'Hier finden Sie unsere Sprechzeiten und alles, was Ihnen den Besuch in der Praxis leichter macht: was Sie mitbringen sollten, was nach einer Pupillenerweiterung wichtig ist und was im Notfall zu tun ist.',
  sprung,
})}

<section class="abschnitt" id="sprechzeiten" aria-labelledby="sprechzeiten-titel">
  <div class="rahmen zweispaltig zweispaltig--breit">
    <div>
      <h2 id="sprechzeiten-titel">Sprechzeiten</h2>
      <!-- Telefon: Tag | Zeiten untereinander; ab 600 px: Tag | Vormittag | Nachmittag.
           Die jeweils andere Fassung ist mit display:none auch für Screenreader ausgeblendet. -->
      <div class="nur-schmal">${sprechzeitenTabelle(ctx, { form: 'kompakt', klasse: 'zeiten--gross' })}</div>
      <div class="nur-breit">${sprechzeitenTabelle(ctx, { form: 'voll', klasse: 'zeiten--gross' })}</div>
    </div>
    <div class="infokarte">
      <h3>${icon('telefon')}<span>Telefonisch erreichbar</span></h3>
      <p>Am besten erreichen Sie uns während der Sprechzeiten unter</p>
      <p class="infokarte__nummer">${ctx.telefonLink()}</p>
      <p>Termine außerhalb dieser Zeiten sind nach Vereinbarung möglich. Sprechen Sie uns einfach an.</p>
      ${terminKnopf(ctx)}
    </div>
  </div>
</section>

<section class="abschnitt abschnitt--schilf" id="mitbringen" aria-labelledby="mitbringen-titel">
  <div class="rahmen">
    <div class="abschnitt__kopf">
      <h2 id="mitbringen-titel">Das bringen Sie bitte mit</h2>
      <p>Mit diesen Unterlagen können wir Sie gründlich untersuchen und müssen nichts doppelt erfragen.</p>
    </div>
    <ul class="kacheln kacheln--mitbringen" role="list">${mitbringen}
    </ul>
  </div>
</section>

<section class="abschnitt" id="pupillen" aria-labelledby="pupillen-titel">
  <div class="rahmen">
    <div class="hinweis hinweis--gross">
      <div class="hinweis__kopf">
        ${icon('sonnenbrille', 'icon icon--riesig')}
        <h2 class="hinweis__titel" id="pupillen-titel">Nach dem Erweitern der Pupillen: bitte nicht selbst fahren</h2>
      </div>
      <div class="hinweis__text">
        <p>Für manche Untersuchungen, etwa des Augenhintergrunds, erweitern wir Ihre Pupillen mit Augentropfen. Danach sehen Sie für mehrere Stunden unscharf und sind sehr blendempfindlich. In dieser Zeit sind Sie nicht fahrtüchtig – das gilt für das Auto ebenso wie für das Fahrrad.</p>
        <ul class="haken">
          <li>Lassen Sie sich bringen und abholen oder kommen Sie mit dem Bus. Die Haltestelle ${esc(ctx.anfahrt.haltestelle)} liegt in der Nähe.</li>
          <li>Bringen Sie eine Sonnenbrille mit, das macht den Heimweg angenehmer.</li>
          <li>Wenn Sie nicht sicher sind, ob bei Ihrem Termin Tropfen nötig sind, fragen Sie bei der Terminvereinbarung nach.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="abschnitt abschnitt--wasser" id="begleitung" aria-labelledby="begleitung-titel">
  <div class="rahmen">
    <h2 id="begleitung-titel">Begleitung und Zugang zur Praxis</h2>
    <div class="zweier">
      <div class="kachel kachel--flach">
        ${icon('begleitung', 'icon icon--gross')}
        <h3 class="kachel__titel">Mit Begleitung kommen</h3>
        <p>Sie können gern eine vertraute Person mitbringen – zum Beispiel, wenn Sie nach der Untersuchung nicht selbst fahren dürfen, wenn Sie Hilfe auf dem Weg brauchen oder wenn Sie bei einem ausführlichen Gespräch gern jemanden an Ihrer Seite haben.</p>
      </div>
      <div class="kachel kachel--flach">
        ${icon('zugang', 'icon icon--gross')}
        <h3 class="kachel__titel">Zugang zur Praxis</h3>
        <p>${ctx.angabe('barrierefreiheit')}</p>
        <p>Wenn Sie Unterstützung brauchen, um zu uns zu kommen, sagen Sie es uns bitte bei der Terminvereinbarung.</p>
      </div>
    </div>
  </div>
</section>

<section class="abschnitt" id="notfall" aria-labelledby="notfall-titel">
  <div class="rahmen">
    <div class="abschnitt__kopf">
      <h2 id="notfall-titel">Im Notfall</h2>
      <p>Plötzliche Sehverschlechterung, Lichtblitze, ein Fremdkörper oder eine Verletzung am Auge: Warten Sie in solchen Fällen nicht ab.</p>
    </div>
    ${notfallWege(ctx)}
    <div class="hinweis hinweis--knapp">
      <p><strong>Bei Verätzungen</strong> – etwa durch Reinigungsmittel oder Kalk – spülen Sie das Auge sofort mehrere Minuten lang mit viel klarem Wasser. Lassen Sie sich danach umgehend ärztlich untersuchen.</p>
    </div>
    <p class="weiter"><a class="weiter__link" href="leistungen.html#notfaelle">${icon('pfeil')}<span>Bei welchen Beschwerden Sie sofort handeln sollten</span></a></p>
  </div>
</section>
`;
}
