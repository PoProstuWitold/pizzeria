import { loadStyles } from '../helpers/utils.js'

export const AboutComponent = () => {
	document.title = 'O nas'

	const styles = async () => loadStyles('css/AboutComponent.css')
	const callback = async () => {
		console.log(`AboutComponent callback has been called`)
	}

	const template = /*html*/`
		<section class="about-container">
			<h1>O nas</h1>
			<p>Jesteśmy najlepszą wymyśloną pizzerią w Polsce! Działamy już ponad 20 lat. Serdecznie zapraszamy!</p>
			<p>
				Zapraszamy do sprawdzenia kodu źródłowego naszej 
				<a class="source-code-link" href="https://github.com/PoProstuWitold/pizzeria" target="_blank">strony</a>.
				Stronę zaprojektował i zaprogramował <i>Witold Adam Zawada</i>.
			</p>
		</section>
	`

	return {
		template,
		callback,
		styles
	}
}