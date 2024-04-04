import { createServer } from 'node:http'
import { readFile, existsSync } from 'node:fs'
import { extname } from 'node:path'

// Port, na którym serwer będzie nasłuchiwał
const port = 3005

// Tworzymy serwer
// Aplikacja będzie dostępna pod adresem: http://localhost:3005
const server = createServer((req, res) => {
	// Domyślna ścieżka do plików
	let defaultPath = './src'

	// Jeśli URL to '/', serwujemy index.html, w przeciwnym razie serwujemy plik zgodny z URL
    let filePath = req.url === '/' ? `${defaultPath}/index.html` : `${defaultPath}${req.url}`

	// Sprawdzamy, czy plik istnieje
	const exist = existsSync(filePath)

	// Jeśli plik nie istnieje, próbujemy dopasować URL do potencjalnej ścieżki na serwerze
	if (!exist) filePath = `${defaultPath}/${cutString(req.url)}`

	// Pobieramy rozszerzenie pliku
    const extension = String(extname(filePath)).toLowerCase()

	// Mapujemy rozszerzenia plików do typów MIME
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
		'.mjs': 'text/javascript',
		'.css': 'text/css',
		'.ico': 'image/x-icon',
		'.json': 'application/json',
		'.png': 'image/png',
    }

	// Pobieramy typ MIME dla danego pliku, lub domyślnie 'application/octet-stream'
    const contentType = mimeTypes[extension] || 'application/octet-stream'

	// Czytamy plik
    readFile(filePath, (err, content) => {
        if (err) {
			// Jeśli wystąpił błąd, zwracamy błąd 500
            res.writeHead(500)
            res.end(`
				Internal Server Error!\n 
				code: ${err.code}\n
				message: ${err.message}\n
			`)
        } else {
			// W przeciwnym razie, zwracamy plik z odpowiednim typem MIME
            res.writeHead(200, { 
				'Content-Type': contentType 
			})
            res.end(content, 'utf-8')
        }
    })
})


// Nasłuchujemy na określonym porcie
server.listen(port, () => {
    console.log(`Server is listening on port: ${port}. Version of Node.js: ${process.version}`)
})

// Funkcja pomocnicza do wycinania części ścieżki URL
function cutString(s) {
	// Definiujemy listę słów, które chcemy wyszukać w ścieżce URL
    const words = ['css', 'js', 'assets']

	// Przechodzimy przez każde słowo z listy
    for (const word of words) {
		// Szukamy indeksu danego słowa w ścieżce URL
        const index = s.indexOf(word)

		// Jeśli słowo jest obecne w ścieżce URL (indeks !== -1)
        if (index !== -1) {
			// Wycinamy część ścieżki URL od indeksu danego słowa do końca
            // i zwracamy ją jako wynik funkcji
            return s.substring(index)
        }
    }

	// Jeśli żadne słowo nie pasuje, zwracamy 'index.html'
    return 'index.html'
}

