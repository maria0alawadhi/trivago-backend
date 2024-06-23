const router = require('express').Router()
const reservCtrl = require('../controllers/reservations')
const middleware = require('../middleware')
//get all rservations
router.get(
  '/reservations',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.GetReservs
)
//get one reservation
router.get(
  '/reservations/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.GetReserv
)
//create reservation
router.put(
  '/reservations/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.edit
)
// delete reservation
router.delete(
  '/reservations/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.delete
)

module.exports = router
