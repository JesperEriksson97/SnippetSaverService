const mongoose = require('mongoose')

const SnippetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  date: {
    type: Date()
  }
})

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet