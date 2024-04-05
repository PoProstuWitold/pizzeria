import { loadStyles } from '../helpers/utils.js'

export const ErrorComponent = (code, message) => {
	document.title = `Błąd ${code}`

	const styles = async () => loadStyles('css/ErrorComponent.css')
	const callback = async () => {
		console.log(`ErrorComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="error-container">
			<h1 class="error-title">Błąd ${code}</h1>
			<p class="error-message">${message}</p>
			<a class="error-button" href="/">Powrót do strony głównej</a>
		</div>
	`

	return {
		template,
		callback,
		styles
	}
}