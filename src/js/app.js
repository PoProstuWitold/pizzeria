/*

Zdecydowałem się użyć prostego SPA.
Jako system routingu użyłem HistoryAPI, które jest wspierane przez wszystkie przeglądarki.
Daje to możliwość zmiany zawartości strony bez przeładowywania całej strony w elegancki i nowoczesny sposób.

*/

class SinglePageApplication {
    constructor(options) {
        this.routes = options.routes
		this.eventListeners = {} // przechowuje referencje do nasłuchiwaczy zdarzeń

        // event polegający na zmianie adresu URL
        window.addEventListener('popstate', this.render.bind(this))

        // event polegający na załadowaniu strony
        window.addEventListener('DOMContentLoaded', () => {
            this.addLinkClickHandlers()
            this.render()
        })

        console.log('Single Page Application has been mounted correctly')
    }

    async render() {
        let path = location.pathname
        if (path === '') path = '/'
        const route = this.routes[path]
        if (!route) return this.renderError(404, 'Strona o podanym adresie nie istnieje')

		if (this.eventListeners[path]) {
			// usuwamy nasłuchiwaczy zdarzeń, które były przypisane do poprzedniego komponentu
			// ponieważ w przeciwnym razie zdarzenia będą się kumulować
            this.eventListeners[path].forEach(listener => {
                document.removeEventListener(listener.event, listener.handler)
            })
        }

        const component = await route()
        document.getElementById('app').innerHTML = component.template

        // z racji, że strona jest dynamicznie renderowana, 
        // trzeba wywołać funkcję callback, która zapewni działanie eventów, jeśli to potrzebne
        if (component.callback) {
			// zapisujemy referencje do nasłuchiwaczy zdarzeń, aby móc je usunąć w przyszłości,
			// żeby się nie kumulowały
			this.eventListeners[path] = await component.callback()
		}
    }

    async renderError(code = 500, message = 'Wewnętrzny błąd serwera') {
		const errComponent = (await import('./components/ErrorComponent.js')).ErrorComponent(code, message)
        document.getElementById('app').innerHTML = errComponent.template
		errComponent.callback()
    }

	addLinkClickHandlers() {
		// powoduje, że po kliknięciu w link będący częścią nawigacji strony,
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