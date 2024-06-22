const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const AuthRouter = require('./routes/auth')
const HotelsRouter = require('./routes/hotels')
const ReservationsRouter = require('./routes/reservations')
const ReviewsRouter = require('./routes/reviews')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRouter)
app.use('/', HotelsRouter)
app.use('/', ReservationsRouter)
app.use('/', ReviewsRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
