var mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
var medicationSchema = new mongoose.Schema({
  _id: ObjectId,
  consultationId: {
    type: String,
  },

  designation: {
    type: String,
  },
  note: {
    type: String,
  },
});

var medication = mongoose.model("medication", medicationSchema);
module.exports = medication;
