const ErrorResponse = require('../utils/errorResponce');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const { json } = require('express');

//* @desc Get all courses
//* @route GET /api/v1/courses
//* @route GET /api/v1/bootcamps/:bootcampId/courses
//* @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    //* finds courses with the bootcamp id
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    })
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//* @desc Get Single course
//* @route GET /api/v1/courses/:id
//* @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  //* Finds Course
  const course = await Course.findById(req.params.id).populate({
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
//* @route POST /api/v1/bootcamps/:bootcampId/courses
//* @access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  //* Finds Bootcamp
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  //* Make sure bootcamp exist
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`)
    );
  }

  const course = await Course.create(req.body);

  //* Response with status and data
  res.status(200).json({
    succcess: true,
    data: course,
  });
});

//* @desc Update course
//* @route PUT /api/v1/courses/:id
//* @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course found with the id of ${req.params.id}`)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    succcess: true,
    data: course,
  });
});

//* @desc Delete course
//* @route DELETE /api/v1/courses/:id
//* @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  await course.remove();

  res.status(200).json({
    succcess: true,
    data: {},
  });
});
