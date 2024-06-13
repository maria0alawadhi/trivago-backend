const { Reservation } = require('../models')
// const {Room} = require("../models/index")
// const {Hotel}= require("../models/index")

// const GetRoom = async (req, res) => {
//   try {
//     const room = await Hotel.findById(_.id)
//     res.send(room)
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports={
//   GetRoom
// }
const DeleteReservation = async (req, res) => {
  try {
    await Reservation.deleteOne({ _id: req.params.id })
    res.send({
      msg: 'Reservation Deleted',
      payload: id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}
module.exports = {
  DeleteReservation
}
