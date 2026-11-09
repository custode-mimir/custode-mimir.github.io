/* =========================================================
   DEMO SIMULATA DI MIMIR (è l'apertura del sito)
   - Il saluto usa SOLO quello che il browser sa già: ora, giorno,
     dispositivo e fuso orario. Viene calcolato qui, al momento:
     non viene salvato e non viene mandato da nessuna parte
     (nemmeno a GoatCounter).
   - Il saluto è solo sottotitolo, scritto lettera per lettera, senza voce.
     La voce (del browser, per ora) parte dalla frase successiva.
   - Tutto il resto è scritto a mano, con dati inventati.
   Per modificare le scene, cambia MATTINA e SCENES qui sotto.
   ========================================================= */

/* ---------- 1. Il saluto personalizzato ---------- */

// fuso orario -> da dove ci stai guardando (zona approssimativa)
const ZONE = {
  "Europe/Rome": "dall'Italia", "Europe/Vatican": "dall'Italia", "Europe/San_Marino": "da San Marino",
  "Europe/Zurich": "dalla Svizzera", "Europe/Paris": "dalla Francia", "Europe/Berlin": "dalla Germania",
  "Europe/Madrid": "dalla Spagna", "Europe/Lisbon": "dal Portogallo", "Europe/London": "dal Regno Unito",
  "Europe/Dublin": "dall'Irlanda", "Europe/Amsterdam": "dai Paesi Bassi", "Europe/Brussels": "dal Belgio",
  "Europe/Luxembourg": "dal Lussemburgo", "Europe/Vienna": "dall'Austria", "Europe/Prague": "dalla Repubblica Ceca",
  "Europe/Warsaw": "dalla Polonia", "Europe/Budapest": "dall'Ungheria", "Europe/Bucharest": "dalla Romania",
  "Europe/Zagreb": "dalla Croazia", "Europe/Ljubljana": "dalla Slovenia", "Europe/Athens": "dalla Grecia",
  "Europe/Malta": "da Malta", "Europe/Stockholm": "dalla Svezia", "Europe/Oslo": "dalla Norvegia",
  "Europe/Copenhagen": "dalla Danimarca", "Europe/Helsinki": "dalla Finlandia", "Atlantic/Reykjavik": "dall'Islanda",
  "Europe/Kyiv": "dall'Ucraina", "Europe/Kiev": "dall'Ucraina", "Europe/Istanbul": "dalla Turchia",
  "Europe/Moscow": "dalla Russia", "Asia/Jerusalem": "da Israele", "Asia/Dubai": "dagli Emirati Arabi",
  "Asia/Kolkata": "dall'India", "Asia/Calcutta": "dall'India", "Asia/Shanghai": "dalla Cina", "Asia/Hong_Kong": "da Hong Kong",
  "Asia/Singapore": "da Singapore", "Asia/Tokyo": "dal Giappone", "Asia/Seoul": "dalla Corea del Sud",
  "Africa/Cairo": "dall'Egitto", "Africa/Johannesburg": "dal Sudafrica",
  "America/New_York": "dagli Stati Uniti", "America/Chicago": "dagli Stati Uniti", "America/Denver": "dagli Stati Uniti",
  "America/Phoenix": "dagli Stati Uniti", "America/Los_Angeles": "dagli Stati Uniti", "America/Anchorage": "dagli Stati Uniti",
  "Pacific/Honolulu": "dagli Stati Uniti", "America/Toronto": "dal Canada", "America/Vancouver": "dal Canada",
  "America/Montreal": "dal Canada", "America/Mexico_City": "dal Messico", "America/Sao_Paulo": "dal Brasile",
  "America/Argentina/Buenos_Aires": "dall'Argentina", "America/Buenos_Aires": "dall'Argentina",
  "Australia/Sydney": "dall'Australia", "Australia/Melbourne": "dall'Australia", "Australia/Perth": "dall'Australia",
  "Pacific/Auckland": "dalla Nuova Zelanda"
};

function zona() {
  let tz = "";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  return ZONE[tz] || "dalle tue parti";
}

