const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//* Routes Files
const bootcamps = require('./routes/bootcamps');

//* Loads env variables
dotenv.config({ path: './config/config.env' });

//* Ints Express Server App
const app = express();

//* Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//* MOUNT ROUTERS
app.use('/api/v1/bootcamps', bootcamps);

//* Sets PORT
const PORT = process.env.PORT || 5000;

//* Now Listening...
app.listen(
  PORT,
  console.log(
    `Server Running in -> ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
