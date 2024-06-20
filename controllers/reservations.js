const { Reservation } = require('../models/Index')

const GetReservs = async (req, res) => {
  try {
    const reservations = await Reservation.find()
    res.send(reservations)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

const GetReserv = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
      return res.status(404).send('Reservation not found')
    }
    res.send(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

const edit = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedReservation) {
      return res.status(404).send('Reservation not found')
    }

    res.send(updatedReservation)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      return res.status(400).send('Bad Request: Invalid data')
    }
    res.status(500).send('Internal Server Error')
  }
}

const DeleteReserv = async (req, res) => {
  try {
    await Reservation.deleteOne({ _id: req.params.id })
    res.send({
      msg: 'Reservation Deleted',
      payload: req.params.id,
      status: 'Ok'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  GetReservs,
  GetReserv,
  edit,
  delete: DeleteReserv
}
