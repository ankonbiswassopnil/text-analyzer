import express from 'express';
import bodyParser from 'body-parser';
import textRoutes from './routes/textRoutes'; 

const app = express();
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', textRoutes); 

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;