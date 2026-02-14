import request from 'supertest';
import express from 'express';
import marketRoutes from './routes/market.routes';
import * as injectiveService from './services/injective.service';
import * as securityUtils from './utils/security';

// MOCKING SERVICES
jest.mock('./services/injective.service');
jest.mock('./utils/security');

const app = express();
app.use(express.json());
app.use('/api/v1/market', marketRoutes);

describe('Ninja Alpha Feed API Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/market/:marketId (Public)', () => {
    it('should return 401 if no API KEY is provided', async () => {
      (securityUtils.authenticateApiKey as jest.Mock).mockImplementation((req, res, next) => {
        res.status(401).json({ error: "Unathorized" });
      });

      const res = await request(app).get('/api/v1/market/eth');
      expect(res.status).toBe(401);
    });

    it('should return 200 and mocked data if authorized', async () => {
      (securityUtils.authenticateApiKey as jest.Mock).mockImplementation((req, res, next) => next());
  
      (injectiveService.getMockMarketData as jest.Mock).mockReturnValue({
        marketId: 'eth',
        lastPrice: '100',
        volume24h: '1000',
        highVolatility: false
      });

      const res = await request(app)
        .get('/api/v1/market/eth')
        .set('X-API-KEY', 'kunai-secret-key-123');
        
      expect(res.status).toBe(200);
      expect(res.body.lastPrice).toBe('100');
    });
  });

  // PREMIUM TEST (NFT) 
  describe('GET /api/v1/market/:marketId/premium (Premium)', () => {
    
    it('should return 403 if address does not own NFT', async () => {
      (securityUtils.authenticateApiKey as jest.Mock).mockImplementation((req, res, next) => next());
      (securityUtils.requirePremium as jest.Mock).mockImplementation((req, res, next) => {
        res.status(403).json({ error: "Access Denied" });
      });

      const res = await request(app)
        .get('/api/v1/market/eth/premium?address=inj1notowner')
        .set('X-API-KEY', 'kunai-secret-key-123');
      expect(res.status).toBe(403);
    });

    it('should return 200 and premium mocked data if owner', async () => {
      (securityUtils.authenticateApiKey as jest.Mock).mockImplementation((req, res, next) => next());
      (securityUtils.requirePremium as jest.Mock).mockImplementation((req, res, next) => next());
      
      (injectiveService.getMockMarketData as jest.Mock).mockReturnValue({
        marketId: 'eth',
        lastPrice: '100',
        volume24h: '1000',
        highVolatility: false
      });

      const res = await request(app)
        .get('/api/v1/market/eth/premium?address=inj1abc_owner') //'/api/v1/market/eth/premium?address=inj1abc_owner'
        .set('X-API-KEY', 'kunai-secret-key-123');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('signal');
      expect(res.body).toHaveProperty('sentiment');
    });
  });
});