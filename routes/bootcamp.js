const express = require('express');

//*Creates Router
const router = express.Router();

//* Routes
router.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
});
router.get('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show Bootcamp ${req.params.id}` });
});
router.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create New Bootcamp' });
});
router.put('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
});
router.delete('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
});
