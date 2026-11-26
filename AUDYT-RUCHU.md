# Audyt ruchu: Have a nice pizza

Wykonany 26.11.2026 według zasad skilla `improve-animations` (krzywe, czasy, częstotliwość, wydajność, dostępność). To plan poprawek: nic z poniższej listy nie zostało jeszcze wdrożone.

| # | Waga | Miejsce | Problem | Poprawka |
| --- | --- | --- | --- | --- |
| 1 | ŚREDNIA | `styles.css`, `.top` | Zmiana stanu nagłówka animuje `padding` (układ strony przelicza się w każdej klatce). | Stała wysokość nagłówka; zmniejszanie przez `transform: translateY(-8px)` na wewnętrznym kontenerze, czas 250 ms, `cubic-bezier(0.23, 1, 0.32, 1)`. |
| 2 | ZROBIONE | `styles.css`, `.dish:hover .dish__img img`, `.shot:hover img` | Najechanie na danie to częsta akcja, a przybliżenie trwało 600 ms. | W wersji 2 skrócone do 300 ms z krzywą `cubic-bezier(0.23, 1, 0.32, 1)`. |
| 3 | NISKA | `app.js`, hasło | Nasłuch przewijania działa przez cały czas, także gdy wszystkie słowa są już zapalone. | Odłączyć nasłuch, gdy hasło wyjedzie nad ekran, albo przejść na `IntersectionObserver` dla każdego słowa. |
| 4 | NISKA | `app.js`, paralaksa hero | Paralaksa liczona w JS przy każdym przewinięciu. | Tam, gdzie przeglądarka to wspiera, użyć `animation-timeline: scroll()` w CSS; JS zostaje jako zapas. |
| 5 | NISKA | `styles.css`, `.lightbox[open]` | Podgląd zdjęcia ma animację wejścia, ale zamyka się od razu, bez wyjścia. | Dodać wyjście tą samą drogą (przezroczystość i skala do 0,96, 150 ms) przed `close()`. |

Zgodne z zasadami (bez zmian):
- Wejście hero: tylko `transform` i `opacity`, krzywa `cubic-bezier(0.22, 1, 0.36, 1)`, całość w około 1,2 s. Długość jest uzasadniona: to rzadki, pierwszy kontakt ze stroną.
- Pojawianie się przy przewijaniu: 600 ms, odstęp w grupie co 60 ms (maksymalnie 300 ms).
- Obracająca się pieczątka (28 s, liniowo) i wszystkie ruchy wyłączone przy `prefers-reduced-motion: reduce`. Zostają tylko krótkie zmiany kolorów.
- Najechania myszką działają tylko na urządzeniach z kursorem. Wciśnięcie przycisku: `scale(0.97)` w 160 ms.
