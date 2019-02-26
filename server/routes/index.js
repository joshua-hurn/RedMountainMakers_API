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

// User routes
router.get('/users', (req, res, next) => {
    Users.find({}).exec((err, users) => {
      if (err) return next(err);
      console.log(users);
    });
  });

module.exports = router;