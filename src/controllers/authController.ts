import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel'; // adjust path if needed

const CLIENT_ID = '822739985192-e476qdt69554v55kjjigu3tjo1ioumb3.apps.googleusercontent.com';
const JWT_SECRET = '822739985192';
const client = new OAuth2Client(CLIENT_ID);

export const renderLogin = (req: Request, res: Response) => {
  res.render('login', { googleClientId: CLIENT_ID });
};

export const handleGoogleCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_token } = req.body;

    if (!id_token) {
      res.status(400).json({ success: false, message: 'Missing id_token' });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }

    const googleId = payload.sub!;
    const email = payload.email!;
    const name = payload.name || '';
    const picture = payload.picture || '';

    let user = await UserModel.findByGoogleId(googleId);
    if (!user) {
      user = await UserModel.create({
        google_id: googleId,
        email,
        name,
        avatar_url: picture,
      });
    }

    const tokenPayload = {
      id: user.id,
      googleId: user.google_id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, user });
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.redirect('/auth/login');
};
