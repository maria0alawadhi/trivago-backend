const mongoose = require("mongoose")
const userSchema = require("./User")
const roomSchema = require("./Room")
const hotelSchema = require("./Hotel")
const bookingSchema = require("./Booking")

const User = mongoose.model("User", userSchema)
const Room = mongoose.model("Room", roomSchema)
const Hotel = mongoose.model("Hotel", hotelSchema)
const Booking = mongoose.model("Booking", bookingSchema)

module.exports = { User, Room, Hotel, Booking }
