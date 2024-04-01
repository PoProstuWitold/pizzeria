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
		<div>
			<h1>O nas</h1>
			<p>Jesteśmy najlepszą wymyśloną pizzerią w Polsce! Działamy już ponad 20 lat. Serdecznie zapraszamy!</p>
			<img src="assets/logo.png" alt="pizza">
			<button id="myButton">Kliknij mnie!</button>
		</div>
	`

	return {
		template,
		callback
	}
}