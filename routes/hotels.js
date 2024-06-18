const router = require('express').Router()
const HotelsCtrl = require('../controllers/hotels')

// get all hotels
router.get('/hotels', HotelsCtrl.getHotels)
// get one hotel
router.get('/hotels/:id', HotelsCtrl.getHotel)
//get hotel roo ms
router.get('/hotels/:id/rooms', HotelsCtrl.getRooms)
// get one room
router.get('/hotels/:hotelid/rooms/:roomid', HotelsCtrl.getRoom)

// creat a reservasion
// router.get('/hotels/reservasion/:hotelid/rooms/:roomid', HotelsCtrl.createRes)
router.post('/hotels/reservasion/room', HotelsCtrl.create)
module.exports = router
