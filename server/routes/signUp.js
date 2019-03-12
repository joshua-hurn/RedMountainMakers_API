const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const signToken = require('../../config/auth');

// Model
const Users = require('../../db/models').Users;
router.get('/register', (req, res) => {
  res.status(200).send('signup page');
});

// Register User // works
router.post('/register', (req, res) => {
  const { email, firstName, lastName, password, password2 } = req.body;
  let errors = [];
  // Check required Fields
  if (!email || !firstName || !lastName || !password || !password2) {
    errors.push({ msg: 'Please enter all fields.' });
  }
  // Check passwords match
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match.' });
  }
  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.send({ errors });
  } else {
    Users.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email is already registered.' });
        res.send(errors);
      } else {
        const newUser = new Users({
          email,
          firstName,
          lastName,
          password
        });
        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save();
          });
        });
        const token = signToken(newUser);
        res.status(200).json({ token });
      }
    });
  }
});

module.exports = router;