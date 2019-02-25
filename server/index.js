import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import mongoose from 'mongoose';
import uri from '../db/config';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {res.send('hello')});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongoose.connect(uri, {useNewUrlParser: true});
});