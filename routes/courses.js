// Express instance
const express = require('express');

// Controller Methods
const { getCourses, getCourse } = require('../controllers/courses');

// Router instance
const router = express.Router({ mergeParams: true });

//* Routes
router.route('/').get(getCourses);
router.route('/:id').get(getCourse);

module.exports = router;
