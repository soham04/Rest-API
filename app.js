//imports
const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose');

//setting the Port number
const port = process.env.PORT || 3000

// setting the render engine
app.set('view engine', 'ejs');
app.set('views','./views')

// setting express middlewares
app.use(express.json());
app.use(express.static("public"));

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

// setting up routes
app.use('/',require("./router/index"))

// setting up to listen to incomming request on the given PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})