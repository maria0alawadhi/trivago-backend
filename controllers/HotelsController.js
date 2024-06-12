const { Hotel } = require("../models/index")

const GetHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({})
    res.send(hotels)
  } catch (error) {
    console.log(error)
  }
}

const GetHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.send(hotel)
  } catch (error) {
    console.log(error)
  }
}

const GetRooms = async (req, res) => {
  try {
    const rooms = await Hotel.findById({ room: req.rooms._id })
    console.log("rooms" + rooms)
    res.send(rooms)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  GetHotels,
  GetHotel,
  GetRooms,
}
