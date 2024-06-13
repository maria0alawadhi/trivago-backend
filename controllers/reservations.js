const { Room } = require('../models/Index')
const { Hotel } = require('../models/Index')

const GetRoom = async (req, res) => {
  try {
    const room = await Hotel.findById(_.id)
    res.send(room)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  GetRoom
}
