export const ErrorComponent = (code, message) => {
	document.title = `Błąd ${code}`

	const callback = async () => {
		console.log(`ErrorComponent callback has been called`)
	}

	const template = /*html*/`
		<div>
			<h1>Błąd ${code}: ${message}</h1>
		</div>
	`

	return {
		template,
		callback
	}
}