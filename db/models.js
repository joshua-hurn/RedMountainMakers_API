const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  firstName: {type: String},
  lastName: {type: String},
  password: {type: String, required: true, select: false},
  membershipType: {type: String},
  membershipStatus: {type: Boolean},
  _created: {type: Date, default: Date.now }
});

const classesSchema = new Schema({
  name: {type: String},
  day: {type: String},
  time: {type: Number},
  _created: {type: Date, default: Date.now }
});

const Users = mongoose.model('user', userSchema);
const Classes = mongoose.model('classes', classesSchema);
module.exports.Users = Users;
module.exports.Classes = Classes;