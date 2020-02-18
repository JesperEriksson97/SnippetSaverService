'use strict'

const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

// GET /
router.get('/', loginController.login)

// Exports.
module.exports = router
