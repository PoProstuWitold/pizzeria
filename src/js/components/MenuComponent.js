import { loadStyles } from '../helpers/utils.js'

export const MenuComponent = () => {
	document.title = 'Nasze menu'

	const styles = async () => loadStyles('css/MenuComponent.css')
	const callback = async () => {
		// Pobieramy wszystkie elementy z klasą 'collapsible'
		const coll = document.getElementsByClassName('collapsible')


		for (let i = 0; i < coll.length; i++) {
			// Dodajemy nasłuchiwacz zdarzenia 'click' do każdego elementu
			// Używamy zwykłej funkcji zamiast strzałkowej, ponieważ w strzałkowej
			// słowo kluczowe 'this' odnosi się do obiektu, w którym została zdefiniowana
			// a nie do elementu, który wywołano zdarzenie
			coll[i].addEventListener('click', function () {
				// Po kliknięciu, przełączamy klasę 'active' dla danego elementu
				this.classList.toggle('active')

				// Pobieramy następny element po klikniętym elemencie
				let content = this.nextElementSibling

				// Jeżeli element 'content' ma ustawioną maksymalną wysokość, usuwamy ją
				// W przeciwnym wypadku, ustawiamy maksymalną wysokość na wysokość elementu
				// Dzięki temu, zawartość 'collapsible' elementu jest pokazywana lub ukrywana
				if (content.style.maxHeight) {
					content.style.maxHeight = null
				} else {
					content.style.maxHeight = content.scrollHeight + 'px'
				}
			})
		}
		
		console.log(`MenuComponent callback has been called`)
	}

	const template = /*html*/ `
		<div class="menu-container">
			<div>
				<h1>Menu</h1>
				<p>Nasz lokal oferuje szeroki wybór dań kuchni włoskiej jak i fastfoodowej. 
				Gwarantujemy, że każdy znajdzie u nas coś dla siebie!</p>
			</div>
			<div class="menu-section">
				<div>
					<button class="collapsible">Pizza</button>
					<div class="collap-content">
						<table class="menu-content">
							<thead>
								<tr>
									<th>Nazwa pizzy</th>
									<th>Mała 32cm</th>
									<th>Duża 45cm</th>
								</tr>
							</thead>
							<tbody>
								<tr class="menu-item">
									<td>
										<p class="menu-name">1. Margherita</p>
										<p>sos, ser, oregano</p>
									</td>
									<td class="menu-price">27,00 zł</td>
									<td class="menu-price">33,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">2. Capricciosa</p>
										<p>sos, ser, szynka, pieczarki</p>
									</td>
									<td class="menu-price">30,00 zł</td>
									<td class="menu-price">35,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">3. Pepperoni</p>
										<p>sos, ser, salami pepperoni</p>
									</td>
									<td class="menu-price">30,00 zł</td>
									<td class="menu-price">35,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">4. Cztery Sery</p>
										<p>sos, ser mozzarella, ser gorgonzola, ser parmezan, ser ricotta</p>
									</td>
									<td class="menu-price">32,00 zł</td>
									<td class="menu-price">38,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">5. Gyros</p>
										<p>sos, ser, cebula prażona, kurczak kebab, sos gyros pikantny lub łagodny</p>
									</td>
									<td class="menu-price">35,00 zł</td>
									<td class="menu-price">42,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">6. Europejska</p>
										<p>sos, ser, pieczarki, szynka, pomidory, papryka</p>
									</td>
									<td class="menu-price">35,00 zł</td>
									<td class="menu-price">40,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">7. Git Gud</p>
										<p>sos, ser, pieczarki, kukurydza, szynka, rukola</p>
									</td>
									<td class="menu-price">36,00 zł</td>
									<td class="menu-price">42,00 zł</td>
								</tr>
							</tbody>
						</table>
						<table class="menu-content">
							<thead>
								<tr>
									<th>Dodatki</th>
									<th>Mała 32cm</th>
									<th>Duża 45cm</th>
								</tr>
							</thead>
							<tbody>
								<tr class="menu-item">
									<td>
										<p class="menu-name">1. Wędliny</p>
									</td>
									<td class="menu-price">4,00 zł</td>
									<td class="menu-price">6,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">2. Sery</p>
									</td>
									<td class="menu-price">5,00 zł</td>
									<td class="menu-price">7,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">3. Papryka, pomidor</p>
									</td>
									<td class="menu-price">3,50 zł</td>
									<td class="menu-price">5,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">4. Ciasto</p>
									</td>
									<td class="menu-price">3,00 zł</td>
									<td class="menu-price">4,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">5. Dodatkowy sos</p>
									</td>
									<td class="menu-price">3,00 zł</td>
									<td class="menu-price">3,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">6. Inne</p>
									</td>
									<td class="menu-price">4,00 zł</td>
									<td class="menu-price">5,00 zł</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="menu-section">
				<div>
					<button class="collapsible">Kuchnia włoska</button>
					<div class="collap-content">
						<table class="menu-content">
							<thead>
								<tr>
									<th>Danie</th>
									<th>Cena</th>
								</tr>
							</thead>
							<tbody>
								<tr class="menu-item">
									<td>
										<p class="menu-name">1. Spaghetti Carbonara</p>
										<p>spaghetti, jajka, pancetta, parmezan, oliwa z oliwek</p>
									</td>
									<td class="menu-price">25,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">2. Risotto</p>
										<p>ryż, warzywa, mięso lub owoce morza</p>
									</td>
									<td class="menu-price">30,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">3. Lasagne</p>
										<p>makaron lasagne, mięso mielone, sos pomidorowy, ser parmezan</p>
									</td>
									<td class="menu-price">35,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">4. Cannelloni</p>
										<p>rurki makaronowe, mięso mielone lub szpinak, ser</p>
									</td>
									<td class="menu-price">30,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">5. Tiramisu</p>
										<p>biszkopty nasączone kawą, krem mascarpone, kakao</p>
									</td>
									<td class="menu-price">20,00 zł</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="menu-section">
				<div>
					<button class="collapsible">Fastfood</button>
					<div class="collap-content">
						<table class="menu-content">
							<thead>
								<tr>
									<th>Fastfood</th>
									<th>Cena</th>
								</tr>
							</thead>
							<tbody>
								<tr class="menu-item">
									<td>
										<p class="menu-name">1. Danie gyros</p>
										<p>gyros, frytki lub ćwiartki ziemniaczane, 
										surówka, sos do wyboru: czosnkowy, meksykański, pomidorowy</p>
									</td>
									<td class="menu-price">25,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">2. Danie stripsy</p>
										<p>panierowana polędwiczka z kurczaka x5, frytki lub ćwiartki ziemniaczane, 
										surówka, sos do wyboru: czosnkowy, meksykański, pomidorowy</p>
									</td>
									<td class="menu-price">25,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">3. Danie skrzydełka z kurczaka</p>
										<p>skrzydełka w przyprawach x7, frytki lub ćwiartki ziemniaczane, 
										surówka, sos do wyboru: czosnkowy, meksykański, pomidorowy</p>
									</td>
									<td class="menu-price">25,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">4. Frytki małe</p>
									</td>
									<td class="menu-price">5,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">5. Frytki duże</p>
									</td>
									<td class="menu-price">9,00 zł</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="menu-section">
				<div>
					<button class="collapsible">Napoje (500ml)</button>
					<div class="collap-content">
						<table class="menu-content">
							<thead>
								<tr>
									<th>Napój</th>
									<th>Cena</th>
								</tr>
							</thead>
							<tbody>
								<tr class="menu-item">
									<td>
										<p class="menu-name">1. Cola/Cola Zero</p>
									</td>
									<td class="menu-price">5,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">2. Lipton</p>
									</td>
									<td class="menu-price">4,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">3. Fanta</p>
									</td>
									<td class="menu-price">5,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">4. Sok owocowy</p>
									</td>
									<td class="menu-price">4,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">5. Woda gazowana</p>
									</td>
									<td class="menu-price">3,50 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">6. Woda mineralna</p>
									</td>
									<td class="menu-price">3,00 zł</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="menu-section">
				<div>
					<button class="collapsible">Napoje alkoholowe</button>
					<div class="collap-content">
						<table class="menu-content">
							<thead>
								<tr>
									<th>Napój</th>
									<th>Cena</th>
								</tr>
							</thead>
							<tbody>
								<tr class="menu-item">
									<td>
										<p class="menu-name">1. Piwo Perła Export (500ml)</p>
									</td>
									<td class="menu-price">10,00 zł</td>
								</tr>
								<tr class="menu-item">
									<td>
										<p class="menu-name">2. Piwo Książęce Złote Pszeniczne (500ml)</p>
									</td>
									<td class="menu-price">12,00 zł</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	`

	return {
		template,
		callback,
		styles
	}
}