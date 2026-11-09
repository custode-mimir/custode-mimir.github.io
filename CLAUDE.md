# Regole per lavorare sul sito di MIMIR

## Anonimato totale
- Il sito e il repository sono anonimi. Mai il nome vero dell'autore:
  né nei file, né nei testi, né nei metadati, né nei messaggi di commit.
- L'autore è sempre e solo «il Custode (ᚱ)». Firma della nota:
  «— ᚱ, il Custode». Footer: «Fatto a mano dal Custode · ᚱ».
  Metadati (meta author ecc.): «il Custode».
- Commit sempre con autore «il Custode» e email
  custode-mimir@users.noreply.github.com, mai altre email.
- Niente link a profili personali (GitHub, LinkedIn, social).
- Il repository è pubblico: mai password, token, chiavi API, email
  personali o dati reali in nessun file. Se una modifica ne richiedesse
  uno, fermati e chiedilo al Custode in chat prima di procedere.

## Come lavoriamo
- Lavori solo su quello che ti scrivo in chat. Non aspettarti commenti
  su GitHub o nel repository: tutte le istruzioni arrivano dalla chat.
- Lavori in autonomia, il più possibile. Se ti serve una decisione o
  un'informazione, me la chiedi in chat con una domanda breve
  e io ti dico se puoi procedere o no.
- Rispondi sempre in italiano, in modo semplice: sono alle prime armi.
- Dopo ogni modifica scrivi in massimo 3 righe cosa hai cambiato.

