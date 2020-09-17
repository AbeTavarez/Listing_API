const express = require('express');

//*Creates Router
const router = express.Router();

//* Routes
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
