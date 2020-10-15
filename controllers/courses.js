const ErrorResponse = require('../utils/errorResponce');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

//* @desc Get all courses
//* @route GET /api/v1/courses
//* @route GET /api/v1/bootcamps/:bootcampId/courses
//* @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({
    succcess: true,
    count: courses.length,
    data: courses,
  });
});
