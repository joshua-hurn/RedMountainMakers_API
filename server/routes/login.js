const express = require('express');
const router = express.Router();
const signToken = require('../../config/auth');

// Login // works
router.post('/auth', (req, res) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
});

module.exports = router;