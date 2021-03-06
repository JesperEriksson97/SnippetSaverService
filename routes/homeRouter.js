'use strict'

const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')

// GET /
router.get('/', homeController.index)

// Exports.
module.exports = router
