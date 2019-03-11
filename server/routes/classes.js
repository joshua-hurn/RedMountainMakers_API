const express = require('express');
const router = express.Router();
// Model
const Classes = require('../../db/models').Classes;
// Class routes // works!
router.get('/classes', (req, res) => {
  Classes.find(function (err, classes) {
    if (err) return console.log(err);
    res.send(classes);
  });
});

// One Class by id // works!
router.get('/classes/:id', (req, res) => {
  let id = req.params.id;
  Classes.findById(id, (err, oneClass) => {
    if (err) console.log(err);
    res.send(oneClass);
  })
});

// Create new Class // works!
router.post('/classes', (req, res) => {
  let newClass = Classes({
    name: req.body.name,
    instructor: req.body.instructor,
    day: req.body.day,
    time: req.body.time
  });
  newClass.save(function (err) {
    if (err) return err
    res.send("Class Created");
  });
});

// Update Class // Works!
router.put('/classes/:id', (req, res, next) => {
  Classes.findOneAndUpdate({ _id: { $eq: req.params.id } }, { $set: req.body },
    (err) => {
      if (err) return next(err);
      res.send('Class updated.');
    });
});

// Delete Class // Works!
router.delete('/classes/:id', (req, res, next) => {
  Classess.findOneAndDelete({ _id: { $eq: req.params.id } },
    (err) => {
      if (err) return next(err);
      res.send('Class Deleted.');
    });
});
module.exports = router;