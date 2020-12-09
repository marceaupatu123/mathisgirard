const mongoose = require("mongoose");

const reportschema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  channelID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("reports-channels", reportschema);
