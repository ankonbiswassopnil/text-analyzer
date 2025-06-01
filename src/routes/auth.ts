import { Router } from 'express';
import {
  renderLogin,
  handleGoogleCallback,
  logout,
} from '../controllers/authController';

const router = Router();

router.get('/login', renderLogin);
router.post('/google/callback', handleGoogleCallback);
router.get('/logout', logout);

export default router;
