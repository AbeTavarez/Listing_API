const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');

//* Loads env variables
dotenv.config({ path: './config/config.env' });

//* Connect to DataBase
connectDB();

//* Routes Files
const bootcamps = require('./routes/bootcamps');

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
const server = app.listen(
  PORT,
  console.log(
    `Server Running in -> ${process.env.NODE_ENV} mode on port ${PORT}...`
      .bgMagenta.bold
  )
);

//* Global Handler unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //* Close server & Exist process
  server.close(() => process.exit(1));
});