## Pubblicazione
- Ogni modifica va pubblicata subito sul branch main, così GitHub Pages
  aggiorna il sito (https://custode-mimir.github.io/) in circa
  un minuto e io lo vedo nella finestra accanto.
- Niente pull request, a meno che non te lo chieda io.
- Se non riesci a pubblicare su main, dimmelo in chat e spiegami
  in parole semplici cosa devo cliccare.

## Il sito
- Un'unica pagina verticale che si scorre dall'alto verso il basso.
  Niente pagine separate, niente schede, niente slide.
- Sito statico per GitHub Pages: solo HTML, CSS e JavaScript.
  Niente build, niente npm, niente framework. Percorsi relativi.
  Unica eccezione: 404.html usa percorsi che partono da «/», perché
  GitHub la mostra anche per indirizzi dentro sottocartelle.
- 404.html: runa ᛗ, «Questa pagina non esiste. Nemmeno Mímir la
  ricorda.» e tasto «Torna all'inizio».
- Pagina corta: 4 capitoli, ognuno con la sua runa (filo conduttore):
  ᛗ Apertura = Demo · ᛞ Una giornata (compatta) · ᛟ Moduli + storia del
  nome (orbita + tessere) · ᛃ Come è fatto + Stato dei lavori (#stato)
  + privacy in breve + nota firmata + domande.
- Niente doppioni e niente sezioni lunghe: tolti «Chiamalo/Parla/Ascolta»,
  il disegno Mac/iPhone, la tabella privacy grande, il blocco finale.
- Mai nascondere contenuti in attesa dello scorrimento (niente effetti
  "compare quando scorri"): tutto deve essere visibile subito.
- Stile: personale, non da Apple. Tutto su nero caldo, niente fasce
  bianche. Titoli di misura media con carattere; le rune guidano.
- Font: Inter (cartella fonts/), SF Pro su Mac e iPhone. Niente serif,
  niente Orbitron o font "futuristici". Unica eccezione: Noto Sans Runic,
  solo per i simboli delle rune.
- Colori dell'intro dell'app (D-040), variabili in cima a style.css:
  · sfondo nero caldo #0b0907; testo crema --cream #f3e6c8;
  · --gold #e8b45a: oro principale (pallino «in ascolto», runa attiva,
    onda della voce, etichette, tasti);
  · --gold-light #ffd98a: solo bagliori e luci (sfera, onda che parla);
  · --gold-dim #8a7350: oro spento, scritte secondarie;
  · --bronze #5a4b33 e --bronze-dark #2a2418: bordi e linee.
  · Etichette: «Funziona oggi» pieno oro con testo nero; «In sviluppo»
    solo contorno oro; «In programma» oro spento tratteggiato.
  · Interruttori accesi: bianchi. Niente verde, fucsia, viola o acqua.
- MIMIR è solo vocale: nella demo niente caselle di testo e niente microfono.
- Niente reattore 3D: c'è la sfera luminosa fatta con CSS (orb-core),
  solo nell'apertura, che è anche il palco della demo.
- Orbita dei moduli lentissima, si ferma col mouse sopra.
- Tessere dei moduli: stesso funzionamento su computer e telefono.
  Davanti solo runa, nome ed etichetta; dietro descrizione e nota
  mitologica. Clic, tocco, Invio o Spazio = la tessera si gira; una alla
  volta (aprendone una, l'altra si richiude). Indizi: «↻» nell'angolo,
  inclinazione 3D col mouse sopra (solo computer), e la prima volta che
  arrivano sullo schermo la prima fa da sola mezzo giro e torna (una
  volta sola, mai con le animazioni disattivate).
- Su telefono c'è il menu "Capitoli" in alto. Il tasto «Prova MIMIR»
  deve vedersi su iPhone senza scorrere (anche iPhone SE).

## La demo (demo.js) = l'apertura
- Tasto grande «Prova MIMIR». MIMIR saluta usando SOLO quello che il
  browser sa già: buongiorno/buon pomeriggio/buonasera, giorno e ora,
  dispositivo (iPhone, iPad, Mac, Windows, Android…), zona dal fuso
  orario (es. Europe/Rome → «dall'Italia», altrimenti «dalle tue parti»).
- Testo del saluto: «Buonasera. È martedì, sono le 21:40. Mi stai
  guardando da un iPhone, dall'Italia. Io sono MIMIR. Odino diede un
  occhio per la saggezza. A te è bastato un browser.»
- L'ora del saluto è sempre in cifre: «sono le 12:19», «sono le 00:05»
  (mai «è mezzogiorno», «è mezzanotte» o «è l'una»).
- L'onda si muove SOLO quando c'è la voce: ferma durante il saluto
  scritto, quando parli tu o se la voce è spenta.
- Il saluto è SOLO sottotitolo, scritto lettera per lettera, senza voce
  (è dinamico: non si può registrare). La voce parte dalla frase dopo:
  «Ti faccio sentire come comincia una mattina con me.», poi un recap
  inventato SENZA nomi di persona, poi la chiusura: «L'ora, il giorno,
  il dispositivo e la zona li ho capiti dal tuo browser. Non sono usciti
  da qui. Il resto era inventato.»
- I dati del saluto si calcolano al momento: mai salvati, mai inviati
  (nemmeno a GoatCounter).
- Dopo il saluto si scelgono le altre scene; c'è sempre «Salta».
- Alla fine (anche dopo «Salta») due tasti: «Riprova» (rifà la stessa
  scena) e «Scopri come è fatto ↓» (porta a #come).
- Voce spenta di default: la demo parte con i soli sottotitoli.
  Accanto all'interruttore la nota piccola «Voce di prova del browser:
  quella vera di MIMIR arriva presto».
- Voce del browser (finché non arrivano gli audio veri): la voce italiana
  migliore disponibile, in quest'ordine: «Natural»/«Online» (Edge: Diego,
  Giuseppe) → «Premium»/«Enhanced»/«Avanzata» (Safari: Luca) → Google
  (Chrome) → qualsiasi italiana. A parità, voci maschili. Si aspetta
  l'evento voiceschanged. Velocità 1.0 e tono 1.0 (mai abbassarlo).
- Se il browser non ha nessuna voce italiana: niente voce predefinita.
  Demo solo con sottotitoli, interruttore «Voce» spento e la nota
  «Il tuo browser non ha una voce italiana».
- Tutto il resto della demo è simulato: mai dati personali reali.

## Statistiche (GoatCounter, codice mimir-site)
- contatore.js (nel sito, in fondo a index.html) è l'UNICA eccezione
  alla regola «nessuna chiamata a siti esterni». Manda solo: la visita
  (pagina, titolo, referrer) e il nome fisso degli eventi.
- Eventi: «prova-mimir» (tasto della demo) · «scena-<nome>» (scelta di una
  scena: saluto, recap, casa, memoria, anomalie) · «demo-completata»
  (scena arrivata alla fine) · «segui-progetto» · «tessera-<modulo>»
  (tessera girata, su computer e telefono) · «menu-capitoli».
- Nella privacy c'è la riga: «Conto le visite con GoatCounter: niente
  cookie, nessun dato personale.»
- Font, immagini e tutto il resto restano nel sito: nessun'altra
  chiamata esterna.

## Onestà: "vendere senza vendere"
- Al presente solo ciò che funziona già. Il resto si scrive "in arrivo".
- Ogni funzione descritta (giornata, privacy, FAQ, tessere, come è fatto) ha
  un'etichetta piccola: "Funziona oggi", "In sviluppo" o "In programma".
  Prima di assegnarne una nuova, chiedi al Custode in chat.
- In apertura c'è l'etichetta "Anteprima · in sviluppo".
- Titolo dell'apertura (scelto dal Custode): «Vive sul mio Mac. Sta imparando
  a parlare.» Sottotitolo: «Ragiona in italiano e tiene i miei dati in casa.
  Presto ricorderà quello che conta. Lo sto costruendo un pezzo alla volta.»
  La storia del nome finisce con «Gli ho dato un Mac.»
- Il tasto in alto si chiama «Stato dei lavori» (niente "Compra" o
  "Scarica") e porta all'ancora #stato. Si rinominerà «Segui il
  progetto» quando ci saranno i social. L'evento resta «segui-progetto».
- Niente link a LinkedIn, da nessuna parte del sito.
- Niente link al repository GitHub nel sito (nemmeno nel footer).
- Se un riquadro mostra più funzioni con stati diversi, si usa
  l'etichetta di quella meno avanti.
- Stati attuali (decisi dal Custode):
  Funziona oggi: modello AI locale sul Mac.
  In sviluppo: recap del mattino, memoria privata, memoria continua,
  parola di attivazione e voce, MUNIN, KVASIR, GALAXY.
  In programma: «Sto uscendo» (casa), ricerca, auto-riparazione notturna,
  posta, casa, app per iPhone, SAGA, FORGE, LAB, VAULT, BLACK BOX.
- Niente numeri riempitivi (tipo "1 · 8 · 0 · 24/7") e niente nastro di
  parole giganti.

## Condivisione
- In index.html ci sono i tag Open Graph (og:title, og:description,
  og:image, og:url): tienili aggiornati se cambiano titolo o descrizione.
- og-image.png (1200x630) è l'anteprima per LinkedIn e gli altri social.
- favicon.svg è l'icona della scheda: la runa ᛗ.
- Documenti di revisione o appunti privati non vanno mai nel repository:
  è pubblico.