function dispositivo() {
  const ua = navigator.userAgent || "";
  if (/iPhone/.test(ua)) return "un iPhone";
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "un iPad";
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? "un telefono Android" : "un tablet Android";
  if (/Mac/.test(ua)) return "un Mac";
  if (/Windows/.test(ua)) return "un computer Windows";
  if (/CrOS/.test(ua)) return "un Chromebook";
  if (/Linux/.test(ua)) return "un computer Linux";
  return "questo dispositivo";
}

function saluto() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes();
  const buon = h >= 5 && h < 12 ? "Buongiorno" : h >= 12 && h < 18 ? "Buon pomeriggio" : "Buonasera";
  const giorno = now.toLocaleDateString("it-IT", { weekday: "long" });
  // l'ora sempre in cifre: «sono le 12:19», «sono le 00:05»
  const ora = "sono le " + (h === 0 ? "00" : h) + ":" + String(m).padStart(2, "0");
  return `${buon}. È ${giorno}, ${ora}. Mi stai guardando da ${dispositivo()}, ${zona()}. ` +
         `Io sono MIMIR. Odino diede un occhio per la saggezza. A te è bastato un browser.`;
}

/* ---------- 2. Le scene (dati inventati, senza nomi di persona) ---------- */

const CHIUSURA = "L'ora, il giorno, il dispositivo e la zona li ho capiti dal tuo browser. Non sono usciti da qui. Il resto era inventato.";

// dopo il saluto: una mattina qualunque, valida per chiunque e a qualsiasi ora
const MATTINA = [
  { who: "mimir", text: "Ti faccio sentire come comincia una mattina con me." },
  { who: "mimir", text: "Fuori ci sono quattordici gradi, cielo sereno. Giacca leggera e niente ombrello.",
    card: "Meteo · 14° sereno" },
  { who: "mimir", text: "Hai tre mail nuove. Una è importante: la palestra conferma il rinnovo.",
    card: "Posta · 3 nuove, 1 importante" },
  { who: "mimir", text: "In agenda: riunione di team alle dieci, dentista alle diciotto.",
    card: "Agenda · 10:00 riunione · 18:00 dentista" },
  { who: "mimir", text: CHIUSURA }
];

const SCENES = {
  recap: [
    { who: "user",  text: "Ehi Mimir, buongiorno." },
    { who: "mimir", text: "Buongiorno. Sono le sette e dieci." },
    { who: "mimir", text: "Fuori ci sono quattordici gradi, cielo sereno.", card: "Meteo · 14° sereno" },
    { who: "mimir", text: "In agenda: riunione di team alle dieci, dentista alle diciotto.", card: "Agenda · 2 impegni" },
    { who: "user",  text: "Il resto dopo, grazie." },
    { who: "mimir", text: "Ricevuto. Lo riprendo quando vuoi." }
  ],
  casa: [
    { who: "user",  text: "Ehi Mimir, sto uscendo." },
    { who: "mimir", text: "Spengo le luci del soggiorno e avvio il robot aspirapolvere.", card: "Casa · luci spente · robot in pulizia" },
    { who: "mimir", text: "La finestra della cucina è aperta. Te lo segnalo." },
    { who: "user",  text: "Lasciala così." },
    { who: "mimir", text: "D'accordo. Telecamera dell'ingresso attiva.", card: "Sicurezza · telecamera attiva" }
  ],
  memoria: [
    { who: "user",  text: "Ehi Mimir, dove ho messo i documenti dell'auto?" },
    { who: "mimir", text: "È una memoria privata. Vuoi che la sblocchi?" },
    { who: "user",  text: "Sì." },
    { who: "mimir", text: "Cassetto della scrivania, cartellina blu. L'hai annotato il tre marzo.", card: "MUNIN · memoria privata sbloccata" },
    { who: "mimir", text: "Memoria di nuovo nascosta." }
  ],
  anomalie: [
    { who: "user",  text: "Ehi Mimir, com'è andata stanotte?" },
    { who: "mimir", text: "Due anomalie. Una l'ho riparata io." },
    { who: "mimir", text: "Il calendario si era disconnesso alle tre. Ricollegato.", card: "FORGE · sync ripristinata alle 03:04" },
    { who: "mimir", text: "Il backup notturno non è partito: serve il tuo permesso per liberare spazio.", card: "Serve da te · backup" },
    { who: "user",  text: "Procedi." },
    { who: "mimir", text: "Fatto. Annotato nella Black Box.", card: "BLACK BOX · azione registrata" }
  ]
};

