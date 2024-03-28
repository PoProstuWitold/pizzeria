export const MenuComponent = () => {
	document.title = 'Nasze menu'

	return `
		<div>
			<h1>Menu</h1>
			<p>Nasz lokal oferuje szeroki wybór dań kuchni włoskiej jak i fastfoodowej</p>
			<p>Pizza</p>
			<ol>
				<li>Margherita</li>
				<li>Capriciosa</li>
				<li>Pepperoni</li>
				<li>Vegetariana</li>
				<li>Quattro Stagioni</li>
				<li>Frutti di Mare</li>
				<li>Git Gud Pizza</li>
				<li>Gyros</li>
				<li>Farmerska</li>
			</ol>
			<p>Inne dania</p>
			<ol>
				<li>Nuggetsy z kurczaka</li>
				<li>Frytki</li>
				<li>Zapiekanka</li>
				<li>Hot-Dog</li>
				<li>Burger</li>
				<li>Wrap</li>
				<li>Spaghetti</li>
				<li>Lasagne</li>
			</ol>
			<p>Napoje</p>
			<ol>
				<li>Coca-Cola</li>
				<li>Fanta</li>
				<li>Sok pomarańczowy</li>
				<li>Sok jabłkowy</li>
				<li>Sprite</li>
				<li>Woda niegazowana</li>
				<li>Woda gazowana</li>
				<li>Coca-Cola Zero</li>
				<li>Lipton Ice Tea (różne smaki)</li>
				<li>Tymbark (różne smaki)</li>
			</ol>
		</div>
	`
}