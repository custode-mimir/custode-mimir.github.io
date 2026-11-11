/* =========================================================
   DEMO SIMULATA DI MIMIR (è l'apertura del sito)
   - Il saluto usa SOLO quello che il browser sa già: ora, giorno,
     dispositivo e fuso orario. Viene calcolato qui, al momento:
     non viene salvato e non viene mandato da nessuna parte
     (nemmeno a GoatCounter).
   - Il saluto è composto da pezzi audio (media/voce/saluto/); le altre
     battute sono gli audio veri di MIMIR (voce Kokoro) in media/voce/.
     Se un audio non si carica, la battuta resta solo in sottotitolo
     (un pezzo del saluto mancante invece si salta).
   - Tutto il resto è scritto a mano, con dati inventati.
   Per modificare le scene, cambia MATTINA e SCENES qui sotto.
   ========================================================= */

/* ---------- 1. Il saluto personalizzato ---------- */
// Il saluto è fatto di pezzi audio (media/voce/saluto/), scelti al momento in base a
// ora, giorno, dispositivo e fuso orario. Ogni pezzo ha il suo testo: il sottotitolo
// dice esattamente le stesse parole dell'audio. L'ora esatta si scrive, non si dice.

const GIORNI = [
  ["giorno-domenica", "È domenica."], ["giorno-lunedi", "È lunedì."], ["giorno-martedi", "È martedì."],
  ["giorno-mercoledi", "È mercoledì."], ["giorno-giovedi", "È giovedì."], ["giorno-venerdi", "È venerdì."],
  ["giorno-sabato", "È sabato."]
];

// solo il fuso Europe/Rome conta come Italia, tutto il resto è «altrove»
function zonaPezzo() {
  let tz = "";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  return tz === "Europe/Rome" ? ["zona-italia", "dall'Italia."] : ["zona-altrove", "da un posto lontano da qui."];
}

// iPhone, telefono Android, Mac e Windows hanno il loro pezzo; iPad, tablet Android,
// Chromebook, Linux e tutti gli altri usano «un dispositivo che non conosco»
function dispositivoPezzo() {
  const ua = navigator.userAgent || "";
  const altro = ["disp-altro", "Mi stai guardando da un dispositivo che non conosco,"];
  if (/iPhone/.test(ua)) return ["disp-iphone", "Mi stai guardando da un iPhone,"];
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return altro; // iPad
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? ["disp-android", "Mi stai guardando da un telefono Android,"] : altro;
  if (/CrOS/.test(ua)) return altro;
  if (/Mac/.test(ua)) return ["disp-mac", "Mi stai guardando da un Mac,"];
  if (/Windows/.test(ua)) return ["disp-windows", "Mi stai guardando da un computer Windows,"];
  return altro;
}

// i pezzi del saluto, in ordine: saluto → giorno → momento → dispositivo → zona → fine
function pezziSaluto(now) {
  const h = now.getHours();
  const pezzi = [];
  if (h >= 5 && h < 12)       pezzi.push(["saluto-buongiorno", "Buongiorno."]);
  else if (h >= 12 && h < 18) pezzi.push(["saluto-pomeriggio", "Buon pomeriggio."]);
  else if (h >= 18)           pezzi.push(["saluto-buonasera", "Buonasera."]);
  else                        pezzi.push(["saluto-notte", "Sei sveglio a quest'ora?"]); // da mezzanotte alle 5
  pezzi.push(GIORNI[now.getDay()]);
  if (h >= 5 && h < 9)  pezzi.push(["momento-mattina", "Mattina presto, per me è l'ora del recap."]);
  if (h >= 20)          pezzi.push(["momento-sera", "La giornata è quasi finita."]);
  pezzi.push(dispositivoPezzo());
  pezzi.push(zonaPezzo());
  pezzi.push(["saluto-fine", "Io sono MIMIR. Odino diede un occhio per la saggezza. A te è bastato un browser."]);
  return pezzi.map(([nome, text]) => ({ audio: "saluto/" + nome, text }));
}

// l'ora esatta, scritta piccola sopra il sottotitolo: «21:40», «00:05»
function oraScritta(now) {
  return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
}

/* ---------- 2. Le scene (dati inventati, senza nomi di persona) ---------- */

const CHIUSURA = "L'ora, il giorno, il dispositivo e la zona li ho capiti dal tuo browser. Non sono usciti da qui. Il resto era inventato.";

