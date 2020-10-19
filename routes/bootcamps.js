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

router.route('/').get(getBootCamps).post(createBootCamp);

router
  .route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
