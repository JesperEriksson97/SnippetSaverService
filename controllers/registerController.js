'use strict'

const registerController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
registerController.register = (req, res) => { res.render('register/register') }
registerController.postRegister = (req, res) => {
    console.log(req.body.Username)
    console.log(req.body.Password)
}

// Exports.
module.exports = registerController
