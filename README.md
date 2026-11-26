# Have a nice pizza

Strona pizzerii Have a nice pizza, ul. Williama Szekspira 1, 01-913 Warszawa (Bielany).

Statyczna strona bez kroku budowania i bez bibliotek: HTML, CSS i czysty JavaScript. Kroje: Cormorant Garamond i Jost z Google Fonts.

## Uruchomienie lokalnie

```
node serve.js
```

Strona działa wtedy pod adresem http://localhost:4190. Nieznane adresy zwracają `404.html`.

## Pliki

| Plik | Zawartość |
| --- | --- |
| `index.html` | Cała strona: hero, wprowadzenie, zamówienia, karta, o nas, opinie, galeria, kontakt |
| `styles.css` | Style |
| `app.js` | Status „otwarte teraz”, wejście hero, paralaksa, hasło, karta, galeria z podglądem |
| `404.html` | Strona błędu 404 |
| `serve.js` | Prosty serwer podglądu |
| `img/` | Zdjęcia i logo; źródła opisane w `img/ZRODLA.md` |
| `KONCEPCJA.md` | Źródła danych, analiza, kierunek, storyboard hero |
| `AUDYT-RUCHU.md` | Plan poprawek animacji |

## Przed publikacją

- Zdjęcia `pizza-ventricina-google.jpg` i `lokal-noca.jpg` dodali goście w Google Maps: potrzebna zgoda autora albo lokalu.
- Do uzupełnienia przez właściciela: wideo do hero, zdjęcia pozostałych pizz, historia lokalu, trzy opinie do zacytowania, adres (1 czy 1A), dane firmy i polityka prywatności.
