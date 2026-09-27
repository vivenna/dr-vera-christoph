// Wichtige Infos: Was mitbringen, Pupillenerweiterung und Fahrtüchtigkeit,
// Begleitperson, Notfälle. Nur allgemein gültige Hinweise, keine erfundenen Praxisregeln.

import { praxis } from '../../gemeinsam/praxis.mjs';
import { symbol, seitenkopf, abschnitt, notfallKacheln, trennen } from '../bausteine.mjs';

export const seite = {
  datei: 'wichtige-infos.html',
  titel: `Wichtige Infos für Ihren Besuch – Augenarztpraxis ${praxis.aerztin}`,
  beschreibung: 'Was Sie zum Termin mitbringen, warum Sie nach dem Erweitern der Pupillen nicht selbst fahren sollten, Begleitperson und was im Notfall zu tun ist.',
  nav: 'infos',
  menue: 'Wichtige Infos',
};

const MITBRINGEN = [
  ['karte', 'Versichertenkarte', 'Ihre elektronische Gesundheitskarte oder den Nachweis Ihrer privaten Krankenversicherung.'],
  ['dokument', 'Überweisung', 'Falls Sie eine Überweisung haben, zum Beispiel von Ihrer Hausarztpraxis.'],
  ['brille', 'Brille und Kontaktlinsen-Pass', 'Alle Brillen, die Sie zurzeit tragen – auch die Lesebrille – und, falls vorhanden, Ihren Kontaktlinsen-Pass.'],
  ['medikamente', 'Medikamentenplan', 'Eine aktuelle Liste Ihrer Medikamente, einschließlich aller Augentropfen.'],
  ['mappe', 'Vorbefunde', 'Arztbriefe und Befunde früherer Augenuntersuchungen, etwa aus einer Klinik oder einer anderen Praxis.'],
];

const SPRUNG = [
  ['mitbringen', 'Mitbringen'],
  ['pupillen', 'Pupillenerweiterung'],
  ['begleitung', 'Begleitperson'],
  ['notfall', 'Im Notfall'],
];

export default function inhalt(ctx) {
  const { esc } = ctx;

  return `
${seitenkopf({
  stichwort: 'Vor dem Termin',
  titel: 'Wichtige Infos für Ihren Besuch',
  einleitung: 'Mit ein wenig Vorbereitung verläuft Ihr Termin entspannter. Hier lesen Sie, was Sie mitbringen sollten, was nach einer Pupillenerweiterung gilt und was im Notfall zu tun ist.',
  zusatz: `<nav class="sprungliste" aria-label="Auf dieser Seite">
<ul>
${SPRUNG.map(([id, text]) => `<li><a href="#${id}">${esc(text)}</a></li>`).join('\n')}
</ul>
</nav>`,
})}

${abschnitt({
  id: 'mitbringen',
  stichwort: 'Checkliste',
  rand: '<p class="rand-text">Legen Sie die Unterlagen am besten schon am Vortag bereit.</p>',
  titel: 'Bitte bringen Sie mit',
  inhalt: `<ul class="mitbringen">
${MITBRINGEN.map(([s, titel, text]) => `<li>${symbol(s, 'symbol-gross')}<strong>${trennen(esc(titel))}</strong><span>${esc(text)}</span></li>`).join('\n')}
</ul>`,
})}

${abschnitt({
  id: 'pupillen',
  stichwort: 'Fahrtüchtigkeit',
  rand: `<p class="merksatz">${symbol('auto', 'symbol-gross')}<span>Nach dem Erweitern der Pupillen sind Sie mehrere Stunden nicht fahrtüchtig.</span></p>`,
  titel: 'Nach der Pupillenerweiterung nicht selbst fahren',
  inhalt: `<p>Für manche Untersuchungen, etwa um den Augenhintergrund genau zu betrachten, erweitern wir Ihre Pupillen mit Augentropfen. Danach sehen Sie für einige Stunden unscharf und sind empfindlich gegen helles Licht.</p>
<p>In dieser Zeit dürfen Sie nicht selbst Auto fahren – und auch Fahrradfahren ist nicht sicher. Fragen Sie bei der Terminvereinbarung gern nach, ob bei Ihrem Termin eine Pupillenerweiterung vorgesehen ist.</p>
<ul class="haken-liste">
<li>${symbol('sonne')}<span><strong>Sonnenbrille mitbringen</strong> – sie macht den Heimweg angenehmer.</span></li>
<li>${symbol('auto')}<span><strong>Nicht mit dem eigenen Auto kommen</strong>, wenn eine Pupillenerweiterung möglich ist.</span></li>
<li>${symbol('bus')}<span><strong>Rückweg planen:</strong> mit dem Bus (Haltestelle ${esc(ctx.anfahrt.haltestelle)}), mit dem Taxi oder mit einer Begleitperson.</span></li>
</ul>`,
})}

${abschnitt({
  id: 'begleitung',
  stichwort: 'Begleitung',
  titel: 'Sie möchten nicht allein kommen?',
  inhalt: `<div class="zweiteilig zweiteilig-symbol">
<div class="text">
<p>Sie können gern eine vertraute Person mitbringen – zum Beispiel, wenn Ihre Pupillen erweitert werden, wenn Sie schlecht sehen oder wenn Sie beim Gespräch Unterstützung wünschen. Eine Begleitung kann Sie nach der Untersuchung auch sicher nach Hause bringen.</p>
</div>
${symbol('personen', 'symbol-bild')}
</div>`,
})}

${abschnitt({
  id: 'notfall',
  stichwort: 'Notfall',
  titel: 'Im Notfall',
  inhalt: `<p>Plötzliche Sehverschlechterung, starke Schmerzen, neue Lichtblitze oder eine Verletzung am Auge sind Notfälle. Bitte warten Sie dann nicht ab.</p>
${notfallKacheln(ctx)}
<div class="hinweis hinweis-wichtig">
${symbol('notfaelle', 'hinweis-symbol')}
<div class="hinweis-inhalt">
<h3 class="hinweis-titel">Verätzung: sofort spülen</h3>
<p>Ist ein Reinigungsmittel, Kalk, Zement oder eine andere Chemikalie ins Auge gelangt, spülen Sie das Auge sofort mit viel Wasser – mehrere Minuten lang, mit geöffnetem Lid. Lassen Sie das Auge danach umgehend untersuchen: während der Sprechzeiten bei uns, sonst über den ärztlichen Bereitschaftsdienst 116 117 – bei Lebensgefahr über den Notruf 112.</p>
</div>
</div>
<p><a class="mehr-link" href="leistungen.html#notfaelle">Alle Warnzeichen für einen Augennotfall${symbol('pfeil')}</a></p>`,
})}
`;
}
