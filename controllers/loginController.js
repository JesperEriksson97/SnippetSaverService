'use strict'

const loginController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
loginController.login = (req, res) => { res.render('login/login') }

// Exports.
module.exports = loginController
