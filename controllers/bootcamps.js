const Bootcamp = require('../models/Bootcamp');
const ErrorResponce = require('../utils/errorResponce');
const geoCoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');
//* @desc Get all bootcamps
//* @route GET /api/v1/bootcamps
//* @access Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//* @desc Get single bootcamps
//* @route GET /api/v1/bootcamps/:id
//* @access Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  // makes sure if bootcamp doesnt exist we get 400 status
  if (!bootcamp) {
    //* Id not in DataBase
    return new ErrorResponce(
      `Bootcamp NotFound with id of ${req.params.id}`,
      404
    );
  }

  res.status(200).json({ success: true, data: bootcamp });

  next(err);
});

//* @desc Create new bootcamp
//* @route POST /api/v1/bootcamps
//* @access Private
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });

  // next(err);
});

//* @desc Update bootcamp
//* @route PUT /api/v1/bootcamps/:id
//* @access Private
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    //* Id not in DataBase
    return new ErrorResponce(
      `Bootcamp NotFound with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });

  next(err);
});

//* @desc Delete bootcamp
//* @route DELETE /api/v1/bootcamps/:id
//* @access Private
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    //* Id not in DataBase
    return new ErrorResponce(
      `Bootcamp NotFound with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, msg: 'Bootcamp Deleted' });

  next(err);
});
//* @desc Get bootcamps within a radius
//* @route GET /api/v1/bootcamps/radius/:zipcode/:distance
//* @access Private
exports.getBootCampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //* Get lat/lng from geocoder
  const loc = await geoCoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //* Calc radius using radians
  /* Divide distance by radus of Earth
  Earth Radius = 3,963 mi or 6,378 km */
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).jso({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
