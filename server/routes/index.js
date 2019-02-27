const express = require('express');
const router = express.Router();
const Users = require('../../db/models').Users;
// const Classes = require('../../db/models').Classes;

// User routes // 
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
    });
});

// Create new user //
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


// Class routes // works!
// router.get('/classes', (req, res, next) => {
//     Classes.find(function (err, classes) {
//         if (err) return console.log(err);
//         res.send(classes);
//     });
// });

// // One Class by id // works!
// router.get('/classes/:id', (req, res, next) => {
//     let id = req.params.id;
//     Classes.findById(id, (err, oneClass) => {
//         if (err) console.log(err);
//         res.send(oneClass);
//     });
// });

// router.put('/classes/:id', (req, res, next) => {
//     try {
//         Classes.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: { "name": req.body.name, "day": req.body.day, "time": req.body.time } },
//             { upsert: false, returnNewDocument: true }
//         )
//         res.send('updated');
//     } catch (err) {
//         console.log(err);
//     }
// });

module.exports = router;