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

const GetReser_by_roomid = async (roomId) => {
  try {
    const reservation = await Reservation.find({ room: roomId })
    return reservation
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch reservation by room ID')
  }
}

// create a new reservasion
const createRes = async (req, res) => {
  let check_in = req.headers['check_in']
  let check_out = req.headers['check_out']
  let room_id = req.headers['room_id']
  let user_id = req.headers['user_id']
  console.log(`user id: ${user_id}`)
  try {
    const reservasion = {
      room: room_id,
      user: user_id,
      checkIn: check_in,
      checkOut: check_out
    }
    let checkInDate = new Date(check_in)
    let checkOutDate = new Date(check_out)

    // Ensure check-in date is before check-out date....
    if (checkInDate >= checkOutDate) {
      console.log(`First 500 response...`)
      res.status(500).send({
        msg: 'Check-in date must be before check-out date',
        payload: req.params.id,
        status: 500
      })
    } else {
      // Convert headers to Date objects new
      cheack_next = true
      let existingReservation = await GetReser_by_roomid(room_id)
      existingReservation.forEach((element) => {
        old_checkIn = new Date(element['checkIn'])
        old_checkOut = new Date(element['checkOut'])

        if (
          ((checkInDate <= old_checkOut && checkInDate >= old_checkIn) ||
            (checkOutDate <= old_checkOut && checkOutDate >= old_checkIn)) &&
          cheack_next
        ) {
          console.log(`Second 500 response...`)
          res.status(500).send({
            msg: 'There is a reservation in same date',
            payload: req.params.id,
            status: 500
          })
          cheack_next = false
        }
      })
      const newRes = new Reservation(reservasion)
      const savedRes = await newRes.save()
      console.log(`Reservation completed ${savedRes._id}`)
      if (cheack_next) {
        console.log(`Success return...`)
        res.send({
          msg: 'Reservation Created',
          payload: req.params.id,
          status: 'Ok'
        })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creatuing reservation')
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
