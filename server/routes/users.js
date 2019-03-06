const express = require('express');
const router = express.Router();
// Model
const Users = require('../../db/models').Users;
// Logout // works
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({message: "Logout Successful"});
});
// User routes // Works!
router.get('/users', (req, res) => {
  Users.find(function (err, users) {
    if (err) return console.log(err);
    res.send(users);
  });
});
// One User by id // works!
router.get('/users/:id', (req, res) => {
  let id = req.params.id;
  Users.findById(id, (err, user) => {
    if (err) console.log(err);
    res.send(user);
  })
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
module.exports = router;