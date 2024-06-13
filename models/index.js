const mongoose = require("mongoose")
const userSchema = require("./User")
const roomSchema = require("./Room")
const hotelSchema = require("./Hotel")
const reservationSchema = require("./Reservation")

const User = mongoose.model("User", userSchema)
const Room = mongoose.model("Room", roomSchema)
const Hotel = mongoose.model("Hotel", hotelSchema)
const Reservation = mongoose.model("Reservation", reservationSchema)

module.exports = { User, Room, Hotel, Reservation }
