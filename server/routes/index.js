const express = require('express');
const router = express.Router();
const Users = require('../../db/models').Users;
// const Classes = require('../../db/models').Classes;

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
    console.log("success");
  });
});

// Update User //
router.put('/users/:id', (req, res, next) => {
  Users.findOneAndUpdate({_id: {$eq: req.params.id}}, {$set: req.body}, 
    (err, user) => {
      if (err) return next(err);
      res.send('User updated.');
    });
});

module.exports = router;