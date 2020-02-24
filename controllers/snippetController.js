'use strict'

const snippetController = {}
const Snippet = require('../models/Snippet')

// GETS

snippetController.mySnippets = (req, res) => {
    res.render('snippet/mySnippets') // Here we should also send all the snippets that are in the database.
  }
  

snippetController.createSnippet = (req, res) => {
    res.render('snippet/createSnippet') // Here we should also send all the snippets that are in the database.
}

snippetController.allSnippets = (req, res) => {
    res.render('snippet/allSnippets') // Here we should also send all the snippets that are in the database.
}

// POST 

snippetController.postSnippet = (req, res) => {
  // Post the snippet to MongoDB
  const { snippet, snippetName } = req.body

  if (!snippetName || !snippet) {
    req.flash('error_msg', 'Please fill in all fields.')
    res.redirect(302, '/dashboard/createSnippet')
  }

  // HERE WE WANT TO SEND THE SNIPPET TO A DATABASE
  console.log(req.session.userId)
}


module.exports = snippetController