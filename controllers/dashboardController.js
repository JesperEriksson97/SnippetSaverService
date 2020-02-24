'use strict'

const dashboardController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const Snippet = require('../models/User')
const snippetController = require('./snippetController')

// GET
dashboardController.dashboard = (req, res) => { res.render('dashboard/dashboard') }

// Maybe move out to a SnippetController
dashboardController.postSnippet = function (req, res) {
  // Here we should post a snippet
}
// Exports.
module.exports = dashboardController
