const router = require('express').Router()
const reviewsCtrl = require('../controllers/reviews')

router.get('/reviews/:roomid',reviewsCtrl.getAllReviews)
router.post('/reviews/:roomid',reviewsCtrl.createReview)
router.delete('/reviews/:roomid',reviewsCtrl.deleteReview)

module.exports = router
