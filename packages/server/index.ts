import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

app.get('/api/health', (req: Request, res: Response) => {
   res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/v1', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
