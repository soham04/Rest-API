//imports
const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose');

// setting the Port number
const port = process.env.PORT || 3000

// setting the render engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// setting express middlewares
app.use(express.json()); // for parsing the incomming JSON data
app.use(express.static(path.join(__dirname, 'public')));

// configuring the dotenv module
require('dotenv').config({
    path: path.resolve(__dirname, 'config', '.env')
})

// Setting up the MongoDB connection
main().catch(err => {
    console.error(err)
})

async function main() {
    await mongoose.connect(process.env.MONGOCONNECT);
}

// setting up Routers

// Page routes for serving Pages
app.use('/', require("./router/pageRoutes"))
// API Routes for serving API endpoints
app.use('/', require("./router/apiRoutes"))

// setting up error handling middlewares
app.use(require('./middlewares/errorLogger'))
app.use(require('./middlewares/errorHandler'))

// setting up to listen to incomming request on the given PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})