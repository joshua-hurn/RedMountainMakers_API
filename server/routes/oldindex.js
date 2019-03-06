const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/index');
const passport = require('passport');
// Models
const Users = require('../../db/models').Users;
const Classes = require('../../db/models').Classes;
// Strategies
const passportlocal = passport.authenticate('local', { session: false });
const passportjwt = passport.authenticate('jwt', { session: false });

signToken = user => {
  return jwt.sign({
    sub: user.id,
    iat: new Date().getTime()
  }, JWT_SECRET);
}

// Login Page // works
router.get('/login', (req, res) => {
  res.send('login');
});

// Register Page // works
router.get('/register', (req, res) => {
  res.send('register');
});

// Register // works
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

// Login // works
router.post('/login', passportlocal, (req, res) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
});

// Logout // works
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/api/login');
});

// Home Page // works
router.get('/home', passportjwt, (req, res) => {
  res.json({ message: 'access' });
});

// User routes // Works!
router.get('/users', passportjwt, (req, res) => {
  Users.find(function (err, users) {
    if (err) return console.log(err);
    res.send(users);
  });
});

// One User by id // works!
router.get('/users/:id', passportjwt, (req, res) => {
  let id = req.params.id;
  Users.findById(id, (err, user) => {
    if (err) console.log(err);
    res.send(user);
  })
});

// Create new user // works!
// router.post('/users', (req, res) => {
//   let newUser = Users({
//     email: req.body.email,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     password: req.body.password,
//     membershipType: req.body.membershipType,
//     membershipStatus: req.body.membershipStatus
//   });
//   newUser.save(function (err) {
//     if (err) return err
//     res.send("User Created");
//   });
// });

// Update User // Works!
router.put('/users/:id', passportjwt, (req, res, next) => {
  Users.findOneAndUpdate({ _id: { $eq: req.params.id } }, { $set: req.body },
    (err) => {
      if (err) return next(err);
      res.send('User updated.');
    });
});

// Delete User // Works!
router.delete('/users/:id', passportjwt, (req, res, next) => {
  Users.findOneAndDelete({ _id: { $eq: req.params.id } },
    (err) => {
      if (err) return next(err);
      res.send('User Deleted.');
    });
});

// Class routes // works!
router.get('/classes', passportjwt, (req, res) => {
  Classes.find(function (err, classes) {
    if (err) return console.log(err);
    res.send(classes);
  });
});

// One Class by id // works!
router.get('/classes/:id', passportjwt, (req, res) => {
  let id = req.params.id;
  Classes.findById(id, (err, oneClass) => {
    if (err) console.log(err);
    res.send(oneClass);
  })
});

module.exports = router;