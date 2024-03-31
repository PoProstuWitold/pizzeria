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

W obu przypadkach aplikacja będzie dostępna pod adresem ``localhost:3005`` lub ``TWOJE_IP:3005``.

## Disclaimer
Wszystkie obrazki są na licencji [Pixabay](https://pixabay.com/service/license-summary/), czyli w skrócie dozwolone jest używanie tych obrazków za darmo bez wzmianki autorów, aczkolwiek zabronione jest wykorzystywanie ich w celach komercyjnych.