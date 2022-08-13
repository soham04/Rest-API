const express = require('express')
const router = express.Router();

const home_controller = require('../Controllers/home_controller');

/**
 * This files contains the index ofall the routes in the app
 * The business logic is seprated from the routes
 * The business logic for each route is written in sperate files in the controller folder
 * The routes and their use cases are as follows
 * # '/' - Serving the Home page
 * # '/addNote' - Sending POST reqesut for Creating a new Note to the DB
 * # '/getNotes' - Sending GET request for Reading all the notes from the DB
 * # '/getNote' - Sending a GET request for Reading a particular note form the DB
 * # '/updateNote/$id' - Sending a PATCH request for Updating a particular note form the DB, 
 * where $id will be the id of the note we want
 */

router.get('/', home_controller.home);
router.use('/addNote', require('../Controllers/addNote_controller'));
router.use('/getNotes', require('../Controllers/getNotes_controller'));
router.use('/getNote', require('../Controllers/getNote_controller'))
router.use('/updateNote/:id', require('../Controllers/updateNote_controller'));

console.log('Router loaded')

module.exports = router
