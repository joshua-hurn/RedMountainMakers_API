const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const uri = "mongodb+srv://mbanks:12345@rmm-api-0m2qy.mongodb.net/test?retryWrites=true";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongoose.connect(uri, {useNewUrlParser: true});
});
const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});