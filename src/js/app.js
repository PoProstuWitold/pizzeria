import {
	AboutComponent,
	MainComponent,
	MenuComponent,
	GalleryComponent,
	ContactComponent,
} from './components/index.js'

/*

Zdecydowałem się użyć prostego SPA.
Jako system routingu użyłem techniki zwanej jako Hash-based routing, która polega na zmianie adresu URL po znaku #.
Daje to możliwość zmiany zawartości strony bez przeładowywania całej strony
oraz pozwala na uniknięcie błędu 404 w przypadku gdy użytkownik wpisze adres URL ręcznie,
a przeglądarka nie wspiera HTML5 History API.

*/

class SinglePageApplication {
    constructor(options) {
        this.routes = options.routes

		// event polegający na zmianie adresu URL po znaku #
        window.addEventListener('hashchange', this.render.bind(this))

		// event polegający na załadowaniu strony
        window.addEventListener('DOMContentLoaded', this.render.bind(this))

		console.log('Single Page Application has been mounted correctly')
    }

    async render() {
        let hash = location.hash.replace('#', '')
        if (hash === '') hash = '/'
        const route = this.routes[hash]
        if (!route) return this.renderError('Page not found', 404)
        const content = await route()
        document.getElementById('app').innerHTML = content
    }

    async renderError(message, code) {
        document.getElementById('app').innerHTML = `<h1>Error ${code}: ${message}</h1>`
    }
}

const routes = {
    '/': async () => MainComponent(),
    '/o-nas': async () => AboutComponent(),
	'/menu': async () => MenuComponent(),
	'/galeria': async () => GalleryComponent(),
	'/kontakt': async () => ContactComponent()
}

const spa = new SinglePageApplication({
	routes,
})