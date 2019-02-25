import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {res.send('hello')});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});