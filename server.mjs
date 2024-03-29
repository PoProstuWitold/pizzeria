import { createServer } from 'node:http'
import { readFile, existsSync } from 'node:fs'
import { extname } from 'node:path'

const port = 3005

const server = createServer((req, res) => {
	let defaultPath = './src'
    let filePath = req.url === '/' ? `${defaultPath}/index.html` : `${defaultPath}${req.url}`

	// próba porównania ścieżki url z ścieżką na serwerze jeśli użytkownik wpisał ją ręcznie
	// w formie typu: /string1/string2/.../stringN
	const exist = existsSync(filePath)
	if (!exist) filePath = `${defaultPath}/${cutString(req.url)}`

    const extension = String(extname(filePath)).toLowerCase()
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
		'.mjs': 'text/javascript',
		'.css': 'text/css',
		'.ico': 'image/x-icon',
		'.json': 'application/json',
		'.png': 'image/png',
    }

    const contentType = mimeTypes[extension] || 'application/octet-stream'

    readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500)
            res.end(`
				Internal Server Error!\n 
				code: ${err.code}\n
				message: ${err.message}\n
			`)
        } else {
            res.writeHead(200, { 
				'Content-Type': contentType 
			})
            res.end(content, 'utf-8')
        }
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}. Version of Node.js: ${process.version}`)
})

function cutString(s) {
    const words = ['css', 'js', 'assets']
    for (const word of words) {
        const index = s.indexOf(word)
        if (index !== -1) {
            return s.substring(index)
        }
    }
    return 'index.html'
}

