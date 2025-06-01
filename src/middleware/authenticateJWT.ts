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
  const token = req.cookies.token;
  console.log('Token from cookies:', token);

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, '822739985192');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
    return;
  }
};
