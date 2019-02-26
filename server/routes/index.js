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

router.get('/user/:id', (req, res, next) => {
    Users.findById()
});

// Create new user //
router.post('/user/:id', (res, res, next) => {
   let newUser = new User({ }) 
   Users.save(function (err, user) {
        if (err) console.log(err);
        console.log(`${user} saved`)
      })
});

module.exports = router;