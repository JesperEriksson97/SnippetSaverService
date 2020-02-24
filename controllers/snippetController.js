'use strict'

const snippetController = {}
const Snippet = require('../models/Snippet')


// GETS

snippetController.mySnippets = async (req, res) => {
    let mySnippets = []

    await Snippet.find({username: req.session.user})
        .then(data => mySnippets = data )
        .catch(err => console.log(err))

    console.log(mySnippets) 

    res.render('snippet/mySnippets', {
      mySnippets
    })

}
  

snippetController.createSnippet = (req, res) => {
  
  res.render('snippet/createSnippet')
}

snippetController.allSnippets = async (req, res) => {
  let allSnippets = []

  await Snippet.find({})
      .then(data => allSnippets = data )
      .catch(err => console.log(err))

  res.render('snippet/allSnippets', {
    allSnippets
  })
}

// POST 
snippetController.editSnippet = async (req, res) => {

  let snippetToEdit = {}
  await Snippet.find({_id: req.params._id})
      .then(data => snippetToEdit = data)
      .catch(err => console.log(err))
  // res.send('IM ABOUT TO EDIT ' + req.params._id)
   res.render('snippet/editSnippet', {
    snippetToEdit
   })
}

snippetController.sendUpdatedSnippet = async (req, res) => {
  let snippetToUpdate = {}
  console.log(req.params._id)
  await Snippet.findOneAndUpdate({_id: req.params._id}, {
    value: req.body.snippet,
    label: req.body.snippetName
  })
  
  req.flash('success_msg', 'Update was successful!')
  res.redirect('/dashboard')

}

snippetController.deleteSnippet = async (req, res) => {

  let snippetToDelete = {}
  await Snippet.findOneAndRemove({_id: req.params._id})

  req.flash('success_msg', 'Snippet deleted successfully!')
  res.redirect('/dashboard')
}

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