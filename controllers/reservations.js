const { Reservation } = require('../models')

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
