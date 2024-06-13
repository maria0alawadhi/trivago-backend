const { Reservation } = require('../models/Index')

const DeleteReserv = async (req, res) => {
  try {
    await Reservation.deleteOne({ _id: req.params.id })
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
  delete: DeleteReserv,
  add: createRes
}
