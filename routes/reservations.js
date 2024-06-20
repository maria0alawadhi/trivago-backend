const router = require('express').Router()
const reservCtrl = require('../controllers/reservations')
const middleware = require('../middleware')

router.get(
  '/reservations',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.GetReservs
)
router.get(
  '/reservations/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.GetReserv
)
router.put(
  '/reservations/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.edit
)
router.delete(
  '/reservations/:id',
  middleware.stripToken,
  middleware.verifyToken,
  reservCtrl.delete
)

module.exports = router
