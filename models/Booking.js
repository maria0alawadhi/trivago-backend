const { Schema } = require("mongoose")

const bookingSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    checkIn: Date,
    checkOut: Date,
  },
  { timestamps: true }
)

module.exports = bookingSchema
