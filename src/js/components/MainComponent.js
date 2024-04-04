import { loadStyles } from '../utils.js'

export const MainComponent = () => {
	document.title = 'GitGud Pizza'

	const callback = async () => {
		loadStyles('css/MainComponent.css')
		
		console.log(`MainComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="main-container">
			<div class="main-image">
				<img src="../assets/img/pizza-bg.webp" fetchpriority="high" alt="Pizza Background" style="position: absolute; width: 100%; height: 100%; object-fit: cover;" loading="eager">
				<div style="position: relative;">
					<h1>Pizzeria GitGud</h1>
					<h2>Szybko, smacznie i tanio!</h2>
				</div>
			</div>
			<div class="main-content">
				<div>
					<h1>Co mówią o nas klienci?</h1>
					<p>
					Nam możesz nie ufać, więc posłuchaj, co mają do powiedzenia koneserzy pizzy i kuchni włoskiej odwiedzający nasz lokal!
					</p>
				</div>
				<!-- Recenzje -->
				<div class="main-reviews">
					<div class="review-box">
						<div class="rating">
						★★★★★
						</div>
						<div class="review-text">
						"Super pizza i wspaniała obsługa! Przychodzę regularnie z rodziną i zawsze jesteśmy zadowoleni."
						</div>
						<div class="reviewer-name">
						Maria, 25 marca 2024
						</div>
					</div>
					<div class="review-box">
						<div class="rating">
						★★★★★
						</div>
						<div class="review-text">
						"Najlepsza pizzeria w mieście! Jest kilka telewizorów, więc na mecz też można wpaść"
						</div>
						<div class="reviewer-name">
						Dawid, 17 marca 2024
						</div>
					</div>
					<div class="review-box">
						<div class="rating">
						★★★★★
						</div>
						<div class="review-text">
						"Zdecydowanie polecam! Pizza zawsze świeża i pyszna. Moje dzieci i żona zadowoleni"
						</div>
						<div class="reviewer-name">
						Zbigniew, 15 marca 2024
						</div>
					</div>
					<div class="review-box">
						<div class="rating">
						★★★★☆
						</div>
						<div class="review-text">
						"Pizza zawsze na czas i gorąca. Sosy mogłyby być większe, ale i tak polecam"
						</div>
						<div class="reviewer-name">
						Ania, 12 marca 2024
						</div>
					</div>
				</div>
				<!-- Opinie Pollub WEiE na Google -->
				<div class="main-more-reviews">
					<a href="https://g.co/kgs/hCE7x7P" target="_blank" class="review-link">Zobacz wszystkie opinie →</a>
				</div>
				<div>
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
						<div class="main-offer-image">
							<img fetchpriority="high" src="assets/img/people.webp" alt="ludzie">
						</div>
					</div>
				</div>
			</div>
		</div>
	`

	return {
		template,
		callback
	}
}