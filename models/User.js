const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    name: String,
    email: String,
    passwordDigest: String,
    
  },
  { timestamps: true }
)

module.exports = userSchema
