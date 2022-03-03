const { response } = require("express")
const express = require("express") // 1. includes Express
const app = express() // 2. initializes Express
const mongoose = require('mongoose') // Initializing Mongoose for DB
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDatabase = require('./config/db')


require('dotenv').config({ path: './env' }) // dotenv package to protect secrets
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(errorHandler)


const port = process.env.PORT || 3001
connectDatabase()
//mongoose.connect(connection_url)
//.then(() => console.log(`Success`))
//.catch((error) => console.error(`Could not connect due to ${error}`))

app.use('/api/users', require('./routes/userRoutes'))

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

app.listen(port, () => console.log(`Server started on port ${port}`)) // 3. runs Express