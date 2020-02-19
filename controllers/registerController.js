'use strict'

const registerController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

// GET
registerController.register = (req, res) => { res.render('register/register') }

// POST
registerController.postRegister = function (req, res) {
  console.log('We pressed REGISTER')
  console.log(req.body.Username)
  console.log(req.body.Password)
}

// Exports.
module.exports = registerController
