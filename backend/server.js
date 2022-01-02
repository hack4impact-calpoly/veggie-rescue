const { response } = require("express")
const express = require("express") // 1. includes Express
const app = express() // 2. initializes Express

/*
 * example handler from bootcamp
function helloHandler(request, response) {
	const name = request.query.name
	// 👇 checks if the client forgot the name query param
	if (typeof name === 'undefined' || name.length == 0) {
			response.status(400) // "Bad Request" status code.
			response.send('You forgot your name!')
			return // ***
	}
	response.status(200)
	response.send('Hello, ' + name + '!')
}
app.get('/hello', helloHandler)
*/

app.get('/', (req, res) => {
    res.status(200)
    res.send('Veggie Root')
})

app.listen(3001) // 3. runs Express