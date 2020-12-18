const mongoose = require('mongoose')

const modoRolesSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  rolemodo: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('modo-roles-schema', modoRolesSchema)
