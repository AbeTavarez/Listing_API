const ErrorResponse = require('../utils/errorResponce');

//* Error Handler
const errorHandler = (err, req, res, next) => {
  //copy from err object
  let error = { ...err };
  error.message = err.message;

  //* Log to console for developer
  console.log(err);
  // console.log(err.stack.white.bgRed);

  //* Mongoose Bad ObjectID
  if (err.name == 'CastError') {
    const message = `Resource Not Found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //* Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  //* Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
