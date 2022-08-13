const express = require('express')
const router = express.Router();

const home_controller = require('../Controllers/home_controller');

router.get('/', home_controller.home);
router.use('/addNote', require('../Controllers/addNote_controller'));
router.use('/getNotes', require('../Controllers/getNotes_controller'));
router.use('/getNote', require('../Controllers/getNote_controller'))
router.use('/updateNote/:id', require('../Controllers/updateNote_controller'));

console.log('Router loaded')

module.exports = router

// for anty further routes, access from here
// router.use('/routerName', require('./routerfile));