// dopo il saluto: una mattina qualunque, valida per chiunque e a qualsiasi ora
const MATTINA = [
  { who: "mimir", text: "Ti faccio sentire come comincia una mattina con me.", audio: "mattina-1" },
  { who: "mimir", text: "Fuori ci sono quattordici gradi, cielo sereno. Giacca leggera e niente ombrello.", audio: "mattina-2",
    card: "Meteo · 14° sereno" },
  { who: "mimir", text: "Hai tre mail nuove. Una è importante: la palestra conferma il rinnovo.", audio: "mattina-3",
    card: "Posta · 3 nuove, 1 importante" },
  { who: "mimir", text: "In agenda: riunione di team alle dieci, dentista alle diciotto.", audio: "mattina-4",
    card: "Agenda · 10:00 riunione · 18:00 dentista" },
  { who: "mimir", text: CHIUSURA, audio: "chiusura" }
];

const SCENES = {
  recap: [
    { who: "user",  text: "Ehi Mimir, buongiorno." },
    { who: "mimir", text: "Buongiorno. Sono le sette e dieci.", audio: "recap-1" },
    { who: "mimir", text: "Fuori ci sono quattordici gradi, cielo sereno.", audio: "recap-2", card: "Meteo · 14° sereno" },
    { who: "mimir", text: "In agenda: riunione di team alle dieci, dentista alle diciotto.", audio: "recap-3", card: "Agenda · 2 impegni" },
    { who: "user",  text: "Il resto dopo, grazie." },
    { who: "mimir", text: "Ricevuto. Lo riprendo quando vuoi.", audio: "recap-4" }
  ],
  casa: [
    { who: "user",  text: "Ehi Mimir, sto uscendo." },
    { who: "mimir", text: "Spengo le luci del soggiorno e avvio il robot aspirapolvere.", audio: "casa-1", card: "Casa · luci spente · robot in pulizia" },
    { who: "mimir", text: "La finestra della cucina è aperta. Te lo segnalo.", audio: "casa-2" },
    { who: "user",  text: "Lasciala così." },
    { who: "mimir", text: "D'accordo. Telecamera dell'ingresso attiva.", audio: "casa-3", card: "Sicurezza · telecamera attiva" }
  ],
  memoria: [
    { who: "user",  text: "Ehi Mimir, dove ho messo i documenti dell'auto?" },
    { who: "mimir", text: "È una memoria privata. Vuoi che la sblocchi?", audio: "memoria-1" },
    { who: "user",  text: "Sì." },
    { who: "mimir", text: "Cassetto della scrivania, cartellina blu. L'hai annotato il tre marzo.", audio: "memoria-2", card: "MUNIN · memoria privata sbloccata" },
    { who: "mimir", text: "Memoria di nuovo nascosta.", audio: "memoria-3" }
  ],
  anomalie: [
    { who: "user",  text: "Ehi Mimir, com'è andata stanotte?" },
    { who: "mimir", text: "Due anomalie. Una l'ho riparata io.", audio: "anomalie-1" },
    { who: "mimir", text: "Il calendario si era disconnesso alle tre. Ricollegato.", audio: "anomalie-2", card: "FORGE · sync ripristinata alle 03:04" },
    { who: "mimir", text: "Il backup notturno non è partito: serve il tuo permesso per liberare spazio.", audio: "anomalie-3", card: "Serve da te · backup" },
    { who: "user",  text: "Procedi." },
    { who: "mimir", text: "Fatto. Annotato nella Black Box.", audio: "anomalie-4", card: "BLACK BOX · azione registrata" }
  ]
};

/* ---------- 3. Elementi della pagina ---------- */
const demoEl   = document.querySelector(".demo");
const subWho   = document.getElementById("sub-who");
const subText  = document.getElementById("sub-text");
const subTime  = document.getElementById("sub-time");
const chip     = document.getElementById("demo-cards");
const playBtn  = document.getElementById("demo-play");
const skipBtn  = document.getElementById("demo-skip");
const sceneBar = document.getElementById("scene-bar");
const endBar   = document.getElementById("end-bar");
const againBtn = document.getElementById("demo-again");
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
// con l'audio vero l'onda (e la sfera) seguono il volume reale della battuta;
// se il volume non è disponibile, l'onda si muove a caso come prima
function animateWave(on, nome) {
  clearInterval(waveTimer);
  if (!on) { bars.forEach(b => (b.style.height = "3px")); return; }
  waveTimer = setInterval(() => {
    const v = nome && volumi[nome];
    if (v) {
      const x = v[Math.min(v.length - 1, Math.floor(player.currentTime / 0.05))] || 0;
      bars.forEach((b, i) => (b.style.height = 3 + x * 24 * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + player.currentTime * 9))) + "px"));
      level(0.2 + x * 0.8);
    } else {
      bars.forEach(b => (b.style.height = 3 + Math.random() * 24 + "px"));
    }
  }, 60);
}
// le sfere si "gonfiano" quando MIMIR parla (variabile --level in style.css)
function level(v) { document.documentElement.style.setProperty("--level", v); }

