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
      if (cheack_next)
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
  GetReservs,
  GetReserv,
  edit,
  delete: DeleteReserv,
  createRes
}
