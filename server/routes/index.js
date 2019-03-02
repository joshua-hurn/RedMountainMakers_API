const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Models
const Users = require('../../db/models').Users;
const Classes = require('../../db/models').Classes;

// Login Page
router.get('/login', (req, res) => {
  res.send('login');
});

// Register Page
router.get('/register', (req, res) => {
  res.send('register');
});

// Register
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
            // newUser.salt = salt;
            newUser
              .save()
              .then(user => {
                res.redirect('/api/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// // Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

// User routes // Works!
router.get('/users', (req, res, next) => {
  Users.find(function (err, users) {
    if (err) return console.log(err);
    res.send(users);
  });
});

// One User by id // works!
router.get('/users/:id', (req, res, next) => {
  let id = req.params.id;
  Users.findById(id, (err, user) => {
    if (err) console.log(err);
    res.send(user);
  })
});

// Create new user // works!
router.post('/users', (req, res, next) => {
  let newUser = Users({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    membershipType: req.body.membershipType,
    membershipStatus: req.body.membershipStatus
  });
  newUser.save(function (err) {
    if (err) return err
    res.send("User Created");
  });
});

// Update User // Works!
router.put('/users/:id', (req, res, next) => {
  Users.findOneAndUpdate({ _id: { $eq: req.params.id } }, { $set: req.body },
    (err) => {
      if (err) return next(err);
      res.send('User updated.');
    });
});

// Delete User // Works!
router.delete('/users/:id', (req, res, next) => {
  Users.findOneAndDelete({ _id: { $eq: req.params.id } },
    (err) => {
      if (err) return next(err);
      res.send('User Deleted.');
    });
});

// Class routes // works!
router.get('/classes', (req, res, next) => {
  Classes.find(function (err, classes) {
    if (err) return console.log(err);
    res.send(classes);
  });
});

// One Class by id // works!
router.get('/classes/:id', (req, res, next) => {
  let id = req.params.id;
  Classes.findById(id, (err, oneClass) => {
    if (err) console.log(err);
    res.send(oneClass);
  })
});

module.exports = router;