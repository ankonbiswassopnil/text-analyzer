import express from 'express';
import path from 'path';
import textRoutes from './routes/textRoutes'; 
import authRoutes from './routes/auth';
import WebRoutes from './routes/web'; 
import { authenticateJWT } from './middleware/authenticateJWT';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', textRoutes); 
app.use('/auth', authRoutes);
app.use('/', authenticateJWT, WebRoutes);

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set EJS as view engine
app.set('view engine', 'ejs');

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
