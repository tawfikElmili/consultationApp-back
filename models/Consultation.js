var mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence')(mongoose);
var consultationSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  id : {type:Number},
  medicationIds: [],
  medicationList: [],
  userAffectId: {
    type: Number,
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
consultationSchema.plugin(AutoIncrement, {id:'id_seq1',inc_field: 'id'});
var Consultation = mongoose.model("consultation", consultationSchema);
module.exports = Consultation;
