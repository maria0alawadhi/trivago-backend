const { Schema } = require('mongoose')

const roomSchema = new Schema(
  {
    name: String,
    img: String,
    type: String,
    rating: { type: [Number], min: 0, max: 5 },
    review: [String],
    available: Boolean,
    facilities: [String],
    price: Number
  },
  { timestamps: true }
)

module.exports = roomSchema
