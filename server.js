const express = require('express');
const dotenv = require('dotenv');

//* Loads env variables
dotenv.config({ path: './config/config.env' });

//* Ints Express Server App
const app = express();

//* ROUTES
app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
});
app.get('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show Bootcamp ${req.params.id}` });
});
app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create New Bootcamp' });
});
app.put('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
});
app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
});

//* Sets PORT
const PORT = process.env.PORT || 5000;

//* Now Listening...
app.listen(
  PORT,
  console.log(
    `Server Running in -> ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
