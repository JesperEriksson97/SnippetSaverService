'use strict'
const bcrypt = require('bcrypt')
const loginController = {}
const User = require('../models/User')

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
loginController.login = (req, res) => { res.render('login/login') }

loginController.postLogin = async function (req, res, next) {
  const { username, password } = req.body

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
    console.log(userData.users)
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(req.body.password)
      console.log(user.password)
      console.log(' WE DO GET HERE ????')
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
