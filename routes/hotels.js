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

// creat a reservasion

router.put('/hotels/reservasion/room', HotelsCtrl.create)
module.exports = router

// get all rooms in all from hotels
// router.get('/rooms', HotelsCtrl.getAllRooms)
