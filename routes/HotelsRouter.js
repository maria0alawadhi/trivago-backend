const router = require('express').Router()
const HotelsCtrl = require('../controllers/HotelsController')

router.get('/hotels', HotelsCtrl.GetHotels) // Get all hotels
router.get('/hotels/:id', HotelsCtrl.GetHotel) // Get one hotel
router.get('/hotels/:id/rooms', HotelsCtrl.GetRooms)
// router.get('/rooms', HotelsCtrl.GetHotel)


module.exports = router
