const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  membershipType: { type: String },
  membershipStatus: { type: Boolean },
  _created: { type: Date, default: Date.now }
});

const classesSchema = new Schema({
  name: { type: String, require: true },
  instructor: { type: String },
  day: { type: String },
  time: { type: String },
  _created: { type: Date, default: Date.now }
});

const Users = mongoose.model('Users', userSchema);
const Classes = mongoose.model('Classes', classesSchema);
module.exports.Users = Users;
module.exports.Classes = Classes;