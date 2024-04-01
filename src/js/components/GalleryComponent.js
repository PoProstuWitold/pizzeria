import { loadStyles } from '../utils.js'

export const GalleryComponent = () => {
	document.title = 'Galeria'

	const callback = async () => {
		loadStyles('css/GalleryComponent.css')

		console.log(`GalleryComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="gallery-container">
			<h1>Galeria</h1>
			<p>Poniżej prezentujemy zdjęcia naszego lokalu jak i wyrobów naszych kucharzy</p>
			<p>zdjecie1.jpg</p>
			<p>zdjecie2.jpg</p>
			<p>zdjecie3.jpg</p>
			<p>zdjecie4.jpg</p>
			<p>zdjecie5.jpg</p>
		</div>
	`

	return {
		template,
		callback
	}
}