/* ---------- 3. Elementi della pagina ---------- */
const demoEl   = document.querySelector(".demo");
const subWho   = document.getElementById("sub-who");
const subText  = document.getElementById("sub-text");
const chip     = document.getElementById("demo-cards");
const playBtn  = document.getElementById("demo-play");
const skipBtn  = document.getElementById("demo-skip");
const sceneBar = document.getElementById("scene-bar");
const voiceOn  = document.getElementById("voice-on");
const wave     = document.getElementById("wave");

let runId = 0; // serve per fermare una scena se ne scegli un'altra o premi "Salta"
let scenaCorrente = "";

// statistiche: solo nomi fissi, MAI i dati del saluto (vedi contatore.js)
function conta(nome) {
  if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: nome, title: nome, event: true });
}

// onda sonora
const bars = Array.from({ length: 28 }, () => wave.appendChild(document.createElement("i")));
let waveTimer = null;
function animateWave(on) {
  clearInterval(waveTimer);
  if (!on) { bars.forEach(b => (b.style.height = "3px")); return; }
  waveTimer = setInterval(() => bars.forEach(b => (b.style.height = 3 + Math.random() * 24 + "px")), 110);
}
// le sfere si "gonfiano" quando MIMIR parla (variabile --level in style.css)
function level(v) { document.documentElement.style.setProperty("--level", v); }

const wait = ms => new Promise(r => setTimeout(r, ms));

// voce del browser (gratuita, integrata). Nella Fase 3 arriveranno gli audio veri.
// La voce è SPENTA di default: la demo parte con i soli sottotitoli, la accendi tu con l'interruttore.
// Scegliamo la voce italiana migliore disponibile, con questa priorità:
//   4 = «Natural» o «Online» nel nome (Edge: Diego, Giuseppe)
//   3 = «Premium», «Enhanced» o «Avanzata» (Safari, es. Luca)
//   2 = voce italiana di Google (Chrome)
//   1 = qualsiasi altra voce italiana
// A parità di livello vincono le voci maschili (Diego, Giuseppe, Luca, Cosimo).
let voceScelta = null;

function punteggio(v) {
  const n = v.name || "";
  let p = /natural|online/i.test(n) ? 4 : /premium|enhanced|avanzat/i.test(n) ? 3 : /google/i.test(n) ? 2 : 1;
  if (/diego|giuseppe|luca|cosimo|\bmale\b|maschil/i.test(n)) p += 0.5; // preferenza per le voci maschili
  if (/^it[-_]IT/i.test(v.lang)) p += 0.1;                               // italiano d'Italia prima di it-CH
  return p;
}
function scegliVoce() {
  const italiane = speechSynthesis.getVoices().filter(v => /^it([-_]|$)/i.test(v.lang));
  italiane.sort((a, b) => punteggio(b) - punteggio(a));
  voceScelta = italiane[0] || null;
}
// le voci a volte arrivano in ritardo: aspettiamo l'evento voiceschanged (al massimo 1,5 secondi)
const vociPronte = !("speechSynthesis" in window) ? Promise.resolve() : new Promise(resolve => {
  if (speechSynthesis.getVoices().length) { scegliVoce(); return resolve(); }
  const fatto = () => { scegliVoce(); resolve(); };
  speechSynthesis.addEventListener("voiceschanged", fatto, { once: true });
  setTimeout(fatto, 1500);
});
if ("speechSynthesis" in window) speechSynthesis.addEventListener("voiceschanged", () => { scegliVoce(); aggiornaVoce(); });

