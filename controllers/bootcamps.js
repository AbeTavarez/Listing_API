const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponce = require('../utils/errorResponce');
const geoCoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');

//* @desc Get all bootcamps
//* @route GET /api/v1/bootcamps
//* @access Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults); //route is using advancedResult middleware
});

//* @desc Get single bootcamps
//* @route GET /api/v1/bootcamps/:id
//* @access Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  // makes sure if bootcamp doesnt exist we get 400 status
  if (!bootcamp) {
    //* Id not in DataBase
    return next(
      ErrorResponce(`Bootcamp NotFound with id of ${req.params.id}`, 404)
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
    return next(
      ErrorResponce(`Bootcamp NotFound with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//* @desc Delete bootcamp
//* @route DELETE /api/v1/bootcamps/:id
//* @access Private
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  //* Make sure bootcamp exist
  if (!bootcamp) {
    //* Id not in DataBase
    return new ErrorResponce(
      `Bootcamp NotFound with id of ${req.params.id}`,
      404
    );
  }

  bootcamp.remove(); //trigges middleware

  res.status(200).json({ success: true, msg: 'Bootcamp Deleted' });
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

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//* @desc Upload Photo for  bootcamp
//* @route PUT /api/v1/bootcamps/:id/photo
//* @access Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  //* Make sure bootcamp exist
  if (!bootcamp) {
    //* Id not in DataBase
    return new ErrorResponce(
      `Bootcamp NotFound with id of ${req.params.id}`,
      404
    );
  }

  if (!req.files) {
    return next(new ErrorResponce(`Please upload a file`, 404));
  }
  const file = req.files.file;

  //* Make sure IMG is a Photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponce(`Please upload an image file`, 404));
  }

  //* Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponce(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        404
      )
    );
  }

  //* Create custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponce(`Problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
