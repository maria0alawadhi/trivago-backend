const { Hotel, Reservation, Room } = require('../models/Index')

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

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    res.send(rooms)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching rooms')
  }
}
//get one hotel
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelid)
    res.send(hotel)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching hotel')
  }
}

//get Hotel rooms
const getRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelid).populate('rooms')
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
  let check_in = req.headers['check_in']
  let check_out = req.headers['check_out']
  let room_id = req.headers['room_id']
  let user_id = req.headers['user_id']

  try {
    const reservasion = {
      room: room_id,
      user: user_id,
      checkIn: check_in,
      checkOut: check_out
    }
    let checkInDate = new Date(check_in)
    let checkOutDate = new Date(check_out)
    // Ensure check-in date is before check-out date
    if (checkInDate >= checkOutDate) {
      res.status(500).send({
        msg: 'Check-in date must be before check-out date',
        payload: req.params.id,
        status: 500
      })
    } else {
      // Convert headers to Date objects
      const Reservation = require('../controllers/reservations') // Ensure the correct path to your Reservation model
      const newRes = new Reservation(reservasion)
      const savedRes = await newRes.save()
      console.log(`Reservation completed ${savedRes._id}`)
      res.send({
        msg: 'Reservation Created',
        payload: req.params.id,
        status: 'Ok'
      })
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getHotels,
  getHotel,
  getRooms,
  getRoom,
  getAllRooms,
  create: createRes
}
