import { Router } from 'express';
import { getAnalytics } from '../controllers/analytics.controller';
import { authenticateApiKey } from '../utils/security';

const router = Router();
router.get('/', authenticateApiKey, getAnalytics);

export default router;