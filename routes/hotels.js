const router = require('express').Router()
const HotelsCtrl = require('../controllers/hotels')
const middleware = require('../middleware')

// get all hotels
router.get('/hotels', HotelsCtrl.getHotels)
// get one hotel
router.get('/hotels/:hotelid', HotelsCtrl.getHotel)
//get hotel rooms
router.get('/hotels/:hotelid/rooms', HotelsCtrl.getRooms)
// get one hotel room
router.get('/hotels/:hotelid/rooms/:roomid', HotelsCtrl.getRoom)
// post a room hotel
router.post(
  '/hotels/:hotelid/rooms/:roomid',
  middleware.stripToken,
  middleware.verifyToken,
  HotelsCtrl.create
)

// get all rooms in all from hotels
router.get('/rooms', HotelsCtrl.getAllRooms)

module.exports = router
