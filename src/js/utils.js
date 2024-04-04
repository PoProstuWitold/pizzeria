export const loadStyles = (filename) => {
	// Sprawdzanie czy dany plik CSS został już załadowany
    const loaded = Array.from(document.getElementsByTagName('link'))
		.some(link => link.href.includes(filename.substring(filename.indexOf('css'))))

	// Jeśli tak, kończymy działanie funkcji
    if (loaded) return

    // Jeśli nie, dodajemy go do głowy dokumentu
    const file = document.createElement('link')
    file.href = filename
    file.rel = 'stylesheet'
    document.head.appendChild(file)
	console.log(`Stylesheet "${filename}" has been loaded`)
}