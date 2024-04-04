import { loadStyles } from '../utils.js'

export const ContactComponent = () => {
	document.title = 'Kontakt'

	const callback = async () => {
		loadStyles('css/ContactComponent.css')
		
		console.log(`ContactComponent callback has been called`)
	}

	const template = /*html*/`
		<div class="contact-info">
			<div class="contact-section">
				<div>
					<h1>Kontakt</h1>
					<p>
					Zamówienia przyjmujemy wyłącznie telefonicznie lub bezpośrednio w lokalu. 
					Najłatwiej skontaktować się na podane poniżej sposoby:
					</p>
					<ul class="contact-ways">
						<li>email: 
							<a class="contact-mail" target="_blank" rel="noreferrer" href="mailto:mail@gitgudpizza.pl">mail@gitgudpizza.pl</a>
						</li>
						<li>telefon 1: (+48) 123 456 789</li>
						<li>telefon 2: (+48) 987 654 321</li>
						<li>adres: 20-618 Lublin, ul. Nadbystrzycka 38</li>
					</ul>
				</div>
				<div>
					<h1>Dostawa</h1>
					<p>
					Dostawa jest wliczona w cenę dla Lublina i sąsiadujących gmin.
					Dla każdej innej lokalizacji cena dostawy wynosi 3 złote za każdy dodatkowo przejechany kilometr 
					maksymalnie do 30km.
					</p>
				</div>
				<div>
					<h1>Rezerwacja</h1>
					<p>
						Istnieje możliwość rezerwacji całej sali wraz z caterigiem lub pojedycznego stolika na jedną wizytę.
						Formularz rezerwacji jest dostępny 
						<a class="contact-inner-link" href="/rezerwacja">
						tutaj.
						</a>
					</p>
				</div>
			</div>
			<div class="contact-localization">
				<h1>Nasza lokalizacja</h1>
				<div class="googlemap">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4996.2618696795!2d22.54422074674113!3d51.23508343701024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722577729316bd9%3A0x442236391b743bc!2sPolitechnika%20Lubelska%2C%2020-618%20Lublin!5e0!3m2!1spl!2spl!4v1711914147155!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
		</div>
	`

	return {
		template,
		callback
	}
}