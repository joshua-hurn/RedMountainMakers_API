require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = 3000;

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true
});

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

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