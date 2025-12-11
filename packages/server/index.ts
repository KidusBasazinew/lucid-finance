import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cron from 'node-cron';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error';
import { investmentService } from './services/investment.service';

dotenv.config();

const app = express();
// Disable ETag so that React Query always receives a fresh body (avoid 304 without body)
app.set('etag', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cors({
      origin:
         process.env.CORS_ORIGIN ||
         'http://localhost:5173' ||
         'https://lucidfinance.vercel.app',
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

// Schedule profit processing.
// In test mode (PROFIT_TEST_MODE=true) it runs every minute.
// Otherwise it runs once per day at 00:05 UTC.
const profitTestMode = false;
const cronExpr = '5 0 * * *';

cron.schedule(
   cronExpr,
   async () => {
      try {
         await investmentService.processDailyProfits();
         console.log(
            `[CRON] Profits processed (${profitTestMode ? 'test mode' : 'daily'})`
         );
      } catch (err) {
         console.error('[CRON] Failed to process profits', err);
      }
   },
   {
      timezone: 'UTC',
   }
);

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
