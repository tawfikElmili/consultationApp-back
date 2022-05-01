
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
        return new ObjectId().toString()
    }},

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


var User = mongoose.model('Users', UserSchema);
module.exports = User;