const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- 4. La voce: gli audio veri di MIMIR (media/voce/) ---------- */
// Un solo elemento <audio> (id="voce" in index.html). Su iPhone Safari blocca l'audio
// che parte da solo: per questo lo "sblocchiamo" a ogni tocco su un tasto della demo
// e precarichiamo tutti gli audio subito dopo il primo tocco.
const player = document.getElementById("voce");
const CARTELLA = "media/voce/";
const NOMI_AUDIO = ["mattina-1", "mattina-2", "mattina-3", "mattina-4", "chiusura",
  "recap-1", "recap-2", "recap-3", "recap-4", "casa-1", "casa-2", "casa-3",
  "memoria-1", "memoria-2", "memoria-3", "anomalie-1", "anomalie-2", "anomalie-3", "anomalie-4", "salta",
  // i pezzi del saluto
  ...["saluto-buongiorno", "saluto-pomeriggio", "saluto-buonasera", "saluto-notte",
      "giorno-lunedi", "giorno-martedi", "giorno-mercoledi", "giorno-giovedi", "giorno-venerdi", "giorno-sabato", "giorno-domenica",
      "momento-mattina", "momento-sera", "disp-iphone", "disp-android", "disp-mac", "disp-windows", "disp-altro",
      "zona-italia", "zona-altrove", "saluto-fine"].map(n => "saluto/" + n)];
const volumi = {};      // nome -> volume dell'audio ogni 50 ms (da 0 a 1), per muovere l'onda
let precaricati = false;
let sblocco = false;

// chiamata dentro il tocco: fa partire (muto) l'elemento audio, così poi può suonare da solo
function sbloccaAudio() {
  if (!player) return;
  if (!player.src) {
    sblocco = true;
    player.muted = true;
    player.src = CARTELLA + "salta.mp3";
    const p = player.play();
    if (p && p.then) p.then(() => { if (sblocco) player.pause(); }).catch(() => {}).finally(() => { if (sblocco) { player.muted = false; sblocco = false; } });
  }
  precarica();
}

// scarica tutti gli audio (così sono pronti) e ne calcola il volume per l'onda
function precarica() {
  if (precaricati || !window.fetch) return;
  precaricati = true;
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  NOMI_AUDIO.forEach(nome => {
    fetch(CARTELLA + nome + ".mp3")
      .then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(buf => {
        if (!Offline) return;
        const ctx = new Offline(1, 1, 44100);
        return new Promise((ok, ko) => { const p = ctx.decodeAudioData(buf, ok, ko); if (p && p.catch) p.catch(ko); });
      })
      .then(audio => { if (audio) volumi[nome] = inviluppo(audio); })
      .catch(() => {}); // se manca, l'onda si muove come prima e l'audio prova comunque a partire
  });
}

// volume (RMS) ogni 50 ms, normalizzato tra 0 e 1
function inviluppo(audio) {
  const dati = audio.getChannelData(0), passo = Math.floor(audio.sampleRate * 0.05), out = [];
  let max = 0;
  for (let i = 0; i < dati.length; i += passo) {
    let somma = 0; const fine = Math.min(i + passo, dati.length);
    for (let j = i; j < fine; j++) somma += dati[j] * dati[j];
    const v = Math.sqrt(somma / (fine - i)); out.push(v); if (v > max) max = v;
  }
  return out.map(v => (max ? v / max : 0));
}

let fermaVoce = null; // serve a interrompere l'audio se premi «Salta» o scegli un'altra scena

// fa partire un audio di media/voce/. Si risolve con:
//   "ok" = suonato fino in fondo · "fermato" = interrotto (Salta, altra scena)
//   "errore" = non si carica o è bloccato
// quandoParte() viene chiamata appena l'audio parte davvero
function suona(nome, quandoParte) {
  return new Promise(resolve => {
    if (!player) return resolve("errore");
    let finito = false;
    const chiudi = esito => {
      if (finito) return; finito = true;
      clearTimeout(scorta); player.onended = player.onerror = null; fermaVoce = null;
      if (esito === "errore") player.pause();
      animateWave(false);
      resolve(esito);
    };
    // rete lenta o audio bloccato: dopo un po' si va avanti comunque
    const scorta = setTimeout(() => chiudi("errore"), 15000);
    fermaVoce = () => { player.pause(); chiudi("fermato"); };
    sblocco = false; player.muted = false;
    player.onended = () => chiudi("ok");
    player.onerror = () => chiudi("errore");
    player.src = CARTELLA + nome + ".mp3";
    const p = player.play();
    const parte = () => { if (!finito) { if (quandoParte) quandoParte(); setState("speaking"); level(1); animateWave(true, nome); } };
    if (p && p.then) p.then(parte).catch(() => chiudi("errore")); else parte();
  });
}

