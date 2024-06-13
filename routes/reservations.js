const router = require('express').Router()
const reservCtrl = require('../controllers/reservations')

router.get('/rooms', reservCtrl.GetReservs)
router.get('/rooms/:id', reservCtrl.GetReserv)
router.get('/rooms/:id', reservCtrl.edit)
router.post('/rooms/:id', reservCtrl.delete)

module.exports = router
