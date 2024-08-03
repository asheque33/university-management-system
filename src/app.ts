import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

// test route
const test = (_req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
};
app.get('/', test);

// error handling middleware
app.use(globalErrorHandler);
// not found middleware
app.use(notFound);

export default app;
