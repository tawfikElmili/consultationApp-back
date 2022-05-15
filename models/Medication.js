var mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);
var medicationSchema = new mongoose.Schema({
  id: { type: Number },
  consultationId: { type: Number },

  designation: {
    type: String,
  },
  note: {
    type: String,
  },
});
medicationSchema.plugin(AutoIncrement, { id: "id_seq2", inc_field: "id" });
var medication = mongoose.model("medication", medicationSchema);
module.exports = medication;
