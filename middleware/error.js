//* Error Handler
const errorHandler = (err, req, res, next) => {
  //* Log to console for developer
  console.log(err.stack.white.bgRed);

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || 'Server Error' });
};

module.exports = errorHandler;
