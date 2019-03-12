const express = require('express');
const router = express.Router();
const signUpRouter = require('./signUp');
const loginRouter = require('./login');
const usersRouter = require('./users');
const classesRouter = require('./classes');
const stripeRouter = require('./stripe');
const passport = require('passport');

// Passport config
require('../../config/passport')(passport);

// Strategies
const passportlocal = passport.authenticate('local', { session: false });
const passportjwt = passport.authenticate('jwt', { session: false });

// Routes
router.use('/', signUpRouter);
router.use('/stripe', stripeRouter);
router.use('/login', passportlocal, loginRouter);
router.use('/v2', passportjwt, usersRouter);
router.use('/v3', passportjwt, classesRouter);

module.exports = router;