const express = require('express');
const router = express.Router();
const signUp = require('./signUp');
const login = require('./login');
const users = require('./users.js');
const classes = require('./classes.js');
const passport = require('passport');
// Passport config
require('../../config/passport')(passport);
// Strategies
const passportlocal = passport.authenticate('local', { session: false });
const passportjwt = passport.authenticate('jwt', { session: false });
// Routes
router.use('/', signUp);
router.use('/v1', passportlocal, login);
router.use('/v2', passportjwt, users);
router.use('/v3', passportjwt, classes);
module.exports = router;