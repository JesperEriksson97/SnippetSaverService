'use strict'

const logoutController = {}

/**
 * Handles logout functionality.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
logoutController.logout = (req, res) => {
  req.session.destroy()
  res.redirect('http://localhost:8000/')
}

module.exports = logoutController
