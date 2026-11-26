# Have a nice pizza — koncepcja strony

Pizzeria przy ul. Williama Szekspira 1, 01-913 Warszawa (Bielany). Dane zebrane 26.11.2026.

## Źródła danych

| Dane | Źródło |
| --- | --- |
| Adres, godziny (codziennie 12:00–22:00), telefon 503 166 866, ocena 4,9 (753 opinie) | Google Maps |
| Karta: 9 pizz 32 cm z pełnym składem i cenami, 2 napoje | Pyszne.pl, profil lokalu |
| Zamówienia online | Pyszne.pl i Glovo (linki z przycisku „Zamów online” w Google Maps) |
| Hasło lokalu, „dostawa · na wynos · jedzenie na miejscu”, 100% poleca (8 opinii) | Facebook |
| Zdjęcia: nagłówek z Pyszne.pl (6 pizz z góry), logo, zdjęcie w tle z Facebooka | oficjalne kanały lokalu (patrz `img/ZRODLA.md`) |

Facebook podaje adres „Szekspira 1A”, Google „Szekspira 1”. Na stronie jest wersja z Google; do potwierdzenia przez właściciela.

## Materiał referencyjny: 5 mocnych stron

1. Bardzo wysoka ocena: 4,9 przy 753 opiniach w Google.
2. Krótka, konkretna karta: 9 pizz, każda na mozzarelli fior di latte, z pełnym składem.
3. Profesjonalne zdjęcie z góry, z wyraźnie przypieczonymi brzegami: samo wywołuje apetyt.
4. Nazwa z charakterem i gotowym tonem marki („have a nice day” → „have a nice pizza”, „Smakuj życie z uśmiechem”).
5. Proste zamawianie: Pyszne.pl, Glovo i telefon, codziennie od 12 do 22.

## Materiał referencyjny: 5 słabych stron

1. Brak własnej strony: dane są rozsiane po Google, Pyszne.pl i Facebooku.
2. Brak historii: nie wiadomo, kto robi pizzę, skąd ciasto i składniki, od kiedy działa lokal.
3. Mało oficjalnych zdjęć: jedno ujęcie pizz, brak wnętrza, ludzi, procesu i wideo.
4. Niespójny adres (1 albo 1A) i brak informacji o piecu, ciście i jego dojrzewaniu.
5. Opinie w Google są w ograniczonym widoku niedostępne do cytowania; widoczne trzy są mieszane.

## Kierunek

A: rustykalna, neapolitańska, ale bez obietnic, których nie da się potwierdzić (nie piszę o piecu opalanym drewnem, temperaturze ani czasie dojrzewania ciasta). Ciepły krem, czerwień pomidora, zieleń bazylii, węgiel i złoto z logo. Fraunces na nagłówkach (pasuje do szeryfowego „Have” z logo), DM Sans na tekście. Ziarno mąki jako faktura, odręczne linie SVG, okrągłe maski zdjęć.

## Nagłówek H1: trzy propozycje

1. „Lekka, chrupiąca, na fior di latte.” Mówi, czym jest pizza, ale brzmi jak opis z karty.
2. „Smakuj życie z dobrą pizzą.” Bliskie hasłu lokalu, ale ogólne.
3. **„32 centymetry dobrego dnia.”** Wybrana: gra z nazwą (have a nice day), podaje konkret (każda pizza ma 32 cm) i ma trzy słowa, więc czyta się ją w sekundę.

Podtytuł: „Pizza na mozzarelli fior di latte, z chrupiącym, przypieczonym brzegiem. Codziennie od 12:00 do 22:00 przy Szekspira 1.”

## Storyboard hero (wejście ok. 1,2 s)

| Czas | Co się dzieje |
| --- | --- |
| 0 ms | Tło węgla z fakturą mąki jest od razu widoczne; zdjęcie pizzy ładuje się z priorytetem. |
| 0–900 ms | Zdjęcie pizzy w okrągłej masce: wejście z przezroczystości i skali 1,08 → 1. |
| 150–600 ms | Nagłówek linia po linii spod maski (translateY 100% → 0), co 70 ms. |
| 550–950 ms | Podtytuł, przyciski i pasek statusu: przezroczystość i 16 px w górę. |
| od 900 ms | Pieczątka wokół pizzy obraca się powoli (pełny obrót 28 s). |
| przy scrollu | Pizza przesuwa się wolniej niż tekst (do 15%), tekst lekko gaśnie; strzałka „przewiń” znika po pierwszym ruchu. |

Krzywa: cubic-bezier(0.22, 1, 0.36, 1); animowane tylko transform i opacity. Przy ograniczonym ruchu wszystko jest od razu na miejscu i nic się nie obraca.

## Brakuje od właściciela

- Wideo do hero (6–10 s: rozciąganie ciasta, ciągnący się ser), WebM i MP4, poniżej 2,5 MB.
- Zdjęcia: Margherita, Salami Mellow, Bianka, Guanciale Picante, Vege Delight, Peperoni Picante, wnętrze, ludzie.
- Historia: kto robi pizzę, skąd mąka i mozzarella, od kiedy działa lokal.
- Trzy opinie gości do zacytowania (za zgodą autorów).
- Adres: 1 czy 1A, polityka prywatności, adres e-mail.

## Wersja 2 (26.11.2026): układ według domwloski.pl

Na prośbę klienta układ, hero i sposób użycia zdjęć wzorowane są na domwloski.pl (bez kopiowania kodu, tekstów i grafik):
- cała strona ciemna (kamień z fakturą mąki), krem na tekst, złoto i szampański beż w akcentach, czerwień pomidora tylko na przyciskach zamówień;
- nagłówek: logo na środku, menu w rzędzie pod nim, telefon z lewej, „Zamów online” w obrysie z prawej;
- hero: zdjęcie pizz z góry na całym tle, przyciemnione z lewej, tekst z lewej (cienki Fraunces, dwa tony), okrągły wskaźnik przewijania z obracającym się napisem;
- wprowadzenie na przyciemnionym zdjęciu i trzy kolumny ze złotymi ikonami i beżowymi przyciskami;
- pas „Zamów” w ramce z czerwoną pieczęcią na górnej krawędzi;
- galeria jako mozaika od krawędzi do krawędzi, stopka w kolumnach.
Kierunek zmienił się więc z A (rustykalny, jasny) na C (premium, ciemny i kinowy). Wersja 1 jest w folderze tymczasowym sesji (pizza-v1-*).
