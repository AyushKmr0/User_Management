import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(
    cors(
        {
            origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true
        }
    )
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (_req, res) => res.json({ status: 'ok', service: 'mern-usermanager' }));
app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
