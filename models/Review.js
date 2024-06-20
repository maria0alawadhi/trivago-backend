const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    review: String,
    rating:Number,
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    room:{ type: Schema.Types.ObjectId, ref: 'Room' }

  },
  { timestamps: true }
)

module.exports = reviewSchema
