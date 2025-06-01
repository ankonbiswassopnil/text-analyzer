import { Router } from 'express';
import {
  createText,
  getText,
  updateText,
  deleteText,
  getAnalysis,
} from '../controllers/textController';

import {
  validateCreateText,
  validateUpdateText,
  validateTextIdParam,
} from '../validators/textValidators';

import { validateRequest } from '../middleware/validateRequest';

// Match the controller's type definitions
interface TextParams {
  id: string;
}

interface TextBody {
  content: string;
}

const router = Router();

router.post<{}, any, TextBody>(
  '/texts',
  validateCreateText,
  validateRequest,
  createText
);

router.get<{ id: string }>(
  '/texts/:id',
  validateTextIdParam,
  validateRequest,
  getText
);

router.put<{ id: string }, any, { content: string }>(
  '/texts/:id',
  validateUpdateText,
  validateRequest,
  updateText
);

router.delete<{ id: string }>(
  '/texts/:id',
  validateTextIdParam,
  validateRequest,
  deleteText
);

router.get<{ id: string }>(
  '/texts/:id/analysis',
  validateTextIdParam,
  validateRequest,
  getAnalysis
);

export default router;
