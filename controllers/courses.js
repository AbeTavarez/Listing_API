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
    //* finds courses with the bootcamp id
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    //* Or gets all courses from all bootcamps
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  //* Response with status, count and data
  const courses = await query;
  res.status(200).json({
    succcess: true,
    count: courses.length,
    data: courses,
  });
});

//* @desc Get Single course
//* @route GET /api/v1/courses/:id
//* @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  //* Finds Course
  const course = await (await Course.findById(req.params.id)).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  //* Make sure course exist
  if (!course) {
    return next(new ErrorResponse(`No course with id of ${req.params.id}`));
  }

  //* Response with status and data
  res.status(200).json({
    succcess: true,
    data: course,
  });
});

//* @desc Add course
//* @route GET /api/v1/courses/:id
//* @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {});
