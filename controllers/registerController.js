'use strict'

const bcrypt = require('bcrypt')

const registerController = {}

/**
 * Displays a register page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

const User = require('../models/User')

// GET
registerController.register = (req, res) => { res.render('register/register') }

/**
 * Handles registreing and saving information to mongoDB.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

// POST
registerController.postRegister = function (req, res) {
  const { username, password } = req.body

  // Check required fields
  if (!username || !password) {
    req.flash('error_msg', 'Please fill in all fields.')
    res.redirect('/register')
    res.status(400)
  }

  // Check password length
  if (password.length < 6) {
    req.flash('error_msg', 'The password needs to be atleast 6 characters long.')
    res.redirect('/register')
    res.status(400)
  }

  // Check if any errors accured

  User.findOne({ username: username })
    .then(user => {
      if (user) {
        // User exists
        req.flash('error_msg', 'Username already taken.')
        res.redirect('/register')
        res.status(400)
      } else {
        // No user registered, create a new one.
        const newUser = new User({
          username,
          password
        })

        console.log(newUser)

        // HASH password
        bcrypt.genSalt(10, (err, salt) => { // Using salt method in encryption
          if (err) throw err
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            // Set password to hashed
            newUser.password = hash
            // Save user
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'You are now registered and can log in')
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
}

// Exports.
module.exports = registerController
