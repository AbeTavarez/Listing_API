const express = require('express');

//* Controller Methods
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
} = require('../controllers/bootcamps');

//* Include other resource routers
const courseRouter = require('./courses');

//*Creates Router
const router = express.Router();

//* Re-route into other resourse routers
router.use('/:bootcampId/courses', courseRouter);

//* Routes
//* GET
router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/').get(getBootCamps).post(createBootCamp);

router
  .route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
