import { loadStyles } from '../utils.js'
import { fetchImages, fillGallery, updateDialog } from '../gallery.js'

export const GalleryComponent = () => {
	document.title = 'Galeria'

	const callback = async () => {
		loadStyles('css/GalleryComponent.css')

		const images = await fetchImages()
		
		// Przekroczono limit zapytań do API,
		// więc nie można pobrać zdjęć - wyświetlamy komunikat
		if(images.length === 0) {
			console.log('No images found')
			gallery.innerHTML = '<p>Wystąpił błąd podczas wczytywania zdjęć</p>'
			return
		}
		
		// Wypełniamy galerię zdjęciami
		await fillGallery(images)
		
        const dialog = document.querySelector('#gallery-dialog')
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'))
        let currentImageIndex = 0

		// Dla każdego elementu galerii,
		// dodajemy nasłuchiwacz zdarzeń, który otwiera znacznik "dialog"
		// i wyświetla powiększone zdjęcie
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index
                updateDialog(dialog, galleryItems, currentImageIndex, images)
                dialog.showModal()
            })
        })

		console.log(`GalleryComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="gallery-container">
			<div>
				<h1>Galeria</h1>
				<p>Poniżej prezentujemy zdjęcia zrobione przez naszych klientów.</p>
			</div>
			<div class="gallery">
				<!-- Zdjęcia -->
			</div>
			<dialog id="gallery-dialog">
				<!-- Powiększone zdjęcie -->
			</dialog>
		</div>
	`

	return {
		template,
		callback
	}
}