const { Schema } = require('mongoose')

const hotelSchema = new Schema(
  {
    name: String,
    location: String,
    img: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    totalRating: Number
  },
  { timestamps: true }
)

module.exports = hotelSchema
