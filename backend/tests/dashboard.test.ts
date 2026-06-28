import request from 'supertest';
import express from 'express';
import dashboardRoutes from '../src/routes/dashboard';
import { prisma } from '../src/db';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../src/middleware/authMiddleware';

jest.mock('../src/services/coinGeckoService', () => ({
  getCoinPrices: jest.fn().mockResolvedValue([{ id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 50000, price_change_percentage_24h: 5 }]),
}));
jest.mock('../src/services/cryptoPanicService', () => ({
  getMarketNews: jest.fn().mockResolvedValue([{ title: 'Crypto is mooning', url: 'https://test.com', source: { title: 'News' }, created_at: '2026' }]),
}));
jest.mock('../src/services/llmService', () => ({
  getDailyInsight: jest.fn().mockResolvedValue('Hold onto your hats!'),
}));
jest.mock('../src/services/redditService', () => ({
  getMeme: jest.fn().mockResolvedValue({ title: 'Hodl strong', url: 'https://i.imgflip.com/1ur9b0.jpg' }),
}));

const app = express();
app.use(express.json());
app.use('/api/dashboard', authenticateToken, dashboardRoutes);

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'test_secret', {
    expiresIn: '1h',
  });
};

describe('Dashboard Endpoints', () => {
  let token: string;
  let testUser: any;

  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
    
    testUser = await prisma.user.create({
      data: {
        name: 'Dashboard User',
        email: 'dashboard@test.com',
        password: 'password123',
        assets: 'bitcoin,ethereum',
        investorType: 'hodler',
      },
    });

    token = generateToken(testUser.id);
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('GET /api/dashboard', () => {
    it('should return dashboard data for authenticated user', async () => {
      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('prices');
      expect(res.body).toHaveProperty('news');
      expect(res.body).toHaveProperty('insight');
    }, 15000); // Allow longer timeout for external API calls

    it('Edge Case: should return 401 without token', async () => {
      const res = await request(app).get('/api/dashboard');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Access denied. No token provided.');
    });
    
    it('Edge Case: should return 403 with invalid token', async () => {
      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', 'Bearer invalid_token_here');
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error', 'Invalid or expired token.');
    });
  });
});
