
const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  _id: ObjectId,
  firstName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
    email: {
    type: String,
    unique: true,
    required: true,
    trim: true
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


var User = mongoose.model('user', UserSchema);
module.exports = User;
