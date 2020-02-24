'use strict'

const snippetController = {}

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
}


module.exports = snippetController