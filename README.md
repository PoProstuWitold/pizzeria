# Pizzeria
Projekt realizujący stronę fikcyjnej pizzerii w formie *Single Page Application (SPA)*.

Stos technologiczny:
- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js (serwer do uruchomienia aplikacji)

## Jak uruchomić?
### Node.js
Z racji, że aplikacja używa dynamicznego importowania komponentów, wymagane jest uruchomienie jej z poziomu serwera. W tym celu należy użyć polecenia ``node server.mjs`` będąc w głównym katalogu projektu. Wymagane jest środowisko **[Node.js](https://nodejs.org/)**. Aplikacja była realizowana pod ten sposób uruchamiania.

### Docker
Aplikacja posiada też obraz dockerowy, który można odpalić wykonując kolejno poniższe polecenia:
```bash
docker buildx b -t poprostuwitold/pizzeria .
```

```bash
docker run -p 3005:3005 --network=host -it poprostuwitold/pizzeria
```

W obu przypadkach aplikacja będzie dostępna pod adresem ``localhost:3005`` lub ``TWOJE_IPv4:3005``.

## Struktura projektu
**`server.mjs`** - Prosty serwer *Node.js* serwujący aplikację na porcie 3005.

**`src`** - Główny katalog. Znajdują się tu foldery: `assets` (obrazki), `css` (arkusze stylów), `js` (pliki JavaScript) oraz plik `index.html`.

**`Dockerfile`** i **`.dockerignore`** - Pliki potrzebne do zbudowania i uruchomienia obrazu dockerowego.

## Dostępne ścieżki:
**"/"** - Strona startowa aplikacji.

**"/o-nas"** - Informacje o autorze.

**"/menu"** - Menu restauracji.

**"/galeria"** - Dynamicznie generowana galeria z użyciem ***[API serwisu Pixabay](https://pixabay.com/api/docs/)*** przy pomocy ***Fetch API***.

**"/kontakt"** - Informacje kontakowe oraz mapa Google.

**"/rezerwacja"** - Szczegółowo walidowany formularz rezerwacji oraz lista wszystkich rezerwacji użytkownika z możliwością ich edycji oraz usunięcia.

**"/*"** - Każda inna ścieżka jest obsługiwana przez stronę błędu z odpowiednim kodem (np. 404 w przypadku, gdy strona nie istnieje).

## Disclaimer
Wszystkie obrazki są na licencji ***[Pixabay](https://pixabay.com/service/license-summary/)***, czyli w skrócie dozwolone jest używanie tych obrazków za darmo bez wzmianki autorów, aczkolwiek zabronione jest wykorzystywanie ich w celach komercyjnych.