import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '822739985192-e476qdt69554v55kjjigu3tjo1ioumb3.apps.googleusercontent.com';
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

    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    console.log('✅ Verified user:', user);

    // TODO: Save user to DB, initialize session, etc.

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.redirect('/auth/login');
};
