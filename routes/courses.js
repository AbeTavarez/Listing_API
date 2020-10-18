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

// Router instance
const router = express.Router({ mergeParams: true });

//* Routes ////////////////////////////////////////////

//* '/' === /courses
router.route('/').get(getCourses).post(addCourse);

//* '/:id' === /courses/123idOfSomeKind
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
