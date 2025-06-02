import { Router, Request, Response } from 'express';

const router = Router();

router.get('/dashboard', (req: Request, res: Response) => {
  // Use the user data from the JWT payload set by authenticateJWT middleware
  const user = req.user;
  console.log('User from JWT:', user);

  if (!user) {
    return res.redirect('/auth/login');
  }

  res.render('dashboard', { user });
});

export default router;
