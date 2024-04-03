import { loadStyles } from '../utils.js'

export const AboutComponent = () => {
	document.title = 'O nas'

	const callback = async () => {
		loadStyles('css/AboutComponent.css')

		const button = document.getElementById('myButton')
		button.addEventListener('click', () => {
			alert('test')
		})

		console.log(`AboutComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="about-container">
			<h1>O nas</h1>
			<p>Jesteśmy najlepszą wymyśloną pizzerią w Polsce! Działamy już ponad 20 lat. Serdecznie zapraszamy!</p>
			<p>Zapraszamy do sprawdzenia kodu źródłowego naszej <a class="source-code-linkg" href="https://github.com/PoProstuWitold/pizzeria" target="_blank">strony</a></p>
		</div>
	`

	return {
		template,
		callback
	}
}