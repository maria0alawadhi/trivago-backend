const {Room} = require("../models/index")
const {Hotel}= require("../models/index")


const GetRoom = async (req, res) => {
  try {
    const room = await Hotel.findById(_.id)
    res.send(room)
  } catch (error) {
    console.log(error);
  }
}

module.exports={
  GetRooms,
  GetRoom
}