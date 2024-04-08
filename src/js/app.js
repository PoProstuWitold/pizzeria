/*

Zdecydowałem się użyć prostego SPA.
Jako podstawę systemu routingu użyłem "History API", które jest wspierane przez wszystkie przeglądarki.
Daje to możliwość zmiany zawartości strony bez przeładowywania całej strony w elegancki i nowoczesny sposób.

*/

class SinglePageApplication {
    constructor(options) {
        // Przechowuje dostępne trasy (routes) naszej aplikacji
        this.routes = options.routes

		// Przechowuje referencje do nasłuchiwaczy zdarzeń
		this.eventListeners = {}

        // Event polegający na zmianie adresu URL z "History API"
        window.addEventListener('popstate', () => this.render())

        // Event polegający na załadowaniu strony
        window.addEventListener('DOMContentLoaded', () => {
            this.addLinkClickHandlers()
            this.render()
        })

        console.log('Single Page Application has been mounted correctly')
    }

    async render() {
		try {
			// Pobieramy aktualną ścieżkę,
			// czyli, np. dla strony głównej, będzie to '/'
			let path = location.pathname
			if (path === '') path = '/'

			// Sprawdzamy, czy ścieżka istnieje w naszych zadeklarowanych trasach.
			// Jeśli nie, to wyświetlamy stronę błędu 404
			const route = this.routes[path]
			if (!route) return this.renderError(404, 'Strona o podanym adresie nie istnieje')

			if (this.eventListeners[path]) {
				// Usuwamy nasłuchiwacze zdarzeń, które były przypisane do komponentu
				// ponieważ w przeciwnym razie zdarzenia będą się kumulować
				this.eventListeners[path].forEach(listener => {
					document.removeEventListener(listener.event, listener.handler)
				})
			}

			// Importujemy dynamicznie komponenty, renderujemy je i wstawiamy do elementu o id="app"
			const component = await route()

			// Ładujemy style komponentu
			await component.styles()

			// Wstawiamy szablon komponentu do elementu o id="app"
			document.getElementById('app').innerHTML = component.template

			// Z racji, że strona jest dynamicznie renderowana, 
			// trzeba wywołać funkcję callback, która zapewni działanie eventów, jeśli to potrzebne
			if (component.callback) {
				// Zapisujemy referencje do nasłuchiwaczy zdarzeń, aby móc je usunąć w przyszłości,
				// żeby się nie kumulowały
				this.eventListeners[path] = await component.callback()
			}
		} catch (err) {
			// W przypadku błędu, wyświetlamy błąd w konsoli
			// oraz renderujemy stronę błędu
			console.error(err)
			throw this.renderError(err.code, err.message)
		}
    }

    async renderError(code = 500, message = 'Wewnętrzny błąd serwera') {
		// Dynamicznie importujemy komponent błędu i renderujemy go w elemencie o id="app"
		const errComponent = (await import('./components/ErrorComponent.js')).ErrorComponent(code, message)
		await errComponent.styles()
        document.getElementById('app').innerHTML = errComponent.template
		await errComponent.callback()
    }

	addLinkClickHandlers() {
		// Powoduje, że po kliknięciu w link będący częścią nawigacji strony,
		// witryna nie przeładuje się (unikniemy niechcianego efektu "blyskania" strony)
        const links = document.getElementsByClassName('navbtn')
        for (const link of links) {
            link.addEventListener('click', (event) => {
                event.preventDefault()
                const href = link.getAttribute('href')
                history.pushState(null, '', href)
                this.render()
            })
        }
    }
}

// definiujemy ścieżki do komponentów, które mają być renderowane
// dynamicznie importujemy komponenty, aby uniknąć ładowania wszystkich 
// komponentów jednocześnie, co mogłoby spowolnić działanie strony
const routes = {
    '/': async () => (await import('./components/MainComponent.js')).MainComponent(),
    '/o-nas': async () => (await import('./components/AboutComponent.js')).AboutComponent(),
	'/menu': async () => (await import('./components/MenuComponent.js')).MenuComponent(),
	'/galeria': async () => (await import('./components/GalleryComponent.js')).GalleryComponent(),
	'/kontakt': async () => (await import('./components/ContactComponent.js')).ContactComponent(),
	'/rezerwacja': async () => (await import('./components/ReservationComponent.js')).ReservationComponent()
}

const spa = new SinglePageApplication({
    routes
})