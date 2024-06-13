const { Booking } = require('../models.index')
// function to git all history resrvation was saved by user name
const showresevation = async (req, res) => {
  try {
    const userId = req.params.userId
    const reservations = await reservations
      .find({ User: userId })
      .populate('rooms', 'name')
      .populate('hotel', 'name')
    res.send(reservations)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  showresevation
}
