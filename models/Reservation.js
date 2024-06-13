const { Schema } = require('mongoose')

const reservationSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    checkIn: Date,
    checkOut: Date
  },
  { timestamps: true }
)

module.exports = reservationSchema
