const express = require('express');
const router = express.Router();
const Users = require('./model').Users;

router.param('user', function(req, res, next, id) {

    // try to get the user details from the User model and attach it to the request object
    User.find(id, function(err, user) {
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