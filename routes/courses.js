// Express instance
const express = require('express');

// Controller Methods
const { getCourses } = require('../controllers/courses');

// Router instance
const router = express.Router();

//* Routes

//* GET
router.route('/').get(getCourses);

module.exports = router;
