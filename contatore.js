/* =========================================================
   CONTATORE DELLE VISITE (GoatCounter, sito "mimir-site")
   È l'unica chiamata a un sito esterno di tutto il sito.
   Niente cookie, niente dati personali.

   Cosa viene mandato, e niente altro:
   - visita:  la pagina (percorso), il titolo e da dove arrivi (referrer);
   - eventi:  solo un nome fisso (es. "prova-mimir", "scena-casa").
   I dati del saluto della demo (ora, dispositivo, zona) NON passano
   mai di qui: restano nel tuo browser.

   Funziona come lo script ufficiale di GoatCounter, ma è scritto qui
   per sapere esattamente cosa parte. Uso nella pagina:
   - goatcounter.count({ path: "nome-evento", event: true })
   - oppure un elemento con data-goatcounter-click="nome-evento"
   ========================================================= */
(function () {
  var INDIRIZZO = "https://mimir-site.goatcounter.com/count";

  // non contare: prove sul computer, file aperti in locale, anteprime e robot
  function nonContare() {
    var host = location.hostname;
    return location.protocol === "file:" ||
      /^(localhost|127\.|0\.0\.0\.0|\[::1\]|$)/.test(host) ||
      document.visibilityState === "prerender" ||
      navigator.webdriver === true;
  }

  function manda(dati) {
    if (nonContare()) return;
    var parti = [];
    for (var k in dati) if (dati[k] !== undefined && dati[k] !== "") parti.push(k + "=" + encodeURIComponent(dati[k]));
    parti.push("rnd=" + Math.random().toString(36).slice(2));
    var img = new Image(); // GoatCounter risponde con un'immagine trasparente di 1 pixel
    img.src = INDIRIZZO + "?" + parti.join("&");
  }

  window.goatcounter = {
    count: function (o) {
      o = o || {};
      // per gli eventi si manda solo il nome, mai altri dati
      if (o.event) manda({ p: String(o.path), t: String(o.title || o.path), e: "true" });
      else manda({ p: o.path || location.pathname, t: o.title || document.title, r: document.referrer });
    }
  };

  // eventi dichiarati nella pagina con data-goatcounter-click="nome"
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-goatcounter-click]");
    if (el) window.goatcounter.count({ path: el.getAttribute("data-goatcounter-click"), event: true });
  });

  // la visita alla pagina
  window.goatcounter.count({});
})();
