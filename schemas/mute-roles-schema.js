const mongoose = require('mongoose')

const muteRolesSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  rolemodo: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('mute-roles-schema', muteRolesSchema)
