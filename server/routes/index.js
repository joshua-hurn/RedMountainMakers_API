const express = require('express');
const router = express.Router();
const Users = require('../../db/models').Users;
const Classes = require('../../db/models').Classes;

router.param('userID', function (req, res, next, id) {
    Users.findById(id, function (err, user) {
        if (err) {
            next(err);
        } else if (user) {
            req.user = user;
            next();
        } else {
            next(new Error('failed to load user'));
        }
    });
});

router.param('classID', function (req, res, next, id) {
    Classes.findById(id, function (err, course) {
        if (err) {
            next(err);
        } else if (course) {
            req.class = course;
            next();
        } else {
            next(new Error('failed to load class'))
        }
    });
});

// User routes // works!
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

// Create new user //
router.post('/user/:id', (res, res, next) => {
  let newUser = new User({ 
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      membershipType: req.body.membershipType,
      membershipStatus: req.body.membershipStatus
   });
  newUser.create({newUser}, function (err, user) {
      if (err) return err
      console.log(err);
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