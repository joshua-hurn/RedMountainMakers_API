const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/RMMdb', {useNewUrlParser: true});

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  firstName: {type: String},
  lastName: {type: String},
  password: {type: String},
  membershipType: {type: String},
  membershipStatus: {type: Boolean},
  _created: {type: Date, default: Date.now }
});

const classesSchema = new Schema({
  name: {type: String},
  day: {type: String},
});

const User = mongoose.model('user', userSchema);