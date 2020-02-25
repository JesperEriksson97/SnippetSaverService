'use strict'

const snippetController = {}
const Snippet = require('../models/Snippet')

// GETS

/**
 * Displays the users snippets.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.mySnippets = async (req, res) => {
  let mySnippets = []

  await Snippet.find({ username: req.session.user })
    .then(function (data) {
      mySnippets = data
    })
    .catch(err => console.log(err))

  console.log(mySnippets)

  res.render('snippet/mySnippets', {
    mySnippets
  })
}

/**
 * Displays the page to create a new snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.createSnippet = (req, res) => {
  res.render('snippet/createSnippet')
}

/**
 * Displays all snippets.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.allSnippets = async (req, res) => {
  let allSnippets = []

  await Snippet.find({})
    .then(function (data) {
      allSnippets = data
    })
    .catch(err => console.log(err))

  res.render('snippet/allSnippets', {
    allSnippets
  })
}

// POST

/**
 * Handes update of a snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.editSnippet = async (req, res) => {
  let snippetToEdit = {}
  await Snippet.find({ _id: req.params._id })
    .then(function (data) {
      snippetToEdit = data
    })
    .catch(err => console.log(err))
  // res.send('IM ABOUT TO EDIT ' + req.params._id)
  res.render('snippet/editSnippet', {
    snippetToEdit
  })
}

/**
 * Handles saving a updated snippet to mongoDB.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.sendUpdatedSnippet = async (req, res) => {
  console.log(req.params._id)
  await Snippet.findOneAndUpdate({ _id: req.params._id }, {
    value: req.body.snippet,
    label: req.body.snippetName
  })

  req.flash('success_msg', 'Update was successful!')
  res.redirect('/dashboard')
}

/**
 * Handles deletion of a snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.deleteSnippet = async (req, res) => {
  await Snippet.findOneAndRemove({ _id: req.params._id })

  req.flash('success_msg', 'Snippet deleted successfully!')
  res.redirect('/dashboard')
}

/**
 * Handles saving a snippet to mongoDB.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

snippetController.postSnippet = (req, res) => {
  // Post the snippet to MongoDB
  const { snippet, snippetName } = req.body

  if (!snippetName || !snippet) {
    req.flash('error_msg', 'Please fill in all fields.')
    res.redirect(302, '/dashboard/createSnippet')
  }

  const username = req.session.user
  const userId = req.session.userId
  const label = snippetName
  const value = snippet

  // HERE WE WANT TO SEND THE SNIPPET TO A DATABASE
  const newSnippet = new Snippet({
    username,
    userId,
    label,
    value
  })

  newSnippet.save().then(snippet => {
    req.flash('success_msg', 'Snippet was successfully saved')
    res.redirect('/dashboard')
  }).catch(err => console.log(err))

  console.log(req.session.userId)
}

module.exports = snippetController
