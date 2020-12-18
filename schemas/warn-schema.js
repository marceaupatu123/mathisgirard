const mongoose = require('mongoose')

const warn = mongoose.Schema({
  guildID: {
    type: String,
    required: true
  },
  memberID: {
    type: String,
    required: true
  },
  warnings: {
    type: [Object],
    required: true
  }
})

module.exports = mongoose.model('warn', warn)
