'use strict'
const bcrypt = require('bcrypt')
const loginController = {}
const User = require('../models/User')

/**
 * Displays a login page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
loginController.login = (req, res) => { res.render('login/login') }

/**
 * A function that handles login. Is Async and checks with mongoDB if the password / uername
 * matches with any in mongoDB.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} next - Function to proceed with the natural flow.
 */
loginController.postLogin = async function (req, res, next) {
  let userData
  try {
    userData = {
      users: (await User.find({}))
        .map(user => ({
          id: user._id,
          username: user.username,
          password: user.password
        }))
    }
  } catch (error) {
    next(error)
  }

  const user = userData.users.find(user => user.username === req.body.username)
  if (user == null) {
    req.flash('error_msg', 'Could not find user')
    res.redirect('/login')
    res.status(400)
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(user.id)
      req.session.userId = user.id
      req.session.user = user.username
      console.log(req.session.userId)
      res.redirect('/dashboard')
    }
    req.flash('error_msg', 'Incorrect Password')
    res.redirect('/login')
  } catch {
    req.flash('error_msg', 'Not allowed')
  }
}

// Exports.
module.exports = loginController
