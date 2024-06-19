const mongoose = require('mongoose')
const userSchema = require('./User')
const roomSchema = require('./Room')
const hotelSchema = require('./Hotel')
const reservationSchema = require('./Reservation')
const reviewSchema = require('./Review')

const User = mongoose.model('User', userSchema)
const Room = mongoose.model('Room', roomSchema)
const Hotel = mongoose.model('Hotel', hotelSchema)
const Reservation = mongoose.model('Reservation', reservationSchema)
const Review = mongoose.model('Review', reviewSchema)

module.exports = { User, Room, Hotel, Reservation, Review }
