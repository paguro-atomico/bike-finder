# Strategia: dal finder a una piattaforma di confronto basata su recensioni

*Ricerca di novembre 2026. Le fonti sono in fondo. Alcuni dati (fatturati, funzionalità) vengono da pagine di terze parti e vanno verificati prima di decisioni importanti.*

## 1. Ha senso?

**Sì, ma non come "database di tutte le bici".** Quello spazio è già occupato, e bene, da 99 Spokes: oltre 40.000 bici monitorate, con dati che anche altri editori comprano su licenza. Costruire un catalogo generico da zero vorrebbe dire inseguirli senza un vantaggio.

C'è invece spazio per un **motore di decisione verticale (gravel e bikepacking)** che metta insieme tre cose che oggi stanno separate:

1. **Dal tuo uso alle specifiche**: questo è il finder attuale. Nessun grande player parte dal "come pedali"; tutti partono dai filtri tecnici.
2. **Dalle specifiche ai prodotti**: un catalogo curato e piccolo, con i campi che contano davvero nel gravel e che i database generici trattano male: passaggio ruota *misurato*, numero di attacchi su forcella, BB filettato, compatibilità UDH, compatibilità con le borse.
3. **Dai prodotti all'opinione aggregata**: un riassunto di recensioni editoriali e feedback dei rider, scomposto per attributo (comfort, affidabilità, passaggio ruota reale, comportamento a pieno carico), *sempre con la fonte citata*.

Il vantaggio competitivo sta nel 3, ed è lì che la tua community Instagram conta: è una fonte di feedback di prima mano che nessun aggregatore ha.

## 2. Competitor e alternative

