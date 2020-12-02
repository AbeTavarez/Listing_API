//*
const express = require('express');

//* Controller Methods
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

//* Include other resource routers
const courseRouter = require('./courses'); //! courseRouter

//*Creates Router
const router = express.Router();

//* Re-route into other resourse routers
//! anyy request that hits this path will get re-routed to -courseRouter
router.use('/:bootcampId/courses', courseRouter);

//* Routes
//* GET
router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

router.route('/').get(advancedResults(Bootcamp, 'courses'),getBootCamps).post(createBootCamp);

router
  .route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
