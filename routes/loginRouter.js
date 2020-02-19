'use strict'

const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

// GET
router.get('/', loginController.login)

// POST
router.post('/', loginController.postLogin)

// Exports.
module.exports = router
