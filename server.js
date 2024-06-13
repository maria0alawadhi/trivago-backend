const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const AuthRouter = require('./routes/auth')
const hotelsRouter = require('./routes/hotels')
const roomsRouter = require('./routes/reservations')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRouter)
app.use('/', hotelsRouter)
app.use('/', roomsRouter)

app.use('/', (req, res) => {
  res.send(`Connected to Trivago Server!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
