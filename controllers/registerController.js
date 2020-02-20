'use strict'

const bcrypt = require('bcrypt')

const registerController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const User = require('../models/User')

// GET
registerController.register = (req, res) => { res.render('register/register') }

// POST
registerController.postRegister = function (req, res) {

  const { username, password } = req.body
  const errors = []

  // Check required fields
  if (!username || !password) {
    errors.push({ msg: 'Please fill in all fields' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be atleast 6 characters' })
  }

  // Check if any errors accured
  if (errors.length > 0) {
    res.render('register/register', {
      errors,
      username,
      password
    })
  } else {
    User.findOne({ username: username })
      .then(user => {
        if (user) {
          // User exists
          errors.push({ msg: 'Username is already taken' })
          res.render('register/register', {
            errors,
            username,
            password
          })
        } else {
          // No user registered, create a new one.
          const newUser = new User({
            username,
            password
          })

          console.log(newUser)

          // HASH password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              // Set password to hashed
              newUser.password = hash
              // Save user
              newUser.save()
                .then(user => {
                  console.log(req.flash.success_msg)
                  req.flash('success_msg', 'You are now registered and can log in')
                  res.redirect('/')
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }
}

// Exports.
module.exports = registerController
