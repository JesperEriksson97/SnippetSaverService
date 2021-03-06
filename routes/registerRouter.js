'use strict'

const express = require('express')
const router = express.Router()

const registerController = require('../controllers/registerController')

// GET
router.get('/', registerController.register)

// POST
router.post('/', registerController.postRegister)

// Exports.
module.exports = router
