'use strict'

const homeController = {}

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = (req, res) => { res.render('home/index') }

// Exports.
module.exports = homeController