| Chi | Cosa fa | Modello di business | Che cosa significa per te |
|---|---|---|---|
| **99 Spokes** | Database di specifiche, geometrie e prezzi di oltre 40.000 bici, aggiornato in automatico dai siti dei produttori. Ha un confronto per "livello di allestimento". | Licenza dati (Singletrack, The Pro's Closet), dashboard B2B a pagamento con API, strumenti per i negozi | Il gigante delle specifiche. Non combatterlo: in futuro potresti **comprare i suoi dati** invece di costruirli. |
| **Singletrack Bike Database** (ott. 2026) | 263 bici da 68 marchi, specifiche da 99 Spokes, collegate alle recensioni Singletrack | Vantaggio riservato agli abbonati | Conferma il modello "specifiche su licenza + contenuto proprio". Copre MTB, non gravel, e non aggrega opinioni esterne. |
| **Geometry Geeks**, BikeInsights | Confronto di geometrie, sovrapposizione delle sagome | Gratuito / pubblicità | Ottimi per chi conosce già i numeri. Si possono linkare dal risultato, sono complementari. |
| **Riviste** (Cycling Weekly, BikeRadar, Gravel Cyclist, Bikepacking.com…) | Recensioni editoriali e guide all'acquisto | Pubblicità e affiliazione | Sono le **fonti** da aggregare, non concorrenti diretti. Ciascuna vede solo i propri test. |
| **Bicycle Rolling Resistance** | Test di laboratorio sulle coperture (scorrevolezza, forature, grip) | Medie pubbliche, dati per singola copertura riservati ai membri Pro | Riferimento per l'espansione alle coperture. Il dato di laboratorio è un ottimo complemento al feedback dei rider. |
| **GummySearch** | Classifica i marchi di coperture gravel analizzando discussioni su Reddit (circa 213 recensioni) | Strumento SaaS generico | La prova che l'aggregazione da Reddit si può fare, ma è superficiale: valuta i marchi, non i modelli o i singoli attributi. |
| **Wonderflow** | Analisi AI delle recensioni (sentiment e temi) dei rivenditori: Bike24, Alltricks, Probikeshop… | B2B per brand e retailer | Gli stessi dati che ti servirebbero, ma venduti ai brand. Indica anche un possibile sbocco B2B. |
| **Bicycles.ai** | Offerte e recensioni di bici e accessori | Bootstrapped; circa 330.000 $ di ricavi secondo Latka (dato non datato) | Il concorrente più simile all'idea "aggregatore". È generalista, non verticale sul gravel. |

**Il buco nel mercato**: nessuno di questi fa *uso reale → specifica → modelli → opinione aggregata per attributo* in modo specifico per gravel e bikepacking.

## 3. Rischi da conoscere prima

- **Diritti e termini d'uso.** Non si possono ripubblicare recensioni intere. Si possono pubblicare estratti brevi, una sintesi propria e il link alla fonte. Lo scraping va controllato sito per sito, così come le eventuali esclusioni dal text and data mining. L'API di Reddit ha termini e costi propri. YouTube va usato solo tramite API ufficiali.
- **Normativa UE sulle recensioni (direttiva Omnibus 2019/2161).** Se mostri recensioni dei consumatori devi spiegare *come* verifichi che arrivino da utilizzatori reali. Le recensioni false o "comprate" sono una pratica vietata.
- **Affiliazione.** Va dichiarata sempre. Inoltre deve restare separata dal ranking: se il punteggio dipende dalle commissioni, si perde il valore principale, cioè la fiducia.
- **Dati che invecchiano.** Le bici cambiano ogni anno-modello: ogni scheda prodotto deve indicare anno e data di verifica.
- **Qualità dell'AI.** Se usi un LLM per estrarre pro e contro, ogni affermazione deve rimandare alla sua fonte, con un controllo umano almeno a campione.

## 4. Roadmap e stima del lavoro

Stime per **una persona part-time (circa 10 ore a settimana)** con l'aiuto di Claude Code. A tempo pieno si dividono per circa 3.

| Fase | Cosa | Tecnologia | Tempo | Costi mensili |
|---|---|---|---|---|
| **0 (fatta)** | Finder con scheda tecnica e link condivisibili | Sito statico su GitHub Pages | – | 0 € |
| **1. Validare** | Analytics rispettose della privacy, condivisione dei risultati su Instagram, raccolta email "avvisami" | Plausible o GoatCounter, Tally o Buttondown | 1–2 settimane | 0–10 € |
| **2. Catalogo curato** | 40–80 gravel con i campi "gravel-specifici". La scheda tecnica mostra i modelli compatibili. | JSON nel repo, ancora statico; dati inseriti a mano o presi da 99 Spokes su licenza | 3–6 settimane (soprattutto inserimento dati) | 0 € (+ eventuale licenza) |
| **3. Feedback dei rider** | Valutazioni per attributo su un modello che possiedi, con verifica (foto o Strava) e moderazione | Backend: Supabase (database + autenticazione) e funzioni serverless | 4–8 settimane | 0–25 € |
| **4. Aggregazione recensioni** | Raccolta delle recensioni editoriali, estrazione con LLM di pro/contro e punteggi per attributo con citazione, punteggio con indice di confidenza | Job programmati (GitHub Actions o cron) + API LLM + database | 2–4 mesi | 20–150 € (LLM + hosting) |
| **5. Altre categorie e confronti** | Coperture, ruote, borse; confronto affiancato; prezzi e affiliazione | Stesso schema dati, generalizzato | Continuo | Variabile |

**In totale, per arrivare a un prodotto "confronti in tempo reale basati su recensioni": circa 6–9 mesi part-time**, più la manutenzione continua del catalogo, che è il vero costo nascosto.

### Il modello dati da preparare già da adesso

```
Product   { id, category: "bike"|"tire"|…, brand, model, year, price_eur, specs{…}, verified_at }
Source    { id, type: "editorial"|"rider"|"lab"|"forum", url, publisher, date }
Review    { product_id, source_id, summary, pros[], cons[], attribute_scores{comfort, durability, …}, quote_excerpt }
Score     { product_id, attribute, value, confidence, n_sources, updated_at }
```

Con un campo `category` generico, passare dalle bici alle coperture o alle borse diventa solo una questione di nuovi attributi, senza riscrivere nulla.

## 5. Raccomandazione

1. **Prima la domanda, poi il prodotto.** Lancia il finder com'è e condividi i risultati (#/r/…) sul profilo Instagram, magari con un formato fisso: "qual è la tua build?". Misura quante persone arrivano in fondo.
2. **Catalogo curato prima dell'aggregazione.** Già 50 bici ben schedate con i campi gravel-specifici danno valore. L'aggregazione delle recensioni ha senso solo dopo, sopra un catalogo che esiste.
3. **Il feedback della community come elemento distintivo**, più dello scraping. È più difendibile sul piano legale, più autentico, e nessuno ce l'ha.
4. **Monetizzazione:** affiliazione dichiarata con i negozi online, dopo aver raggiunto un minimo di traffico. In seguito, eventualmente, report e insight per brand e negozi, sulla linea di Wonderflow e 99 Spokes.

## Fonti

- [99 Spokes – dati e dashboard](https://99spokes.com/en-CA/data) · [Bicycle Retailer, 2019](https://bicycleretailer.com/product-tech/2019/08/05/99spokes-charting-new-course-bike-analysis) · [Accordo con The Pro's Closet, 2022](https://bicycleretailer.com/announcements/2022/03/04/99-spokes-provide-data-pros-closet) · [Funzione per negozi, 2024](https://bicycleretailer.com/announcements/2024/08/12/99-spokes-introduces-new-ibd-focused-feature-enhance-customer-experience)
- [Singletrack Bike Database, ottobre 2026](https://singletrackworld.com/2026/10/singletrack-bike-database/)
- [Geometry Geeks](https://www.geometrygeeks.bike/bike/nor-gravel-2018-2022/) · [Strumenti online gratuiti (La Velocità)](https://www.lavelocita.cc/guides-page/free-online-bike-tools-you-need-to-be-aware-of)
- [Bicycle Rolling Resistance – metodo di test](https://www.bicyclerollingresistance.com/the-test) · [Contenuti Pro](https://www.bicyclerollingresistance.com/specials/crr-load-test)
- [GummySearch – coperture gravel da Reddit](https://gummysearch.com/tools/best-products/gravel-tires/)
- [Wonderflow – integrazione Bike24](https://www.wonderflow.ai/integrations/bike24)
- [Bicycles.ai su Latka](https://getlatka.com/companies/bicycles.ai)
- [Recensioni componenti – Cycling Weekly](https://www.cyclingweekly.com/reviews/components)
