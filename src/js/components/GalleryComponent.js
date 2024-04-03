import { loadStyles } from '../utils.js'
import { fetchImages, fillGallery, updateDialog } from '../gallery.js'

export const GalleryComponent = () => {
	document.title = 'Galeria'

	const callback = async () => {
		loadStyles('css/GalleryComponent.css')

		const images = await fetchImages()
		
		// Przekroczono limit zapytań do API
		if(images.length === 0) {
			console.log('No images found')
			gallery.innerHTML = '<p>Wystąpił błąd podczas wczytywania zdjęć</p>'
			return
		}
		
		await fillGallery(images)
		
        const dialog = document.querySelector('#gallery-dialog')
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'))
        let currentImageIndex = 0

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
			<!-- GALERIA -->
			<div class="gallery">
				<!-- ZDJECIA -->
			</div>
			<dialog id="gallery-dialog">
				<!-- POWIEKSZONE ZDJECIE -->
			</dialog>
		</div>
	`

	return {
		template,
		callback
	}
}