const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);
var userSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  firstName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  numTel: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

userSchema.plugin(AutoIncrement, { id: "id_seq3", inc_field: "id" });

var User = mongoose.model("user", userSchema);
module.exports = User;
