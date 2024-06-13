const router = require('express').Router()
const HotelsCtrl = require('../controllers/HotelsController')

// get all hotels
router.get('/hotels', HotelsCtrl.getHotels)
// get one hotel
router.get('/hotels/:id', HotelsCtrl.getHotel)
//get hotel rooms
router.get('/hotels/:id/rooms', HotelsCtrl.getRooms)

router.get('/hotels/:hotelid/rooms/:roomid', HotelsCtrl.getRoom)

module.exports = router
