const router = require('express').Router()
const HotelsCtrl = require('../controllers/hotels')

// get all hotels
router.get('/hotels', HotelsCtrl.getHotels)
// get one hotel
router.get('/hotels/:hotelid', HotelsCtrl.getHotel)
//get hotel rooms
router.get('/hotels/:hotelid/rooms', HotelsCtrl.getRooms)
// get one room
router.get('/hotels/:hotelid/rooms/:roomid', HotelsCtrl.getRoom)

router.put('/hotels/reservasion/room', HotelsCtrl.create)

router.post('/hotels/:hotelid/rooms/:roomid', HotelsCtrl.create)

// get all rooms in all from hotels
router.get('/rooms', HotelsCtrl.getAllRooms)

module.exports = router
