// const PIXABAY_URL = 
// `https://pixabay.com/api/?key=43217952-49b985ba5b4a301637dfa1398&q=pizza&image_type=photo&min_width=350&min_height=200&per_page=10`

const url = new URL('https://pixabay.com/api/')
url.searchParams.set('key', '43217952-49b985ba5b4a301637dfa1398')
url.searchParams.set('q', 'pizza')
url.searchParams.set('image_type', 'photo')
url.searchParams.set('min_width', '350')
url.searchParams.set('min_height', '200')
url.searchParams.set('per_page', '20')

const PIXABAY_URL = url.href


// Do pobierania obrazków z Pixabay użyłem darmowego API, które pozwala na pobieranie obrazków z ich serwisu
// https://pixabay.com/api/docs/

class CustomError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

export class Gallery {
	url = PIXABAY_URL
	static async fetchImages() {
		// Asynchroniczne pobranie obrazków z Pixabay, a następnie ich zwracanie
		try {
			const response = await fetch(url)
			const data = await response.json()
			return data.hits
		} catch (err) {
			console.error(err)
			// W przypadku błędu, wyświetlamy stosowny komunikat
			// Dla użytkownika nie ma znaczenia, czy błąd pochodzi z API czy z naszej aplikacji
			// więc nie ma sensu wyświetlać mu dokładnej treści błędu
			throw new CustomError(
				400, `Nie udało się wczytać zdjęć. Sprawdź swoje połączenie z Internetem lub logi w konsoli.`
			)
		}
	}
	static fill(images) {
		const gallery = document.querySelector('.gallery-images')
	
		// Tworzenie kart dla każdego obrazka w formie
		/*
			<div class="gallery-item">
				<img src="image.previewURL" alt="image.user:image.id" id="image.id">
				<p>image.user</p>
			</div>
		*/
		// i dodawanie ich do galerii
		images.forEach(image => {
			const item = document.createElement('div')
			item.classList.add('gallery-item')
			item.innerHTML = /*html*/`
				<img src=${image.previewURL} alt=${image.user}:${image.id} id=${image.id}>
				<p>${image.user}</p>
			`
			gallery.appendChild(item)
		})
	}

	static updateDialog(dialog, galleryItems, currentImageIndex, images) {
		// Pobieramy aktualny element z listy NodeList'ów (prawie tablica) o nazwie "galleryItems"
		const item = galleryItems[currentImageIndex]
	
		// Pobieramy znaczniki "p" oraz "img" z aktualnego elementu
		const p = item.querySelector('p')
		const imgPreview = item.querySelector('img')
	
		// Szukamy obrazka w pobranej przez FetchAPI tablicy "images", 
		// który ma takie samo id jak obrazek z aktualnego elementu
		const img = images.find(item => String(item.id) === String(imgPreview.id))
	
		// Aktualizujemy zawartość dialogu
		dialog.innerHTML = /*html*/`
			<div class="dialog-container">
				<div class="dialog-header">
					<p class="dialog-description">Autor: ${p.textContent}</p>
					<button type="button" id="close-dialog">X</button>
				</div>
				<div class="dialog-body">
					<button type="button" class="dialog-button" id="prev-dialog">&lt;</button>
					<img class="dialog-img" src=${img.largeImageURL} alt=${img.user}>
					<button type="button" class="dialog-button" id="next-dialog">&gt;</button>
				</div>
				<p class="dialog-description">Tagi: ${img.tags}</p>
			</div>
		`
	
		// Zdarzenia dla przycisków w dialogu
		document.querySelector('#prev-dialog').addEventListener('click', () => {
			// Aktualizujemy indeks obrazka. Jeśli jest to pierwszy obrazek, przechodzimy do ostatniego
			currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length
			this.updateDialog(dialog, galleryItems, currentImageIndex, images)
		})
	
		document.querySelector('#next-dialog').addEventListener('click', () => {
			// Aktualizujemy indeks obrazka. Jeśli jest to ostatni obrazek, przechodzimy do pierwszego
			currentImageIndex = (currentImageIndex + 1) % galleryItems.length
			this.updateDialog(dialog, galleryItems, currentImageIndex, images)
		})
	
		document.querySelector('#close-dialog').addEventListener('click', () => {
			// Zamykamy dialog
			dialog.close()
		})
	}
}