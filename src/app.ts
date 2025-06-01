import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(bodyParser.json());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
