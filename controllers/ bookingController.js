const Booking = require('../models/Booking')
const Room = require('../models/Room')

// إنشاء حجز جديد
const CreateBooking = async (req, res) => {
  try {
    const { room, user, checkIn, checkOut } = req.body

    // البحث عن الغرفة لحجزها
    let roomToBook = await Room.findById(room)

    if (!roomToBook) {
      // في حال لم نحصل الغرفة اللذي نبحث عنها
      return res.status(404).send('Room not found')
    }

    if (!roomToBook.available) {
      // إذا كانت الغرفة غير متاحة
      return res.status(400).send('Room is not available for booking')
    }

    // التحقق من وجود حجوزات  في نفس الفترة
    const overlappingBooking = await Booking.findOne({
      room,
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
        {
          checkIn: { $lte: new Date(checkIn) },
          checkOut: { $gte: new Date(checkOut) }
        }
      ]
    })

    if (overlappingBooking) {
      // إذا كانت الغرفة محجوزة في التواريخ المطلوبة
      return res
        .status(400)
        .send('Room is already booked for the selected dates')
    }

    // إنشاء حجز جديد
    const newBooking = await Booking.create({ room, user, checkIn, checkOut })

    // تحديث حالة الغرفة إلى غير متاحة
    roomToBook.available = false
    await roomToBook.save()

    res.status(201).send(newBooking)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  CreateBooking
}
