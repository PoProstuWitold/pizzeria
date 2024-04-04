export const saveReservation = (reservation) => {
    // Pobieramy aktualną listę rezerwacji z localStorage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || []

    // Sprawdzamy, czy rezerwacja o tym samym "code" już istnieje
    const index = reservations.findIndex(res => res.code === reservation.code)

    if (index !== -1) {
        // Jeśli tak, nadpisujemy ją
        reservations[index] = reservation
    } else {
        // Jeśli nie, dodajemy ją do listy
        reservations.push(reservation)
    }

    // Zapisujemy zaktualizowaną listę rezerwacji do localStorage
    localStorage.setItem('reservations', JSON.stringify(reservations))
}

export const reservationExists = (code) => {
    // Pobieramy aktualną listę rezerwacji z localStorage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || []

    // Sprawdzamy, czy rezerwacja o podanym kodzie już istnieje
    return reservations.findIndex(reservation => reservation.code === code) !== -1

}

const deleteReservation = (code) => {
    // Pobieramy aktualną listę rezerwacji z localStorage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || []

    // Usuwamy rezerwację o podanym kodzie
    reservations = reservations.filter(reservation => reservation.code !== code)

    // Zapisujemy zaktualizowaną listę rezerwacji do localStorage
    localStorage.setItem('reservations', JSON.stringify(reservations))

    // Ponownie załadowujemy rezerwacje
    loadReservations()
}

export const loadReservations = () => {
    // Pobieramy aktualną listę rezerwacji z localStorage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || []

    // Pobieramy kontener, do którego chcesz dodać karty
    let container = document.querySelector('.reservations')

	// Usuwamy wszystkie karty z kontenera, aby uniknąć duplikatów
    container.innerHTML = ''

    // Dla każdej rezerwacji w tablicy...
    reservations.forEach(reservation => {
        // Tworzymy nowy element div z klasą "card"
        let card = document.createElement('div')
        card.className = 'card'

        // Dodajemy do karty informacje o rezerwacji
        card.innerHTML = /*html*/`
            <div class="card-header">
				<h2 class="card-title">${reservation.code}</h2>
				<button class="delete-button">Usuń</button>
			</div>
            <p class="card-text"><strong>Klient:</strong> ${reservation.issuer}</p>
            <p class="card-text"><strong>Email:</strong> ${reservation.email}</p>
            <p class="card-text"><strong>Imię i nazwisko:</strong> ${reservation.name}</p>
            <p class="card-text"><strong>Pesel:</strong> ${reservation.pesel}</p>
            <p class="card-text"><strong>Liczba gości:</strong> ${reservation.guests}</p>
            <p class="card-text"><strong>Data i godzina:</strong> ${reservation.date}, ${reservation.time}</p>
            <p class="card-text"><strong>Typ:</strong> ${reservation.type}</p>
			<p class="card-text"><strong>Zgoda na zdjęcia:</strong> ${reservation.promoConsent ? 'Tak' : 'Nie'}</p>
        `

        // Dodajemy zdarzenie kliknięcia do przycisku usuwania
        card.querySelector('.delete-button').addEventListener('click', () => deleteReservation(reservation.code))

        // Dodajemy kartę do kontenera
        container.appendChild(card)
    })
}