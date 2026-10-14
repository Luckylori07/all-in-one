# ALL IN ONE srl – proposta di restyling

Sito statico (HTML + CSS + JS, nessuna dipendenza né build) per ALL IN ONE srl, verniciatura industriale di Albizzate (VA).
È una **proposta**: contiene `noindex, nofollow` e il credito a Tramontis.

```
index.html          pagina unica (ancore nel menu)
privacy.html        informativa privacy
assets/css/style.css
assets/js/main.js   menu mobile, lightbox galleria, comparsa sobria
assets/img/         foto (WebP), favicon.svg, og.jpg
.nojekyll
```

Provarlo in locale: `python3 -m http.server` nella cartella, poi `http://localhost:8000/`.
Tutti i percorsi sono relativi, quindi funziona anche da sottocartella (`/all-in-one/`).

## Come modificare i dati

I dati aziendali (telefono, email, indirizzo, P.IVA) compaiono in `index.html` in più punti: header/hero/contatti/footer, nel JSON-LD `LocalBusiness` nel `<head>` e in `privacy.html`. Cercateli con una ricerca del testo, ad esempio `0331` o `Via Diaz`.

- I pulsanti "Richiedi preventivo" sono link `mailto:` con oggetto e corpo precompilati (testo codificato per URL). Si ripetono tre volte in `index.html`: modificateli tutti insieme.
- I colori sono variabili CSS all'inizio di `style.css` (`:root`). L'accento verde è ripreso dal testo "ALL IN ONE SRL" del vecchio sito.

## Come aggiungere foto

1. Ridimensionate la foto (lato lungo max ~1600 px) e salvatela in `assets/img/` come `.webp` o `.jpg` con un nome descrittivo.
2. In `index.html`, dentro `<ul class="gallery">`, copiate un blocco `<li>…</li>` e aggiornate `data-full`, `data-w`, `data-h`, `data-caption`, `src`, `width`, `height` e `alt`. Descrivete la foto in modo prudente, solo ciò che si vede.
3. Il primo elemento (`g-wide`) è quello grande, l'ultimo occupa una cella intera: con un numero diverso di foto potrebbe servire ritoccare le regole `.gallery` in `style.css`.

## Da proposta a sito ufficiale

1. In `index.html` e `privacy.html` togliete `<meta name="robots" content="noindex, nofollow">`.
2. Togliete la riga `<p class="credit">Proposta di sito realizzata da Tramontis …</p>` dal footer di entrambe le pagine.
3. Aggiungete il dominio: in `index.html` aggiornate `og:image` e `image` nel JSON-LD (ora puntano a `https://luckylori07.github.io/all-in-one/…`) e aggiungete `og:url`, `<link rel="canonical">` e `url` nel JSON-LD. Poi create un file `CNAME` con il dominio e configurate il DNS (Settings → Pages → Custom domain).
4. Facoltativo: aggiungete `robots.txt` e `sitemap.xml`; se esiste la pagina Facebook ufficiale, inserite il link nel footer e `sameAs` nel JSON-LD.

## Pubblicazione

GitHub Pages dalla branch `main`, cartella `/` (Settings → Pages). Il file `.nojekyll` disattiva Jekyll.

## Note sui contenuti

I testi derivano solo dal testo originale e dalle pagine del vecchio sito (Verniciatura, Assemblaggio). Le foto sono quelle del vecchio sito, a bassa risoluzione: se possibile, sostituirle con scatti nuovi.
