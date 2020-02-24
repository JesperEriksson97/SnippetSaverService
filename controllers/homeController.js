'use strict'

const homeController = {}
const Snippet = require('../models/Snippet')

/**
 * Displays a start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
homeController.index = async (req, res) => {
  console.log(req.session)

  let homeSnippets = [] // CHANGE TO ALL

  await Snippet.find({})
      .then(data => homeSnippets = data )
      .catch(err => console.log(err))

  res.render('home/index', {
    homeSnippets
  })
}

// Exports.
module.exports = homeController
