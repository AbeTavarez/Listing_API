const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

//* Routes Files
const bootcamps = require('./routes/bootcamps');

//* Loads env variables
dotenv.config({ path: './config/config.env' });

//* Ints Express Server App
const app = express();

//* Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'.yellow.bold));
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

//* Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  consoelo.log(`Error: ${err.message}`.red);
  //* Close server & Exist process
});
