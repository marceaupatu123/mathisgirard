const mongoose = require('mongoose')

const banRolesSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  rolemodo: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ban-roles-schema', banRolesSchema)
