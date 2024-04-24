import { loadStyles } from '../helpers/utils.js'

export const ExampleComponent = () => {
	document.title = 'Przykładowy komponent'

	const styles = async () => loadStyles('css/AboutComponent.css')
	const callback = async () => {
		console.log(`AboutComponent callback has been called`)
	}

	const template = /*html*/`
		<section>
			<h1>Przykładowy komponent</h1>
			<p>
				"template" to szablon html, który zostanie wstawiony 
				jako innerHTML do div'a o id="app"w pliku "index.html"
			</p>
		</section>
	`

	return {
		template,
		callback,
		styles
	}
}