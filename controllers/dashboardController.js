'use strict'

const dashboardController = {}

/**
 * Displays the dashboard / home page for the user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

// GET
dashboardController.dashboard = (req, res) => { res.render('dashboard/dashboard') }

// Exports.
module.exports = dashboardController
