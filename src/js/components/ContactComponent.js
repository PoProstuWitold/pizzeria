export const ContactComponent = () => {
	document.title = 'Kontakt'

	const callback = async () => {
		console.log(`ContactComponent callback has been called`)
	}

	const template = /*html*/`
		<div>
			<h1>Kontakt</h1>
			<p> Najłatwiej skontaktować się z nami w podane sposoby</p>
			<p>email: pizza@gitgudpizza.pl</p>
			<p>telefon 1: (+48) 123 456 789</p>
			<p>telefon 2: (+48) 987 654 321</p>
			<p>adres: 12-345 Lublin, ul. Anakina Skywalkera 17</p>
		</div>
	`

	return {
		template,
		callback
	}
}