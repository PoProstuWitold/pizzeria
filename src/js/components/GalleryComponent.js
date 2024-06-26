import { loadStyles } from '../helpers/utils.js'

import { Gallery } from '../helpers/gallery.js'

export const GalleryComponent = () => {
	document.title = 'Galeria'

	const styles = async () => loadStyles('css/GalleryComponent.css')
	const callback = async () => {
		// Pobieramy obrazki z API Pixabay.
		// Ewentualne błędy są wyłapywane w bloku try-catch w metodzie "fetchImages" w pliku "gallery.js
		// a następnie w bloku try-catch w metodzie "render" w pliku "app.js"
		const images = await Gallery.fetchImages()
				
		// Wypełniamy galerię zdjęciami
		Gallery.fill(images)
		
        const dialog = document.querySelector('#gallery-dialog')

		// galleryItems to nie tablica, lecz NodeList, więc konwertujemy go na tablicę
		// w celu użycia metody forEach
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'))
        let currentImageIndex = 0

		// Dla każdego elementu galerii,
		// dodajemy nasłuchiwacz zdarzeń, który otwiera znacznik "dialog"
		// i wyświetla powiększone zdjęcie
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index
                Gallery.updateDialog(dialog, galleryItems, currentImageIndex, images)
                dialog.showModal()
            })
        })

		console.log(`GalleryComponent callback has been called`)
	}

	const template = /*html*/`
		<section class="gallery-container">
			<div>
				<h1>Galeria</h1>
				<p>Poniżej prezentujemy zdjęcia zrobione przez naszych klientów.</p>
			</div>
			<div class="gallery-images">
				<!-- Zdjęcia -->
			</div>
			<dialog id="gallery-dialog">
				<!-- Powiększone zdjęcie -->
			</dialog>
		</section>
	`

	return {
		template,
		callback,
		styles
	}
}