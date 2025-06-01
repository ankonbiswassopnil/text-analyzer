import { Router, Request, Response } from 'express';

const router = Router();

// Placeholder dashboard route
router.get('/dashboard', (req: Request, res: Response) => {
  // In future, you’ll check req.session.user here
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    picture: 'https://via.placeholder.com/100',
  };

  res.render('dashboard', { user });
});

export default router;
