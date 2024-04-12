export const randomReviews = (reviewContainer) => {
	// Poprzednia data, jeśli jakaś recenzja już istnieje
    let previousDate

    for(let i = 0; i < 4; i++) {
        // Losujemy ocenę od 1 do 5
        let randomRating = Math.floor(Math.random() * 5) + 1

        // Wybieramy recenzje z taką samą oceną
        let reviewIndex = reviews.findIndex(review => review.rating === randomRating)

        // Jeśli nie ma recenzji z taką oceną, losujemy kolejną ocenę
        while (reviewIndex === -1) {
            randomRating = Math.floor(Math.random() * 5) + 1;
            reviewIndex = reviews.findIndex(review => review.rating === randomRating)
        }

        // Pobieramy recenzję i usuwamy ją z tablicy
        const review = reviews.splice(reviewIndex, 1)[0]

        // Generujemy losową datę między wczoraj a 12 marca
		const oneDay = 24*60*60*1000
        let date = randomDate(new Date(2024, 2, 12), new Date(Date.now() - oneDay))

        // Jeśli to nie jest pierwsza recenzja, to generujemy datę późniejszą od poprzedniej
        while (previousDate && date > previousDate) {
            date = randomDate(new Date(2024, 2, 12), new Date(Date.now() - oneDay))
        }
        previousDate = date
        review.date = date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })

        // Tworzymy nowy element div
        const reviewBox = document.createElement('div')
        reviewBox.classList.add('review-box')
        reviewBox.innerHTML = /*html*/`
            <div class="rating">
                ${review.rating > 0 ? '★'.repeat(review.rating)+'☆'.repeat(5-review.rating) : 'Brak oceny'}
            </div>
            <div class="review-text">
                "${review.text}"
            </div>
            <div class="reviewer-name">
                ${review.reviewer}, ${review.date}
            </div>
        `

        // Dodajemy recenzję do kontenera
        reviewContainer.appendChild(reviewBox)
    }
}

// Funkcja do generowania losowej daty między dwoma datami
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Tablica z recenzjami
const reviews = [
	{
		rating: 5,
		text: 'Super pizza i wspaniała obsługa! Przychodzę regularnie z rodziną i zawsze jesteśmy zadowoleni.',
		reviewer: 'Maria'
	},
	{
		rating: 5,
		text: 'Najlepsza pizzeria w mieście! Jest kilka telewizorów, więc na mecz też można wpaść.',
		reviewer: 'Dawid'
	},
	{
		rating: 5,
		text: 'Zdecydowanie polecam! Pizza zawsze świeża i pyszna. Moje dzieci i żona zadowoleni',
		reviewer: 'Zbigniew'
	},
	{
		rating: 4,
		text: 'Pizza zawsze na czas i gorąca. Sosy mogłyby być większe, ale i tak polecam.',
		reviewer: 'Ania'
	},
	{
		rating: 4,
		text: 'Bardzo dobra pizza, ale mogłoby być więcej dodatków.',
		reviewer: 'Marek'
	},
	{
		rating: 3,
		text: 'Pizza dobra, ale czekałem na nią zbyt długo.',
		reviewer: 'Paweł'
	},
	{
		rating: 3,
		text: 'Średnia pizza, nic specjalnego.',
		reviewer: 'Krzysztof'
	},
	{
		rating: 2,
		text: 'Pizza była zimna, a obsługa niezbyt miła.',
		reviewer: 'Amelia'
	},
	{
		rating: 2,
		text: 'Nie jestem zadowolona. Pizza była niesmaczna.',
		reviewer: 'Magda'
	}
]