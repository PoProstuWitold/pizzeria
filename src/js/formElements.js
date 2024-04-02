export const getFormElements = () => {
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
	return formElements
}