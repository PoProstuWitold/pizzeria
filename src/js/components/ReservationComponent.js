import { loadStyles } from '../utils.js'

export const ReservationComponent = () => {
	document.title = 'Rezerwacja'

	const callback = async () => {
		loadStyles('css/ReservationComponent.css')

		console.log(`ReservationComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="reservation-container">
			<h1>Rezerwacja</h1>
			<p>Dokonaj rezerwacji stolika na jedno posiedzenie lub całej sali, nawet na kilka dni!
			Odpowiadamy na zgłoszenia w ciągu maksymalnie 3 dni roboczych.
			</p>
		</div>
	`

	return {
		template,
		callback
	}
}