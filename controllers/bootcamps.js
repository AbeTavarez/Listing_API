const Bootcamp = require('../models/Bootcamp');
const ErrorResponce = require('../utils/errorResponce');
//* @desc Get all bootcamps
//* @route GET /api/v1/bootcamps
//* @access Public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//* @desc Get single bootcamps
//* @route GET /api/v1/bootcamps/:id
//* @access Public
exports.getBootCamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    //* If is not a well formatted id
    next(
      new ErrorResponce(`Bootcamp NotFound with id of ${req.params.id}`, 404)
    );
  }
};

//* @desc Create new bootcamp
//* @route POST /api/v1/bootcamps
//* @access Private
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//* @desc Update bootcamp
//* @route PUT /api/v1/bootcamps/:id
//* @access Private
exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//* @desc Delete bootcamp
//* @route DELETE /api/v1/bootcamps/:id
//* @access Private
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, msg: 'Bootcamp Deleted' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
