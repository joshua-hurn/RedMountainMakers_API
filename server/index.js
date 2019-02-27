require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongoose.connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
});
const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});

db.once('open', () => {
  console.log('DB connected successfully!');
});