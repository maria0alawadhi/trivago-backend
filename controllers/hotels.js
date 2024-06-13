const { Hotel, Reservation } = require('../models/Index')

//get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({})
    res.send(hotels)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching hotels')
  }
}

//get one hotel
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.send(hotel)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching hotel')
  }
}

//get Hotel rooms
const getRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('rooms')
    const rooms = hotel.rooms
    res.send(rooms)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching rooms')
  }
}

//get a room of a hotel
const getRoom = async (req, res) => {
  try {
    const hotelId = req.params.hotelid
    const roomId = req.params.roomid

    const hotel = await Hotel.findById(hotelId).populate('rooms')

    for (const room of hotel.rooms) {
      if (room._id.toString() === roomId) {
        return res.send(room)
      }
    }
    return res.status(404).send('Room not found')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching room')
  }
}
// create a new reservasion
const createRes = async (req, res) => {
  try {
    const reservasion = req.body
    const newRes = new Reservation(reservasion)
    const savedRes = await newRes.save()
    console.log(`Reservation completed ${savedRes._id}`)

    res.send({
      msg: 'Reservation Deleted',
      payload: req.params.id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}
module.exports = {
  getHotels,
  getHotel,
  getRooms,
  getRoom,
  create: createRes
}