import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined;

  // Priority: Authorization header -> cookies.token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  console.log('Token received:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '822739985192');
    req.user = decoded;
    req.user.token = token; // Store the token in the request object for later use
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
