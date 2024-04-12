import { loadStyles } from '../helpers/utils.js'

import { randomReviews } from '../helpers/reviews.js'

export const MainComponent = () => {
	document.title = 'GitGud Pizza'

	const styles = async () => loadStyles('css/MainComponent.css')
	const callback = async () => {
		// Losujemy recenzje i wypełniamy nimi kontener
		randomReviews(document.querySelector('.main-reviews'))
		console.log(`MainComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="main-container">
			<section class="main-image">
				<img src="../assets/img/pizza-bg.webp" fetchpriority="high" alt="Pizza Background" style="position: absolute; width: 100%; height: 100%; object-fit: cover;" loading="eager">
				<div style="position: relative;">
					<h1>Pizzeria GitGud</h1>
					<h2>Szybko, smacznie i tanio!</h2>
				</div>
			</section>
			<div class="main-content">
				<!-- Recenzje -->
				<section>
					<div class="main-heading">
						<h1>Co mówią o nas klienci?</h1>
						<p>
						Nam możesz nie ufać, więc posłuchaj, co mają do powiedzenia koneserzy pizzy i kuchni włoskiej odwiedzający nasz lokal!
						</p>
					</div>
					<div class="main-reviews">
						<!-- Recenzje -->
					</div>
					<div class="main-more-reviews">
						<!-- Opinie Pollub WEiI na Google -->
						<a href="https://g.co/kgs/hCE7x7P" target="_blank" class="review-link">Zobacz wszystkie opinie →</a>
					</div>
				</section>
				<!-- Oferta -->
				<section>
					<h1>Co oferujemy?</h1>
					<div class="main-offer">
						<div class="main-offer-text">
							<p>
							Pizzeria GitGud oferuje szeroki wybór pizz, dań kuchni włoskiej, fastfoodów i napojów. 
							W naszym menu znajdziesz zarówno klasyczne smaki, jak i unikatowe kompozycje stworzone 
							przez naszych kucharzy. Zapraszamy do odwiedzenia naszego lokalu lub skorzystania 
							z dostawy na terenie Lublina i okolic.
							</p>
							<p>
							Podajemy również alkohole, w tym piwo. 
							W naszym lokalu znajdują się 3 telewizory. Transmitujemy wszystkie mecze
							naszych reprezentacji narodowych, wszystkie ważniejsze wydarzenia sportowe oraz ligi europejskie.
							</p>
							<p>
							Oferujemy też imprezy okolicznościowe, takie jak urodziny, imieniny, spotkania firmowe, 
							jak i rezerwację stolika na daną godzinę.
							</p>
							<p>
							Zachęcamy do skorzystania z menu na górze strony w celu zapoznania się z naszą ofertą,
							zespołem, galerią oraz informacjami kontaktowymi. Zapraszamy!
							</p>
						</div>
						<figure class="main-offer-image">
							<img fetchpriority="high" src="assets/img/people.webp" alt="ludzie">
							<figcaption>Zespół "Git Gud"</figcaption>
						</figure>
					</div>
				</section>
			</div>
		</div>
	`

	return {
		template,
		callback,
		styles
	}
}