// fa dire una battuta a MIMIR. Se la voce è spenta o l'audio non va,
// la battuta resta in sottotitolo per il tempo di leggerla
async function speak(step) {
  const leggi = () => wait(900 + step.text.length * 45);
  if (!voiceOn.checked || !step.audio) { await leggi(); return false; }
  const esito = await suona(step.audio);
  if (esito === "errore") await leggi();
  return esito === "ok";
}

// il saluto: ora scritta in piccolo, poi i pezzi audio uno dopo l'altro (150 ms tra uno e l'altro).
// Il sottotitolo si allunga pezzo per pezzo, con le stesse parole dell'audio.
// Se un pezzo manca, si salta solo quel pezzo. Con la voce spenta: testo scritto lettera per lettera.
async function diciSaluto(id) {
  const now = new Date();
  const pezzi = pezziSaluto(now);
  showLine("mimir", "");
  subTime.textContent = oraScritta(now);
  subTime.hidden = false;
  if (!voiceOn.checked) {
    await typeLine(pezzi.map(p => p.text).join(" "), id);
    return;
  }
  const detti = [];
  for (let i = 0; i < pezzi.length; i++) {
    if (id !== runId) return;
    const esito = await suona(pezzi[i].audio, () => { detti.push(pezzi[i].text); subText.textContent = detti.join(" "); });
    if (id !== runId || esito === "fermato") return;
    setState(null); level(0.12);
    if (i < pezzi.length - 1) await wait(150);
  }
  await wait(700);
}

function setState(state) {
  demoEl.classList.remove("listening", "speaking");
  if (state) demoEl.classList.add(state);
}
function showLine(who, text) {
  subTime.hidden = true; // l'ora scritta compare solo durante il saluto (diciSaluto)
  subWho.textContent = who === "user" ? "TU" : "MIMIR";
  subText.textContent = text;
}

// sottotitolo scritto lettera per lettera (solo per il saluto con la voce spenta)
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
      // l'onda si muove solo se l'audio parte davvero (lo decide speak)
      setState(null); level(0.15); animateWave(false);
      showLine("mimir", step.text);
      await speak(step);
      setState(null); animateWave(false); level(0.15);
      await wait(400);
    }
  }
  return id === runId;
}

function stopAll() {
  runId++;
  if (fermaVoce) fermaVoce();
  animateWave(false); level(0); setState(null);
}

function finish(completed) {
  if (completed) conta("demo-completata");
  setState(null); level(0); animateWave(false);
  skipBtn.hidden = true;
  playBtn.hidden = true;
  sceneBar.hidden = false;
  endBar.hidden = false; // alla fine: «Riprova» e «Scopri come è fatto ↓»
}

async function play(nome) {
  stopAll();
  scenaCorrente = nome;
  const id = runId;
  chip.textContent = "";
  playBtn.hidden = true;
  skipBtn.hidden = false;
  sceneBar.hidden = true;
  endBar.hidden = true;
  document.querySelectorAll(".scene").forEach(b => b.classList.toggle("active", b.dataset.scene === nome));

  let ok;
  if (nome === "saluto") {
    await diciSaluto(id);
    ok = id === runId && await runLines(MATTINA, id);
  } else {
    ok = await runLines(SCENES[nome], id);
  }
  if (id === runId) finish(ok);
}

/* ---------- 5. Tasti (ogni tocco sblocca anche l'audio per iPhone) ---------- */
playBtn.addEventListener("click", () => { sbloccaAudio(); conta("prova-mimir"); play("saluto"); });

// «Riprova»: rifà la stessa scena appena finita
againBtn.addEventListener("click", () => { sbloccaAudio(); play(scenaCorrente || "saluto"); });

skipBtn.addEventListener("click", () => {
  sbloccaAudio();
  stopAll();
  // se salti il saluto, resta comunque la frase onesta sui dati del browser (con il suo audio)
  const battuta = scenaCorrente === "saluto"
    ? { who: "mimir", text: CHIUSURA, audio: "chiusura" }
    : { who: "mimir", text: "Va bene, mi fermo qui.", audio: "salta" };
  showLine("mimir", battuta.text);
  finish(false);
  const id = runId;
  speak(battuta).then(() => { if (id === runId) { setState(null); level(0); } });
});

document.querySelectorAll(".scene").forEach(btn => {
  btn.addEventListener("click", () => {
    sbloccaAudio();
    conta("scena-" + btn.dataset.scene);
    play(btn.dataset.scene);
  });
});
