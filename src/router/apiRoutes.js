const express = require('express')
const router = express.Router();

const home_controller = require('../controllers/home_controller');

/**
 * This files contains the index ofall the routes in the app
 * The business logic is seprated from the routes
 * The business logic for each route is written in sperate files in the controller folder
 * The routes and their use cases are as follows
 * # '/addNote' - Sending POST reqesut for Creating a new Note to the DB
 * # '/getNotes' - Sending GET request for Reading all the notes from the DB
 * # '/getNote' - Sending a GET request for Reading a particular note form the DB
 * # '/updateNote/$id' - Sending a PATCH request for Updating a particular note form the DB, 
 * where $id will be the id of the note we want
 */

// router.get('/', home_controller.home);
router.post('/addNote', require('../controllers/addNote_controller'));
router.get('/getNotes', require('../controllers/getNotes_controller'));
router.get('/getNote/', require('../controllers/getNote_controller'))
router.patch('/updateNote/:id', require('../controllers/updateNote_controller'));
router.delete('/deleteNote', require('../controllers/deleteNote_controller'));

console.log('Router loaded')

module.exports = router
