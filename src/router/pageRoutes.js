const express = require('express')
const router = express.Router();

const home_controller = require('../controllers/home_controller');

// This route serves the home page of our app
router.get('/', home_controller.home);

console.log('Page Router loaded')

module.exports = router
