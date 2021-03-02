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
  ban: {
    type: Boolean,
    required: false
  },
  mute: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('veski', warn)
