'use strict'

const dashboardController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

// GET
dashboardController.dashboard = (req, res) => { res.render('register/register') }

// POST
dashboardController.postDashboard = function (req, res) {
  console.log(req.body.Username)
  console.log(req.body.Password)
}

// Exports.
module.exports = dashboardController
