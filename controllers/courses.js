const ErrorResponse = require('../utils/errorResponce');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

//* @desc Get all courses
//* @route GET /api/v1/courses
//* @route GET /api/v1/bootcamps/:bootcampId/courses
//* @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  //* finds courses for either a specific bootcamp id or all courses
  if (req.params.bootcampId) {
    // finds courses from the bootcamp id
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // get all courses from all bootcamps
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({
    succcess: true,
    count: courses.length,
    data: courses,
  });
});
