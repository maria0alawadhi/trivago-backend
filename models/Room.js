const { Schema } = require('mongoose')

const roomSchema = new Schema(
  {
    name: String,
    img: String,
    type: String,
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    available: Boolean,
    facilities: [String],
    price: Number
  },
  { timestamps: true }
)

module.exports = roomSchema
