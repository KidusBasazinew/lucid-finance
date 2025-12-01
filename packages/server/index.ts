import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error';

dotenv.config();

const app = express();
// Disable ETag so that React Query always receives a fresh body (avoid 304 without body)
app.set('etag', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Range'], // add Range for video streaming
      exposedHeaders: ['Content-Range', 'Accept-Ranges'], // expose streaming headers
   })
);

// Force no caching of API responses to ensure bodies are returned even if unchanged
app.use((req, res, next) => {
   res.setHeader('Cache-Control', 'no-store');
   next();
});
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
