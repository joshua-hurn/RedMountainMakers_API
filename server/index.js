import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import uri from '../db/config';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongoose.connect(uri, {useNewUrlParser: true});
});