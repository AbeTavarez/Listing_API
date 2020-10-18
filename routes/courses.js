// Express instance
const express = require('express');

// Controller Methods
const { getCourses, getCourse, addCourse } = require('../controllers/courses');

// Router instance
const router = express.Router({ mergeParams: true });

//* Routes ////////////////////////////////////////////
// '/' === /courses
router.route('/').get(getCourses).post(addCourse);

// '/:id' === /courses/123456789idOfSomeKind
router.route('/:id').get(getCourse);

module.exports = router;
