export const loadStyles = (filename) => {
	// Sprawdzanie czy dany plik CSS został już załadowany
    const loaded = Array.from(document.getElementsByTagName('link'))
		.some(link => link.href.includes(filename.substring(filename.indexOf('css'))))
    if (loaded) return

    // Jeśli plik CSS nie jest załadowany, załaduj go w głowie dokumentu
    const file = document.createElement('link')
    file.href = filename
    file.rel = 'stylesheet'
    document.head.appendChild(file)
	console.log(`Stylesheet "${filename}" has been loaded`)
}