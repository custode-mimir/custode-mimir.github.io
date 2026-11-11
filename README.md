# MIMIR — sito vetrina

Sito di presentazione di MIMIR, assistente AI personale locale e vocale.
La demo è **simulata**: il saluto usa solo ciò che il browser sa già
(ora, giorno, dispositivo, fuso orario) e non lo salva né lo invia;
il resto sono dialoghi scritti a mano con dati inventati.

## File
| File | A cosa serve |
|---|---|
| `index.html` | Struttura e testi della pagina (4 capitoli) |
| `style.css` | Colori, font e impaginazione. La palette (nero caldo e oro) è in cima al file |
| `demo.js` | La demo dell'apertura: il saluto personalizzato, le scene (`MATTINA`, `SCENES`) e gli audio della voce |
| `site.js` | Tessere che si girano su telefono, menu dei capitoli, runa attiva |
| `contatore.js` | Le statistiche con GoatCounter (solo visite ed eventi con nome fisso) |
| `media/voce/` | Gli audio veri di MIMIR (voce Kokoro), uno per ogni battuta della demo; in `saluto/` i pezzi del saluto personalizzato |
| `fonts/` | I font Inter e Noto Sans Runic, salvati qui per non chiamare Google |
| `favicon.svg` | L'icona della scheda del browser (runa ᛗ) |
| `apple-touch-icon.png` | L'icona quando salvi il sito sulla schermata Home dell'iPhone |
| `404.html` | La pagina che compare se l'indirizzo è sbagliato |
| `robots.txt`, `sitemap.xml` | Per i motori di ricerca: tutto permesso, una sola pagina |
| `og-image.png` | L'immagine che compare quando condividi il link (1200x630) |

## Pubblicazione
GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.
Indirizzo: https://custode-mimir.github.io/

Progetto anonimo, curato dal Custode (ᚱ).

Nessuna installazione necessaria. L'unica chiamata esterna è il contatore
GoatCounter (niente cookie, nessun dato personale).
