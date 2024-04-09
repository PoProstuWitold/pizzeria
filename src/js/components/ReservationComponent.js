import { loadStyles } from '../helpers/utils.js'

import { getFormElements } from '../helpers/formElements.js'
import { Reservations } from '../helpers/reservations.js'

export const ReservationComponent = () => {
	document.title = 'Rezerwacja'

	const styles = async () => loadStyles('css/ReservationComponent.css')
	const callback = async () => {
		// POLA FORMULARZA
		// Funkcja, a nie obiekt, ponieważ elementy formularza są dynamiczne
		const formElements = getFormElements()

		// FORMULARZ REZERWACJI
		const form = document.getElementById('rezerwacja')

		// Obsługa zdarzenia submit
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
							element.messageBox.textContent = ''
						})
					})
				} else {
					element.input.addEventListener('focus', function() {
						element.box.classList.remove('error')
						element.messageBox.textContent = ''
					})
				}
				
				// Pobieramy wartość z pola formularza,
				// a następnie przekazujemy ją do 
				// funkcji walidującej danego elementu
				const value = data[key]
				const result = element.validation(value)

				// Jeśli wynik walidacji jest nieprawidłowy,
				// dodajemy klasę error do elementu formularza
				// oraz wyświetlamy komunikat o błędzie
				if (!result.valid) {
					element.box.classList.add('error')
					if(result.message) {
						element.messageBox.textContent = result.message
					} else {
						element.messageBox.textContent = element.defaultMessage
					}
					isValid = false
				} else {
					// W przeciwnym razie, usuwamy klasę error
					element.box.classList.remove('error')

					// Jeśli element nie jest polem informacyjnym, czyścimy komunikat
					if(!element.messageBox.classList.contains('info-message')) {
						element.messageBox.textContent = ''
					}
				}
			}

			// Jeśli formularz nie został poprawnie zwalidowany, 
			// przerywamy działanie funkcji
			if(!isValid) return

			// Jeśli rezerwacja o podanej nazwie już istnieje,
			// usuwamy wszelkie komunikaty i klasy informacyjne
			formElements.code.box.classList.remove('info')
			formElements.code.messageBox.classList.remove('info-message')
			formElements.code.messageBox.textContent = ''
			
			// Informujemy użytkownika o tym, czy rezerwacja została dodana czy zaktualizowana
			Reservations.find(data.code) 
				? alert(`Rezerwacja "${data.code}" została zaktualizowana`) 
				: alert(`Rezerwacja "${data.code}" została dodana`)

			// Zapisujemy nową lub zaktualizowaną rezerwację
			Reservations.save(data)

			// Wczytujemy wszystkie rezerwacje
			Reservations.load()
		}

		
		// Obsługa zdarzenia reset
		const handleReset = () => {
			// Usuwamy wszystkie komunikaty i klasy o błędach
			for (const key in formElements) {
				const element = formElements[key]
				element.box.classList.remove('error')
				element.messageBox.textContent = ''
			}

			// Osobno usuwamy klasy informacyjne dla pola kodu
			// ponieważ jest to jedyne pole, które może być informacyjne
			// w celu odróżnienia edycji od dodawania rezerwacji
			formElements.code.box.classList.remove('info')
			formElements.code.messageBox.classList.remove('info-message')
		}

		// Obsługa zdarzenia focusout, czyli gdy element traci focus,
		// czyli np. gdy użytkownik kliknie w inne miejsce na stronie
		const handleFocusLost = (e) => {
			const code = e.target.value

			// Sprawdzamy, czy rezerwacja o podanej nazwie już istnieje
			const doesExist = Reservations.find(code)
			if(doesExist) {
				// Jeśli tak, dodajemy klasę informacyjną 
				// i wyświetlamy komunikat o edycji rezerwacji
				formElements.code.box.classList.add('info')
				formElements.code.messageBox.classList.add('info-message')
				formElements.code.messageBox.textContent = 'Edytujesz rezerwację o podanej nazwie'
			} else {
				// W przeciwnym razie usuwamy klasy i komunikaty informacyjne
				formElements.code.box.classList.remove('info')
				formElements.code.messageBox.classList.remove('info-message')
				formElements.code.messageBox.textContent = ''
			}
		}

		// Dodajemy "handleFocusLost" tylko do pola "code",
		// ponieważ tylko to pole korzysta z tej funkcji
		formElements.code.input.addEventListener('focusout', handleFocusLost)

		// Dodajemy nasłuchiwacze zdarzeń do formularza
		form.addEventListener('reset', handleReset)
		form.addEventListener('submit', handleSubmit)

		// Wczytujemy rezerwacje z localStorage na starcie komponentu
		Reservations.load()

		console.log(`ReservationComponent callback has been called`)

		// Zwracamy tablicę z nasłuchiwaczami zdarzeń
		// w celu późniejszego ich usunięcia w przypadku zmiany ścieżki, 
		// żeby się nie kumulowały
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
			<section>
				<h1>Zarezerwuj lokal lub stolik</h1>
				<p>Dokonaj rezerwacji stolika lub całej sali dla siebie i swoich gości!
				Odpowiadamy na zgłoszenia w ciągu maksymalnie 3 dni roboczych.
				</p>
			</section>
			<section class="reservation-section">
				<form id="rezerwacja" method="POST">
					<h2>Formularz rezerwacji</h2>
					<!-- Pole tekstowe -->
					<div id="codeBox" class="input-group1">
						<label for="code">Nazwa rezerwacji:</label>
						<input type="text" id="code" name="code">
						<div class="error-message" id="codeMessageBox"></div>
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
						<div class="error-message" id="issuerMessageBox"></div>
					</div>
					<!-- Pole email -->
					<div id="emailBox" class="input-group1">
						<label for="email">Email:</label>
						<input type="email" id="email" name="email">
						<div class="error-message" id="emailMessageBox"></div>
					</div>
					<!-- Pole tekstowe -->
					<div id="nameBox" class="input-group1">
						<label for="name">Imię i nazwisko:</label>
						<input type="text" id="name" name="name">
						<div class="error-message" id="nameMessageBox"></div>
					</div>
					<div id="peselBox" class="input-group1">
						<label for="pesel">PESEL:</label>
						<input type="text" id="pesel" name="pesel">
						<div class="error-message" id="peselMessageBox"></div>
					</div>
					<div id="guestsBox" class="input-group1">
						<label for="guests">Ilość osób:</label>
						<!-- 
						onkeypress sprawdza czy kod ASCII znaku jest liczbą 
						w połączeniu z atrybutem type="number" blokuje wprowadzanie innych znaków
						niż cyfry, a atrybut step="1" pozwala na zwiększanie i zmniejszanie wartości o 1
						wszystko jest też walidowane osobno w funkcji walidującej
						-->
						<input type="number" id="guests" name="guests" min="1" step="1"
						onkeypress="return event.charCode >= 48">
						<div class="error-message" id="guestsMessageBox"></div>
					</div>
					<!-- Pole date -->
					<div id="dateBox" class="input-group1">
						<label for="date">Data:</label>
						<input type="date" id="date" name="date">
						<div class="error-message" id="dateMessageBox"></div>
					</div>
					<!-- Pole time -->
					<div id="timeBox" class="input-group1">
						<label for="time">Czas:</label>
						<input type="time" id="time" name="time">
						<div class="error-message" id="timeMessageBox"></div>
					</div>
					<!-- Lista wyboru -->
					<div id="typeBox" class="input-group1">
						<label for="type">Wybierz opcję:</label>
						<select id="type" name="type">
							<option value="Stolik">Stolik</option>
							<option value="Lokal">Lokal</option>
							<option value="Lokal z cateringiem">Lokal z cateringiem</option>
						</select>
						<div class="error-message" id="typeMessageBox"></div>
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
			</section>
			<section>
				<div>
					<h1>Twoje rezerwacje</h1>
					<p>
					Poniżej masz dostęp do swoich rezerwacji. 
					Możesz je edytować lub usuwać, używając kolejno nazwy rezerwacji w formularzu
					lub klikając przycisk po prawo.
					</p>
				</div>
				<div class="reservations">
					<!-- Karty rezerwacji -->
				</div>
			</section>
		</div>
	`

	return {
		template,
		callback,
		styles
	}
}