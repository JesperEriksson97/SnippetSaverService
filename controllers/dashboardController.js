'use strict'

const dashboardController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

// GET
dashboardController.dashboard = (req, res) => { res.render('dashboard/dashboard') }

dashboardController.mySnippets = (req, res) => {
  res.render('dashboard/mySnippets')
}

// POST
dashboardController.postDashboard = function (req, res) {
  console.log(req.body.username)
  console.log(req.body.password)
}

// Exports.
module.exports = dashboardController
