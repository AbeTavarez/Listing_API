//* HANDLE ALL /COURSES *\\

const express = require('express');
// Controller Methods
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults')

// Router instance
const router = express.Router({ mergeParams: true });

//* Routes ////////////////////////////////////////////

//* '/' === /courses
//path: bootcamp, select: 'name description' -> populates bootcamp
router.route('/').get(advancedResults(Course, {
  path: 'bootcamp',
  select: 'name description'
}),getCourses).post(addCourse);

//* '/:id' === /courses/123idOfSomeKind
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
