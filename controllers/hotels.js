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
const checkAvailability = async (req, res) => {
  const { room, checkIn, checkOut } = req.body

  try {
    const existingReservations = await Reservation.find({
      room,
      $or: [{ checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }]
    })

    if (existingReservations.length > 0) {
      return res
        .status(400)
        .json({ message: 'Room is not available for the selected dates.' })
    }

    res.status(200).json({ message: 'Room is available.' })
  } catch (error) {
    console.error('Error checking reservation availability:', error)
    res.status(500).json({ message: 'Server error.' })
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

const createRes = async (req, res) => {
  try {
    const { hotelid, roomid } = req.params;
    const { checkIn, checkOut, user } = req.body;
    const existingReservations = await Reservation.find({
      room: roomid,
      $or: [{ checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }],
    });
    if (existingReservations.length > 0) {
      return res.status(400).json({ message: 'Room is not available for the selected dates.' });
    }
    const reservation = new Reservation({
      room: roomid,
      checkIn,
      checkOut,
      user,
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating reservation');
  }
};


module.exports = {
  getHotels,
  getHotel,
  getRooms,
  getRoom,
  create: createRes,
  getAllRooms,

}
