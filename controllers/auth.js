const ErrorResponce = require('../utils/errorResponce');
const asyncHandler = require('../middleware/async');
const User = require('../models/Users');

//* @desc Register user
//* @route GET /api/v1/auth/register
//* @access Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
})