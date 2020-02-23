'use strict'

const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboardController')

// GET /
router.get('/', dashboardController.dashboard)

/*router.get('/mysnippets', dashboardController.mySnippets) // Generates all the snippets with the same username as the req.username

router.get('/allsnippets', dashboardController.allSnippets) // Generates ALL snippets in databse*/


// Exports.
module.exports = router
