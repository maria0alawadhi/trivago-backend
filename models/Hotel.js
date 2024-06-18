const { Schema } = require('mongoose')

const hotelSchema = new Schema(
  {
    name: String,
    location: String,
    img: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    rating: { type: [Number], min: 0, max: 5 }
  },
  { timestamps: true }
)

module.exports = hotelSchema
