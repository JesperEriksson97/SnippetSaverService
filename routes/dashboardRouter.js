'use strict'

const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboardController')
const snippetController = require('../controllers/snippetController')

// GET /
router.get('/', dashboardController.dashboard)

router.get('/mySnippets', snippetController.mySnippets) // Generates all the snippets with the same username as the req.username

router.get('/createSnippet', snippetController.createSnippet) // Renders the hbs for creating a snippet

router.get('/allSnippets', snippetController.allSnippets) // Generates ALL snippets in databse

router.get('/editSnippet/:_id', snippetController.editSnippet)

// POST /

router.post('/createSnippet', snippetController.postSnippet)

router.post('/sendUpdatedSnippet/:_id', snippetController.sendUpdatedSnippet)

// DELETE /

router.delete('/deleteSnippet/:_id', snippetController.deleteSnippet)

// Exports.
module.exports = router
