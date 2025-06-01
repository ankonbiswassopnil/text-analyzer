import { Router } from 'express';
import { 
  createText,
  getText,
  updateText,
  deleteText,
  getAnalysis 
} from '../controllers/textController';

const router = Router();


router.post('/texts', createText);
router.get('/texts/:id', getText);
router.put('/texts/:id', updateText);
router.delete('/texts/:id', deleteText);
router.get('/texts/:id/analysis', getAnalysis);

export default router;