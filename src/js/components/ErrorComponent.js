import { loadStyles } from '../helpers/utils.js'

export const ErrorComponent = (code, message) => {
	document.title = `Błąd ${code}`

	const styles = async () => loadStyles('css/ErrorComponent.css')
	const callback = async () => {
		console.error(`Błąd ${code}: ${message}`)
		console.log(`ErrorComponent callback has been called`)
	}

	const template = /*html*/`
		<section class="error-container">
			<h1 class="error-title">Błąd ${code}</h1>
			<p class="error-message">${message}</p>
			<a class="error-button" href="/">Powrót do strony głównej</a>
		</section>
	`

	return {
		template,
		callback,
		styles
	}
}