// se il browser non ha nessuna voce italiana: niente voce predefinita (sarebbe inglese o robotica),
// demo solo con sottotitoli, interruttore «Voce» spento e una nota piccola
function aggiornaVoce() {
  const nota = document.getElementById("voice-note");
  const prova = document.getElementById("voice-hint");
  const manca = !voceScelta;
  voiceOn.disabled = manca;
  if (manca) voiceOn.checked = false;
  if (nota) nota.hidden = !manca;
  if (prova) prova.hidden = manca; // senza voce italiana resta solo la nota qui sopra
}
vociPronte.then(aggiornaVoce);

function speak(text) {
  return new Promise(async resolve => {
    if (!voiceOn.checked || !("speechSynthesis" in window)) return setTimeout(resolve, 900 + text.length * 45);
    await vociPronte;
    if (!voceScelta) return setTimeout(resolve, 900 + text.length * 45); // nessuna voce italiana: solo sottotitoli
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "it-IT";
    if (voceScelta) u.voice = voceScelta;
    u.rate = 1.0; u.pitch = 1.0; // tono naturale: abbassarlo rende la voce più robotica
    u.onend = resolve; u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

function setState(state) {
  demoEl.classList.remove("listening", "speaking");
  if (state) demoEl.classList.add(state);
}
function showLine(who, text) {
  subWho.textContent = who === "user" ? "TU" : "MIMIR";
  subText.textContent = text;
}

// sottotitolo scritto lettera per lettera (solo per il saluto, senza voce)
async function typeLine(text, id) {
  subWho.textContent = "MIMIR";
  subText.textContent = "";
  const caret = document.createElement("span");
  caret.className = "caret";
  // solo sottotitolo, senza voce: l'onda resta ferma, la sfera ha solo un battito leggero
  setState(null); animateWave(false); level(0.12);
  for (let i = 0; i < text.length; i++) {
    if (id !== runId) return;
    subText.textContent = text.slice(0, i + 1);
    subText.appendChild(caret);
    await wait(/[.,]/.test(text[i]) ? 220 : 32);
  }
  caret.remove();
  level(0); setState(null);
  await wait(900);
}

async function runLines(lines, id) {
  for (const step of lines) {
    if (id !== runId) return false;
    if (step.card) chip.textContent = step.card;
    if (step.who === "user") {
      setState("listening"); level(0.1); animateWave(false); // parli tu: niente voce, onda ferma
      showLine("user", step.text);
      await wait(1100 + step.text.length * 30);
    } else {
      const conVoce = voiceOn.checked && "speechSynthesis" in window && !!voceScelta;
      setState(conVoce ? "speaking" : null); level(conVoce ? 1 : 0.15); animateWave(conVoce);
      showLine("mimir", step.text);
      await speak(step.text);
      animateWave(false); level(0.15);
      await wait(400);
    }
  }
  return id === runId;
}

function stopAll() {
  runId++;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  animateWave(false); level(0); setState(null);
}

function finish(completed) {
  if (completed) conta("demo-completata");
  setState(null); level(0); animateWave(false);
  skipBtn.hidden = true;
  playBtn.hidden = true;
  sceneBar.hidden = false;
}

async function play(nome) {
  stopAll();
  scenaCorrente = nome;
  const id = runId;
  chip.textContent = "";
  playBtn.hidden = true;
  skipBtn.hidden = false;
  sceneBar.hidden = true;
  document.querySelectorAll(".scene").forEach(b => b.classList.toggle("active", b.dataset.scene === nome));

  let ok;
  if (nome === "saluto") {
    await typeLine(saluto(), id);
    ok = id === runId && await runLines(MATTINA, id);
  } else {
    ok = await runLines(SCENES[nome], id);
  }
  if (id === runId) finish(ok);
}

/* ---------- 4. Tasti ---------- */
playBtn.addEventListener("click", () => { conta("prova-mimir"); play("saluto"); });

skipBtn.addEventListener("click", () => {
  stopAll();
  // se salti il saluto, resta comunque la frase onesta sui dati del browser
  showLine("mimir", scenaCorrente === "saluto" ? CHIUSURA : "Va bene, mi fermo qui.");
  finish(false);
});

document.querySelectorAll(".scene").forEach(btn => {
  btn.addEventListener("click", () => {
    conta("scena-" + btn.dataset.scene);
    play(btn.dataset.scene);
  });
});
