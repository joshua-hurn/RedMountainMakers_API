const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const uri = require('../mongo');

const app = express();
const PORT = 3000;

// Connect to Mongo
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true
});
// Parser
app.use(express.json());
// Routes
app.use('/api', routes);
// Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 400;
  next(err);
});
// Listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
// Connect to DB
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});