# Gravel Bike Finder

Uno strumento web che, con 5 domande su come pedali davvero (uso, fondo, terreno, priorità, budget), restituisce una **scheda tecnica** della gravel giusta: geometria, materiale del telaio, passaggio ruota, coperture, trasmissione, ruote, cosa cercare e cosa evitare. Ogni consiglio è accompagnato dal *perché*.

Sito statico, senza build e senza dipendenze, pubblicabile con GitHub Pages.

## Struttura

```
index.html               Pagina unica (header, contenitore delle viste, footer)
assets/
  css/main.css           Design system: colori, font, layout, tema chiaro/scuro, stampa
  js/app.js              Interfaccia: routing con hash, rendering di landing, domande, risultato
  js/engine.js           Logica del consiglio (funzioni pure, testabili, senza DOM)
  js/questions.js        Domande e opzioni (testi)
  js/content.js          Testi lunghi: descrizioni dei materiali, narrative geometria×materiale
  js/icons.js            Icone SVG inline
  img/                   Favicon e sfondo con curve di livello
tests/engine.test.mjs    Test su tutte le 960 combinazioni di risposte
docs/STRATEGIA.md        Competitor, fattibilità, roadmap verso confronti e recensioni
```

### Come funziona il motore

`engine.js` contiene una lista di **regole** (`RULES`). Ogni regola dice: *se le risposte sono X, aggiungi N punti a questa geometria / a questo materiale, per questo motivo*. Vincono il punteggio di geometria e quello di materiale più alti; i motivi delle regole applicate compaiono nella sezione "Why this build" del risultato.

Per cambiare il comportamento basta modificare o aggiungere una regola, senza toccare l'interfaccia.

### Link condivisibili

Ogni risultato ha un URL tipo `#/r/23232`: una cifra per domanda, cioè l'indice dell'opzione scelta. **Aggiungi nuove opzioni sempre in fondo alla lista**, altrimenti i link già condivisi cambiano significato.

## Sviluppo locale

Servono solo Python (per servire i file) e Node 18+ (per i test).

```bash
python3 -m http.server 8000
```

Poi apri http://localhost:8000. Gli ES module non funzionano se apri `index.html` con `file://`.

```bash
npm test
```

## Pubblicazione

GitHub Pages → *Settings → Pages → Deploy from branch* → `main`, cartella `/`. Il file `.nojekyll` evita che Jekyll elabori il sito.

Il repository si chiama `cycling-tool.github.io` ma appartiene all'utente `paguro-atomico`, quindi il sito sarà su `https://paguro-atomico.github.io/cycling-tool.github.io/`. Per un URL più pulito si può rinominare il repo (es. `gravel-finder`) o collegare un dominio personalizzato.

## Prossimi passi

Vedi [docs/STRATEGIA.md](docs/STRATEGIA.md).
