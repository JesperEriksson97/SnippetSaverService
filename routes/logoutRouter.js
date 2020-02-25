'use strict'

const express = require('express')
const router = express.Router()

const logoutController = require('../controllers/logoutController')

// GET /
router.get('/', logoutController.logout)

// Exports.
module.exports = router
