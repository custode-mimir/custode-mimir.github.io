/* =========================================================
   DATI DEL SITO: stato.json e diario.json (nella radice)
   - stato.json: etichette delle tessere dei moduli e voci dello
     «Stato dei lavori». Valori ammessi: "oggi", "sviluppo", "programma".
   - diario.json: le voci del «Diario dei lavori», mostrate dalla più recente.
   L'HTML contiene già una copia delle etichette: se un file non si carica
   o ha un errore, resta quella e il sito funziona lo stesso.
   I testi si inseriscono sempre come testo semplice (mai come HTML).
   ========================================================= */

(() => {
  const STATI = {
    oggi:      { classe: "tag-o", etichetta: "Funziona oggi", colonna: "done", titolo: "Funziona oggi" },
    sviluppo:  { classe: "tag-s", etichetta: "In sviluppo",   colonna: "now",  titolo: "In sviluppo" },
    programma: { classe: "tag-p", etichetta: "In programma",  colonna: "next", titolo: "Poi" }
  };
  const MAX_DIARIO = 5; // voci visibili prima di «Vedi tutto il diario»

  // legge un file JSON della radice, sempre la versione più nuova
  const leggi = nome => fetch(nome, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(nome + " " + r.status); return r.json(); });

  const corto = (testo, max) => { testo = String(testo || "").trim(); return testo.length > max ? testo.slice(0, max - 1) + "…" : testo; };

  function riga(classe, testo) { const s = document.createElement("span"); s.className = classe; s.textContent = testo; return s; }

  /* ---------- stato.json ---------- */
  function applicaStato(dati) {
    // tessere dei moduli
    const moduli = (dati && dati.moduli) || {};
    document.querySelectorAll(".mod[data-modulo]").forEach(tessera => {
      const m = moduli[tessera.dataset.modulo];
      const s = m && STATI[m.stato];
      if (!s) return; // modulo assente o valore non ammesso: resta l'etichetta dell'HTML
      const fronte = tessera.querySelector(".mod-front");
      const tag = fronte && fronte.querySelector(".tag");
      if (!tag) return;
      tag.className = "tag " + s.classe;
      tag.textContent = s.etichetta;
      const vecchia = fronte.querySelector(".improving");
      if (vecchia) vecchia.remove();
      if (m.migliora && m.stato === "oggi") tag.after(riga("improving", "in miglioramento"));
    });

    // «Stato dei lavori»: tre colonne ricostruite dalle voci
    const lavori = Array.isArray(dati && dati.lavori) ? dati.lavori.filter(v => v && STATI[v.stato] && v.nome) : [];
    const roadmap = document.querySelector(".roadmap");
    if (!roadmap || !lavori.length) return;
    roadmap.textContent = "";
    Object.keys(STATI).forEach(chiave => {
      const s = STATI[chiave];
      const li = document.createElement("li");
      li.className = s.colonna;
      const head = document.createElement("p");
      head.className = "road-head";
      head.append(document.createElement("i"), s.titolo);
      const ul = document.createElement("ul");
      lavori.filter(v => v.stato === chiave).forEach(v => {
        const voce = document.createElement("li");
        voce.textContent = corto(v.nome, 50);
        if (v.migliora && chiave === "oggi") voce.append(" ", riga("improving", "in miglioramento"));
        ul.append(voce);
      });
      li.append(head, ul);
      roadmap.append(li);
    });
  }

  /* ---------- diario.json ---------- */
  function mostraDiario(dati) {
    const box = document.getElementById("diario");
    const lista = document.getElementById("diario-lista");
    const altro = document.getElementById("diario-tutto");
    if (!box || !lista) return;
    const voci = (Array.isArray(dati && dati.voci) ? dati.voci : [])
      .map((v, i) => ({ ...v, i }))
      .filter(v => v && /^\d{4}-\d{2}-\d{2}$/.test(v.data) && v.titolo)
      // dalla più recente; a parità di giorno, prima quella scritta più in basso nel file
      .sort((a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : b.i - a.i));
    if (!voci.length) return; // niente voci valide: la sezione resta nascosta

    lista.textContent = "";
    voci.forEach((v, i) => {
      const li = document.createElement("li");
      if (i >= MAX_DIARIO) li.className = "diario-extra";
      const quando = document.createElement("time");
      quando.dateTime = v.data;
      const [a, m, g] = v.data.split("-").map(Number);
      quando.textContent = new Date(Date.UTC(a, m - 1, g)).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
      const testo = document.createElement("div");
      const h = document.createElement("h4");
      h.textContent = corto(v.titolo, 60);
      testo.append(h);
      if (v.descrizione) { const p = document.createElement("p"); p.textContent = corto(v.descrizione, 140); testo.append(p); }
      li.append(quando, testo);
      lista.append(li);
    });

    if (altro && voci.length > MAX_DIARIO) {
      altro.textContent = "Vedi tutto il diario (" + voci.length + " voci)";
      altro.hidden = false;
      altro.addEventListener("click", () => { box.classList.add("aperto"); altro.hidden = true; });
    }
    box.hidden = false;
  }

  leggi("stato.json").then(applicaStato).catch(() => {});   // se non va, restano le etichette dell'HTML
  leggi("diario.json").then(mostraDiario).catch(() => {});  // se non va, il diario non compare
})();
