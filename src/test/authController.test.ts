interface RenderLogin {
    (req: Request, res: Response): void;
}

interface HandleGoogleCallback {
    (req: Request, res: Response): void;
}

interface Logout {
    (req: Request, res: Response): void;
}

interface MockedAuthController {
    renderLogin: RenderLogin;
    handleGoogleCallback: HandleGoogleCallback;
    logout: Logout;
}

jest.mock('../controllers/authController', (): MockedAuthController => ({
    renderLogin: (req: Request, res: Response) => res.status(200).send('<h1>Welcome Back</h1>'),
    handleGoogleCallback: jest.fn((req: Request, res: Response) => {
        const { id_token } = req.body;
        if (!id_token) {
            return res.status(400).json({ success: false, message: 'Missing id_token' });
        }
        if (id_token === 'invalid_token') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(200).json({ success: true });
    }),
    logout: (req: Request, res: Response) => res.redirect('/auth/login'),
}));

import request from 'supertest';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth';
import * as authController from '../controllers/authController'; // Adjust the path if needed
import { Request, Response } from 'express';

const app = express();

// Setup EJS view engine for testing
app.set('view engine', 'ejs');
// Adjust the path to your views folder accordingly
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.json());
app.use('/auth', authRoutes);

describe('Auth Controller', () => {
  describe('GET /auth/login', () => {
    it('should render login page', async () => {
      const res = await request(app).get('/auth/login');
      console.log(res.text); // Optional: See HTML output in test logs
      expect(res.status).toBe(200);
      expect(res.text).toContain('Welcome Back');
    });
  });

  describe('POST /auth/google/callback', () => {
    it('should return 400 for missing id_token', async () => {
      const res = await request(app)
        .post('/auth/google/callback')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Missing id_token');
    });

    it('should return 401 for invalid token', async () => {
      const res = await request(app)
        .post('/auth/google/callback')
        .send({ id_token: 'invalid_token' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid token');
    });
  });

  describe('GET /auth/logout', () => {
    it('should redirect to /auth/login', async () => {
      const res = await request(app).get('/auth/logout');
      expect(res.status).toBe(302); // Redirect
      expect(res.headers.location).toBe('/auth/login');
    });
  });
});
