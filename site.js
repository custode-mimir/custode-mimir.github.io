/* =========================================================
   EFFETTI DELLA PAGINA
   Tutti i contenuti sono sempre visibili: niente effetti che
   nascondono le sezioni finché non scorri.
   ========================================================= */

// statistiche: solo nomi fissi di eventi (vedi contatore.js)
function contaEvento(nome) {
  if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: nome, title: nome, event: true });
}

/* ---------- tessere dei moduli: clic, tocco, Invio o Spazio = la tessera si gira ---------- */
/* Si gira una tessera alla volta: aprendone una, quella aperta prima si richiude. */
const tessere = [...document.querySelectorAll(".mod")];
tessere.forEach(card => {
  card.addEventListener("click", () => {
    const apri = !card.classList.contains("open");
    tessere.forEach(t => { t.classList.remove("open", "peek"); t.setAttribute("aria-pressed", "false"); });
    if (apri) {
      card.classList.add("open");
      card.setAttribute("aria-pressed", "true");
      contaEvento("tessera-" + card.dataset.modulo);
    }
  });
});

/* La prima volta che le tessere arrivano sullo schermo, la prima fa da sola mezzo giro
   e torna indietro: una volta sola, e mai se hai disattivato le animazioni. */
const senzaAnimazioni = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (tessere.length && !senzaAnimazioni && "IntersectionObserver" in window) {
  const osserva = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    osserva.disconnect();
    const prima = tessere[0];
    setTimeout(() => {
      if (tessere.some(t => t.classList.contains("open"))) return; // l'utente ne ha già girata una
      prima.classList.add("peek");
      prima.addEventListener("animationend", () => prima.classList.remove("peek"), { once: true });
    }, 500);
  }, { threshold: 0.6 });
  osserva.observe(tessere[0]);
}

/* ---------- menu dei capitoli (solo telefono) ---------- */
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu-mobile");
if (menuBtn && menu) {
  const setMenu = open => { menu.hidden = !open; menuBtn.setAttribute("aria-expanded", open ? "true" : "false"); };
  menuBtn.addEventListener("click", () => {
    const apri = menu.hidden;
    setMenu(apri);
    if (apri) contaEvento("menu-capitoli");
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
}

/* ---------- runa attiva: si accende in oro la runa del capitolo che stai guardando ---------- */
(() => {
  const capitoli = ["top", "giornata", "moduli", "come"].map(id => {
    const section = document.getElementById(id);
    return {
      section,
      rune: section && section.querySelector(".ch-rune"),
      link: document.querySelector('#menu-mobile a[href="#' + id + '"]')
    };
  }).filter(c => c.section);

  let pending = false;
  function update() {
    pending = false;
    const line = window.innerHeight * 0.4;
    let current = 0;
    capitoli.forEach((c, i) => { if (c.section.getBoundingClientRect().top <= line) current = i; });
    capitoli.forEach((c, i) => {
      if (c.rune) c.rune.classList.toggle("active", i === current);
      if (c.link) c.link.classList.toggle("active", i === current);
    });
  }
  window.addEventListener("scroll", () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();
