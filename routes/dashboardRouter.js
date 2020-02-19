'use strict'

const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboardController')

// GET /
router.get('/', dashboardController.dashboard)

// Exports.
module.exports = router
