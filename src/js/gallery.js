const PIXABAY_URL = 
`https://pixabay.com/api/?key=43217952-49b985ba5b4a301637dfa1398&q=pizza&image_type=photo&min_width=350&min_height=200&per_page=10`


export const fetchImages = async () => {
	const response = await fetch(PIXABAY_URL)
	const data = await response.json()
	return data.hits
}

export const fillGallery = async (images) => {
	const gallery = document.querySelector('.gallery')
	
	images.forEach(image => {
		const item = document.createElement('div')
		item.classList.add('gallery-item')
		item.innerHTML = /*html*/`
			<img src=${image.previewURL} alt=${image.tags} id=${image.id}>
			<p>${image.user}</p>
		`
		gallery.appendChild(item)
	})
}

export const updateDialog = (dialog, galleryItems, currentImageIndex, images) => {
	const item = galleryItems[currentImageIndex]
	const p = item.querySelector('p')
	const imgPreview = item.querySelector('img')
	const img = images.find(item => String(item.id) === String(imgPreview.id))

	dialog.innerHTML = /*html*/`
		<div class="dialog-container">
			<div class="dialog-header">
				<p class="dialog-description">Autor: ${p.textContent}</p>
				<button id="close-dialog">X</button>
			</div>
			<div class="dialog-body">
				<button class="dialog-button" id="prev-dialog"><</button>
				<img class="dialog-img" src=${img.largeImageURL} alt=${img.tags}>
				<button class="dialog-button" id="next-dialog">></button>
			</div>
			<p class="dialog-description">Tagi: ${img.tags}</p>
		</div>
	`

	document.querySelector('#prev-dialog').addEventListener('click', () => {
		currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length
		updateDialog(dialog, galleryItems, currentImageIndex, images)
	})

	document.querySelector('#next-dialog').addEventListener('click', () => {
		currentImageIndex = (currentImageIndex + 1) % galleryItems.length
		updateDialog(dialog, galleryItems, currentImageIndex, images)
	})

	document.querySelector('#close-dialog').addEventListener('click', () => {
		dialog.close()
	})
}