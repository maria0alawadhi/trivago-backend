const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

// تعريف مسار لإنشاء حجز جديد
router.post('/book', bookingController.CreateBooking)

module.exports = router
