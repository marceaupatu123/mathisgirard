const mongoose = require("mongoose");

const modo_roles_schema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  rolemodo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("modo-roles-schema", modo_roles_schema);
