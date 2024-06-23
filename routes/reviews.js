const router = require('express').Router()
const reviewsCtrl = require('../controllers/reviews')
const middleware = require('../middleware')
//get all reviews for a room
router.get('/reviews/:roomid', reviewsCtrl.getAllReviews)
//create review for a room
router.post(
  '/reviews/:roomid',
  middleware.stripToken,
  middleware.verifyToken,
  reviewsCtrl.createReview
)

module.exports = router
