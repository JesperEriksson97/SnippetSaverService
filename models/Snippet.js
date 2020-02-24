const mongoose = require('mongoose')

const SnippetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet