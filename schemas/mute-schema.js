const mongoose = require('mongoose')

const reportschema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  mute: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('reports-channels', reportschema)
