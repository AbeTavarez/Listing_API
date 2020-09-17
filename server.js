const express = require('express');
const dotenv = require('dotenv');

//* Routes Files
const bootcomps = require('./routes/bootcamps');

//* Loads env variables
dotenv.config({ path: './config/config.env' });

//* Ints Express Server App
const app = express();

//* ROUTES

//* Sets PORT
const PORT = process.env.PORT || 5000;

//* Now Listening...
app.listen(
  PORT,
  console.log(
    `Server Running in -> ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
