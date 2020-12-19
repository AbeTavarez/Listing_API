const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const fileupload = require('express-fileupload');
//* Loads env variables
dotenv.config({ path: './config/config.env' });

//* Connect to DataBase
connectDB();

//* Routes Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

//* Ints Express Server App
const app = express();

//* Body Parser -> is a express middleware
app.use(express.json());

//* Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'.yellow.bold));
}

//* Fileuploading
app.use(fileupload());

//* Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//* MOUNT ROUTERS
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

//* Error Handler - after bootcamp mount
app.use(errorHandler);

//* Sets PORT
const PORT = process.env.PORT || 5000;

//* Now Listening...
const server = app.listen(
  PORT,
  console.log(
    `Server Running in -> ${process.env.NODE_ENV} mode on port ${PORT}...`
      .magenta
  )
);

//* Global Handler unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //* Close server & Exist process
  server.close(() => process.exit(1));
});
