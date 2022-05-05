var mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
var ConsultationSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: {
    type: String,
  },
  medicationIds: [],
  medicationList: [],

  userAffectId: {
    type: String,
  },
  title: {
    type: String,
  },
  observation: {
    type: String,
  },
  description: {
    type: String,
  },
});

var Consultation = mongoose.model("consultation", ConsultationSchema);
module.exports = Consultation;
