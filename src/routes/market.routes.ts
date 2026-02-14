import { Router } from 'express';
import { getMarketData, getPremiumMarketData } from '../controllers/market.controller';
import { authenticateApiKey, requirePremium } from '../utils/security';

const router = Router();

router.get('/:marketId', authenticateApiKey, getMarketData);
router.get('/:marketId/premium', authenticateApiKey, requirePremium, getPremiumMarketData);

export default router;