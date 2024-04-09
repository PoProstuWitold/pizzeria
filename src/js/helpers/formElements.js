/*

Z racji tego, że formularz rezerwacji jest dość rozbudowany
oraz posiada powtarzalną logikę zdecydowałem się wydzielić
funkcję getFormElements, która zwraca obiekt zawierający
elementy formularza wraz z ich walidacją. Dzięki temu
możemy uniknąć powtarzalnego kodu w komponencie, zgodnie
z zasadą DRY (Don't Repeat Yourself).

"defaultMessage" - domyślna wiadomość, która wyświetla się w przypadku
braku wartości. Jest zastępowana przez "message", jeśli logika walidacji
wymaga czegoś więcej (np. numer PESEL musi mieć 11 cyfr) jest zastępowana
wiadomością "message".

Jest to funkcja, a nie obiekt, ponieważ elementy formularza są dynamiczne
i nie istnieją w momencie deklaracji obiektu.

*/

export const getFormElements = () => {
	const formElements = {
		email: {
			input: document.getElementById('email'),
			box: document.getElementById('emailBox'),
			messageBox: document.getElementById('emailMessageBox'),
			defaultMessage: 'Podaj adres email',
			validation: (value) => {
				if(!value) return {
					valid: false
				}
	
				// Wyrażenie regularne dla adresu email
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
			messageBox: document.getElementById('nameMessageBox'),
			defaultMessage: 'Podaj imię i nazwisko',
			validation: (value) => {
				if(!value) return {
					valid: false
				}
				
				// Wyrażenie regularne dla imienia, drugiego imienia i nazwiska
				// w formie "PierwszeImie DrugieImie(opcjonalnie) Nazwisko"
				const nameRegEx = new RegExp(/^([a-zA-Z]+) ?([a-zA-Z]*) ([a-zA-Z]+)$/)

				return {
					message: 'Podaj poprawne imię i nazwisko',
					valid: value.match(nameRegEx)
				}
			}
		},
		pesel: {
			input: document.getElementById('pesel'),
			box: document.getElementById('peselBox'),
			messageBox: document.getElementById('peselMessageBox'),
			defaultMessage: 'Podaj numer PESEL',
			validation: (value) => {
				if(!value) return {
					valid: false
				}

				// Wyrażenie regularne dla numeru PESEL w formie 11 cyfr
				const peselRegExp = new RegExp(/^[0-9]{11}$/)
	
				return {
					message: 'Podaj poprawny numer PESEL',
					valid: value.match(peselRegExp)
				}
			}
		},
		code: {
			input: document.getElementById('code'),
			box: document.getElementById('codeBox'),
			messageBox: document.getElementById('codeMessageBox'),
			defaultMessage: 'Podaj nazwę rezerwacji',
			validation: (value) => {
				if(!value) return {
					valid: false
				}
	
				// Wyrażenie regularne dla nazwy rezerwacji w formie,
				// gdzie pierwszy znak musi być literą alfabetu. Małą lub dużą.
				const codeRegExp = new RegExp(/^[a-zA-Z]/)

				if(!value.match(codeRegExp)) return {
					valid: false,
					message: 'Nazwa rezerwacji musi zaczynać się od litery alfabetu'
				}
	
				return {
					message: 'Nazwa rezerwacji musi mieć długość od 3 do 10 znaków',
					valid: value.length >= 3 && value.length <= 10
				}
			}
		},
		guests: {
			input: document.getElementById('guests'),
			box: document.getElementById('guestsBox'),
			messageBox: document.getElementById('guestsMessageBox'),
			defaultMessage: 'Podaj liczbę gości',
			validation: (value) => {
				if(!value) return {
					valid: false
				}

				if(value.startsWith('0') && value.length >= 2) return {
					message: 'Liczba gości nie może zaczynać się od zera',
					valid: false
				}
	
				if(value <= 0) return {
					message: 'Liczba gości musi być większa od 0',
					valid: false
				}
	
				if(value > 40) return {
					message: 'Maksymalna liczba gości to 40 osób',
					valid: false
				}

				// Sprawdzamy, czy wartość jest liczbą całkowitą
				if(!Number.isInteger(parseFloat(value))) return {
					message: 'Liczba gości musi być liczbą całkowitą',
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
			messageBox: document.getElementById('dateMessageBox'),
			defaultMessage: 'Podaj datę rezerwacji',
			validation: (value) => {
				if(!value) return {
					valid: false
				}
	
				const date = new Date(value)
				const now = new Date()
	
				// Data rezerwacji + 7 dni - 1 dzień (bo dni są indeksowane od 0)
				const weekAhead = new Date().setDate(now.getDate() + 7 - 1)

				// Data rezerwacji + 3 miesiące
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
			messageBox: document.getElementById('timeMessageBox'),
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
						message: 'Godzina rezerwacji musi być między 12:00, a 20:00'
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
			messageBox: document.getElementById('typeMessageBox'),
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
			messageBox: document.getElementById('issuerMessageBox'),
			defaultMessage: 'Podaj rodzaj podmiotu rezerwującego',
			validation: (value) => {
				return {
					valid: value
				}
			}
		}
	}
	return formElements
}