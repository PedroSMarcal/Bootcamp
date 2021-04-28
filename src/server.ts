import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());

app.use(routes)

app.listen(3338, () => {
    console.log('Server started in port 3338! ^_^')
})