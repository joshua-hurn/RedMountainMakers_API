// require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const uri = "mongodb+srv://mbanks:12345@rmm-api-0m2qy.mongodb.net/test?retryWrites=true"

const app = express();
const PORT = 3000;

// Passport config
require('../config/passport')(passport);
// Connect to Mongo
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true
});
// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});

db.once('open', () => {
  console.log('DB connected successfully!');
});