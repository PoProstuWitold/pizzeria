import { loadStyles } from '../utils.js'

export const AboutComponent = () => {
	document.title = 'O nas'

	const callback = async () => {
		loadStyles('css/AboutComponent.css')

		console.log(`AboutComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="about-container">
			<h1>O nas</h1>
			<p>Jesteśmy najlepszą wymyśloną pizzerią w Polsce! Działamy już ponad 20 lat. Serdecznie zapraszamy!</p>
			<p>
				Zapraszamy do sprawdzenia kodu źródłowego naszej 
				<a class="source-code-link" href="https://github.com/PoProstuWitold/pizzeria" target="_blank">strony</a>.
				Stronę zaprojektował i zaprogramował <i>Witold Adam Zawada</i>.
			</p>
		</div>
	`

	return {
		template,
		callback
	}
}