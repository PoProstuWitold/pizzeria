import { loadStyles } from '../utils.js'

export const ReservationComponent = () => {
	document.title = 'Rezerwacja'

	const callback = async () => {
		loadStyles('css/ReservationComponent.css')

		/* POLA FORMULARZA */
		const formElements = {
			email: {
				input: document.getElementById('email'),
				box: document.getElementById('emailBox'),
				error: document.getElementById('emailError'),
				defaultMessage: 'Podaj adres email',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					const emailRegEx = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
					// Maksymalna długość adresu email według Standardu RFC 5321
					const emailMaxLen = 320

					return {
						message: 'Podaj poprawny adres email',
						valid: value.match(emailRegEx) && value.length <= emailMaxLen,
					}
				}
			},
			name: {
				input: document.getElementById('name'),
				box: document.getElementById('nameBox'),
				error: document.getElementById('nameError'),
				defaultMessage: 'Podaj imię i nazwisko',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					return {
						message: 'Podaj poprawne imię i nazwisko',
						valid: value.match(new RegExp(/^([a-zA-Z]+) ?([a-zA-Z]*) ([a-zA-Z]+)$/))
					}
				}
			},
			pesel: {
				input: document.getElementById('pesel'),
				box: document.getElementById('peselBox'),
				error: document.getElementById('peselError'),
				defaultMessage: 'Podaj numer PESEL',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					return {
						message: 'Podaj poprawny numer PESEL',
						valid: value.match(new RegExp(/^[0-9]{11}$/))
					}
				}
			},
			code: {
				input: document.getElementById('code'),
				box: document.getElementById('codeBox'),
				error: document.getElementById('codeError'),
				defaultMessage: 'Podaj nazwę rezerwacji',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					const codeRegExp = new RegExp(/^[a-zA-Z]/)
					if(!value.match(codeRegExp)) return {
						valid: false,
						message: 'Nazwa rezerwacji musi zaczynać się od litery alfabetu'
					}

					return {
						message: 'Nazwa rezerwacji musi mieć długość od 5 do 20 znaków',
						valid: value.length >= 5 && value.length <= 20
					}
				}
			},
			guests: {
				input: document.getElementById('guests'),
				box: document.getElementById('guestsBox'),
				error: document.getElementById('guestsError'),
				defaultMessage: 'Podaj liczbę gości',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					if(!value > 0) return {
						message: 'Liczba gości musi być większa od 0',
						valid: false
					}

					if(value > 40) return {
						message: 'Maksymalna liczba gości to 40 osób',
						valid: false
					}

					return {
						valid: true
					}
				}
			},
			date: {
				input: document.getElementById('date'),
				box: document.getElementById('dateBox'),
				error: document.getElementById('dateError'),
				defaultMessage: 'Podaj datę rezerwacji',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					const date = new Date(value)
					const now = new Date()

					const weekAhead = new Date().setDate(now.getDate() + 6)
					const threeMonthsAhead = new Date().setMonth(now.getMonth() + 3)

					if(!(weekAhead <= date)) return {
						message: 'Data rezerwacji musi być z minium tygodniowym wyprzedzeniem',
						valid: false
					}

					if(!(threeMonthsAhead >= date)) return {
						message: 'Data rezerwacji nie może być później niż 3 miesiące od teraz',
						valid: false
					}

					return {
						valid: true
					}
				}
			},
			time: {
				input: document.getElementById('time'),
				box: document.getElementById('timeBox'),
				error: document.getElementById('timeError'),
				defaultMessage: 'Podaj godzinę rezerwacji',
				validation: (value) => {
					if(!value) return {
						valid: false
					}

					const [hours, minutes] = value.split(':').map(Number)
					const time = hours * 100 + minutes

					// Sprawdź, czy godzina jest między 12 a 20
					if(time < 1200 || time >= 2001) {
						return {
							valid: false,
							message: 'Godzina rezerwacji musi być między 12, a 20'
						}
					}

					return {
						valid: true
					}
				}
			},
			type: {
				input: document.getElementById('type'),
				box: document.getElementById('typeBox'),
				error: document.getElementById('typeError'),
				defaultMessage: 'Podaj rodzaj rezerwacji',
				validation: (value) => {
					return {
						valid: value
					}
				}
			},
			issuer: {
				input: document.getElementsByName('issuer'),
				box: document.getElementById('issuerBox'),
				error: document.getElementById('issuerError'),
				defaultMessage: 'Podaj rodzaj podmiotu rezerwującego',
				validation: (value) => {
					return {
						valid: value
					}
				}
			}
		}

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
					element.error.textContent = ''
				}
			}

			if(!isValid) return
			
			alert(JSON.stringify(data, null, 4))
		}

		const handleReset = () => {
			for (const key in formElements) {
				const element = formElements[key]
				element.box.classList.remove('error')
				element.error.textContent = ''
			}
		}

		form.addEventListener('reset', handleReset)
		form.addEventListener('submit', handleSubmit)

		console.log(`ReservationComponent callback has been called`)

		return [
			{
				event: 'submit',
				handler: handleSubmit
			},
			{
				event: 'reset',
				handler: handleReset
			}
		]
	}

	const template = /*html*/`
		<div class="reservation-container">
			<div>
				<h1>Rezerwacja</h1>
				<p>Dokonaj rezerwacji stolika na jedno posiedzenie lub całej sali, nawet na kilka dni!
				Odpowiadamy na zgłoszenia w ciągu maksymalnie 3 dni roboczych.
				</p>
			</div>
			<div>
				<form id="rezerwacja" method="POST">
					<h2>Formularz rezerwacji</h2>
					<!-- Pole radio -->
					<div id="issuerBox" class="issuer">
						<fieldset class="input-group3">
  							<legend>Rezerwacja jako</legend>
							<div class="input-group2">
								<label for="private">Osoba prywatna</label>
								<input type="radio" id="private" name="issuer" value="OSOBA_PRYWATNA">
							</div>
							<div class="input-group2">
								<label for="company">Firma</label>
								<input type="radio" id="company" name="issuer" value="FIRMA">
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
					<div id="codeBox" class="input-group1">
						<label for="code">Nazwa rezerwacji:</label>
						<input type="text" id="code" name="code">
						<div class="error-message" id="codeError"></div>
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
					<div id="timeBox" class="input-group1">
						<label for="time">Czas:</label>
						<input type="time" id="time" name="time">
						<div class="error-message" id="timeError"></div>
					</div>
					
					<!-- Lista wyboru -->
					<div id="typeBox" class="input-group1">
						<label for="type">Wybierz opcję:</label>
						<select id="type" name="type">
							<option value="stolik">Stolik</option>
							<option value="lokal">Lokal</option>
							<option value="lokal_catering">Lokal z cateringiem</option>
						</select>
						<div class="error-message" id="typeError"></div>
					</div>
				
					<!-- Pole checkbox -->
					<div class="input-group2">
						<label for="promoConsent">Zgoda na użycie zdjęć w celach promocyjnych</label>
						<input type="checkbox" id="promoConsent" name="promoConsent">
					</div>

					<div class="input-buttons">
						<input type="submit" value="Wyślij">
						<input type="reset" value="Resetuj">
					</div>
				</form>
			</div>
		</div>
	`

	return {
		template,
		callback
	}
}