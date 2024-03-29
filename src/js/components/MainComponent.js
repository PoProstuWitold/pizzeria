export const MainComponent = () => {
	document.title = 'GitGud Pizza'

	const callback = async () => {
		console.log(`MainComponent callback has been called`)
	}

	const template = /*html*/`
		<div>
			<h1>Pizzeria GitGud</h1>
			<p>Niezmiernie nam miło, że nas odwiedziłeś! Zapraszamy do lokalu na pyszną pizze i inne jedzenie!</p>
		</div>
	`

	return {
		template,
		callback
	}
}