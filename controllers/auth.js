const ErrorResponce = require('../utils/errorResponce');
const asyncHandler = require('../middleware/async');
const User = require('../models/Users');

//* @desc Register user
//* @route GET /api/v1/auth/register
//* @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create User
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // Create token
  const token = user.getSignJwtToken();

  res.status(200).json({success: true})
})