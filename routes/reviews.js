const router = require('express').Router()
const reviewsCtrl = require('../controllers/reviews')
const middleware = require('../middleware')

router.get('/reviews/:roomid', reviewsCtrl.getAllReviews)
router.post(
  '/reviews/:roomid',
  middleware.stripToken,
  middleware.verifyToken,
  reviewsCtrl.createReview
)


module.exports = router
