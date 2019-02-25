import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import uri from '../db/config';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongoose.connect(uri, {useNewUrlParser: true});
});