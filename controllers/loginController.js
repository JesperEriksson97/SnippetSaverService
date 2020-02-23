'use strict'
const bcrypt = require('bcrypt')
const loginController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
loginController.login = (req, res) => { res.render('login/login') }

loginController.postLogin = async function (req, res) {
  const { username, password } = req.body

  const user = users.find(user => {
    user.name = req.body.name
  })

  if (username && password) {
    // Check in database if username and password are registered.
  }
}

// Exports.
module.exports = loginController
