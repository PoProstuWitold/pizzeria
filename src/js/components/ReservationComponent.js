import { loadStyles } from '../utils.js'
import { getFormElements } from '../formElements.js'
import { loadReservations, reservationExists, saveReservation } from '../reservations.js'

export const ReservationComponent = () => {
	document.title = 'Rezerwacja'

	const callback = async () => {
		loadStyles('css/ReservationComponent.css')

		/* POLA FORMULARZA */
		// funkcja, a nie obiekt, ponieważ elementy formularza są dynamiczne
		const formElements = getFormElements()

		// FORMULARZ REZERWACJI
		const form = document.getElementById('rezerwacja')
		const handleSubmit = (e) => {
			e.preventDefault()
			const formData = new FormData(form)
			const data = Object.fromEntries(formData)
			// console.log('data', data)

			// Walidacja
			let isValid = true
			for (const key in formElements) {
				const element = formElements[key]

				if (element.input.length > 1) {
					// Jeśli element jest polem typu radio, musimy dodać nasłuchiwacz zdarzeń do każdego elementu w liście
					// Kilka elementów o tej samej nazwie, ale różnych wartościach są NodeListą
					// NodeList != tablica, więc nie możemy użyć forEach dopóki nie przekonwertujemy go na tablicę
					Array.from(element.input).forEach((inputElement) => {
						inputElement.addEventListener('focus', function() {
							element.box.classList.remove('error')
							element.error.textContent = ''
						})
					})
				} else {
					element.input.addEventListener('focus', function() {
						element.box.classList.remove('error')
						element.error.textContent = ''
					})
				}
				
				const value = data[key]
				const result = element.validation(value)

				if (!result.valid) {
					element.box.classList.add('error')
					if(result.message) {
						element.error.textContent = result.message
					} else {
						element.error.textContent = element.defaultMessage
					}
					isValid = false
				} else {
					element.box.classList.remove('error')
					if(!element.error.classList.contains('info-message')) {
						element.error.textContent = ''
					}
				}
			}

			if(!isValid) return
			formElements.code.box.classList.remove('info')
			formElements.code.error.classList.remove('info-message')
			formElements.code.error.textContent = ''
			
			reservationExists(data.code) 
				? alert(`Rezerwacja "${data.code}" została zaktualizowana`) 
				: alert(`Rezerwacja "${data.code}" została dodana`)

			saveReservation(data)
			loadReservations()
			
			// alert(JSON.stringify(data, null, 4))
		}

		const handleReset = () => {
			for (const key in formElements) {
				const element = formElements[key]
				element.box.classList.remove('error')
				element.error.textContent = ''
			}
			formElements.code.box.classList.remove('info')
			formElements.code.error.classList.remove('info-message')
		}

		const handleFocusLost = (e) => {
			const code = e.target.value

			// console.log('focus lost', code)
			
			const doesExist = reservationExists(code)
			if(doesExist) {
				formElements.code.box.classList.add('info')
				formElements.code.error.classList.add('info-message')
				formElements.code.error.textContent = 'Edytujesz rezerwację o podanej nazwie'
			} else {
				formElements.code.box.classList.remove('info')
				formElements.code.error.classList.remove('info-message')
				formElements.code.error.textContent = ''
			}
		}

		formElements.code.input.addEventListener('focusout', handleFocusLost)

		form.addEventListener('reset', handleReset)
		form.addEventListener('submit', handleSubmit)
		loadReservations()

		console.log(`ReservationComponent callback has been called`)

		return [
			{
				event: 'submit',
				handler: handleSubmit
			},
			{
				event: 'reset',
				handler: handleReset
			},
			{
				event: 'focusout',
				handler: handleFocusLost
			}
		]
	}

	const template = /*html*/`
		<div class="reservation-container">
			<div>
				<h1>Zarezerwuj lokal lub stolik</h1>
				<p>Dokonaj rezerwacji stolika na jedno posiedzenie lub całej sali, nawet na kilka dni!
				Odpowiadamy na zgłoszenia w ciągu maksymalnie 3 dni roboczych.
				</p>
			</div>
			<div class="reservation-section">
				<form id="rezerwacja" method="POST">
					<h2>Formularz rezerwacji</h2>
					<!-- Pole tekstowe -->
					<div id="codeBox" class="input-group1">
						<label for="code">Nazwa rezerwacji:</label>
						<input type="text" id="code" name="code">
						<div class="error-message" id="codeError"></div>
					</div>
					<!-- Pole radio -->
					<div id="issuerBox" class="issuer">
						<fieldset class="input-group3">
  							<legend>Rezerwacja jako</legend>
							<div class="input-group2">
								<label for="private">Osoba prywatna</label>
								<input type="radio" id="private" name="issuer" value="Osoba prywatna">
							</div>
							<div class="input-group2">
								<label for="company">Firma</label>
								<input type="radio" id="company" name="issuer" value="Firma">
							</div>
						</fieldset>
						<div class="error-message" id="issuerError"></div>
					</div>
					<!-- Pole email -->
					<div id="emailBox" class="input-group1">
						<label for="email">Email:</label>
						<input type="email" id="email" name="email">
						<div class="error-message" id="emailError"></div>
					</div>
					<!-- Pole tekstowe -->
					<div id="nameBox" class="input-group1">
						<label for="name">Imię i nazwisko:</label>
						<input type="text" id="name" name="name">
						<div class="error-message" id="nameError"></div>
					</div>
					<div id="peselBox" class="input-group1">
						<label for="pesel">PESEL:</label>
						<input type="text" id="pesel" name="pesel">
						<div class="error-message" id="peselError"></div>
					</div>
					<div id="guestsBox" class="input-group1">
						<label for="guests">Ilość osób:</label>
						<input type="number" id="guests" name="guests" min="1" step="1"
						onkeypress="return event.charCode >= 48">
						<div class="error-message" id="guestsError"></div>
					</div>
					<!-- Pole date -->
					<div id="dateBox" class="input-group1">
						<label for="date">Data:</label>
						<input type="date" id="date" name="date">
						<div class="error-message" id="dateError"></div>
					</div>
					<!-- Pole time -->
					<div id="timeBox" class="input-group1">
						<label for="time">Czas:</label>
						<input type="time" id="time" name="time">
						<div class="error-message" id="timeError"></div>
					</div>
					<!-- Lista wyboru -->
					<div id="typeBox" class="input-group1">
						<label for="type">Wybierz opcję:</label>
						<select id="type" name="type">
							<option value="Stolik">Stolik</option>
							<option value="Lokal">Lokal</option>
							<option value="Lokal z cateringiem">Lokal z cateringiem</option>
						</select>
						<div class="error-message" id="typeError"></div>
					</div>
					<!-- Pole checkbox -->
					<div class="input-group2">
						<label for="promoConsent">Zgoda na użycie zdjęć w celach promocyjnych</label>
						<input type="checkbox" id="promoConsent" name="promoConsent">
					</div>
					<!-- Przyciski -->
					<div class="input-buttons">
						<input type="submit" value="Wyślij">
						<input type="reset" value="Resetuj">
					</div>
				</form>
			</div>
			<div>
				<h1>Twoje rezerwacje</h1>
				<p>
				Poniżej masz dostęp do swoich rezerwacji. 
				Możesz je edytować lub usuwać, używając kolejno nazwy rezerwacji w formularzu
				lub klikając przycisk po prawo.
				</p>
			</div>
			<div class="reservations">
				<!-- RESERVATION CARDS -->
			</div>
		</div>
	`

	return {
		template,
		callback
	}
}