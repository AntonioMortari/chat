const express = require('express')
const router = express.Router()

// controller
const DefaultRoomController = require('../controllers/DefaultRoom')
const defaultRoomController = new DefaultRoomController()

router.get('/', defaultRoomController.index)

router.post('/', defaultRoomController.create)

router.delete('/:id', defaultRoomController.delete)

module.exports = router