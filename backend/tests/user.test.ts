import request from 'supertest';
import express from 'express';
import userRoutes from '../src/routes/user';
import { prisma } from '../src/db';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../src/middleware/authMiddleware';

const app = express();
app.use(express.json());
app.use('/api/user', authenticateToken, userRoutes);

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'test_secret', {
    expiresIn: '1h',
  });
};

describe('User Endpoints', () => {
  let token: string;
  let testUser: any;

  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
    
    testUser = await prisma.user.create({
      data: {
        name: 'User Endpoint Test',
        email: 'user_endpoint@test.com',
        password: 'password123',
      },
    });

    token = generateToken(testUser.id);
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('PUT /api/user/preferences', () => {
    it('should update user onboarding preferences successfully', async () => {
      const res = await request(app)
        .put('/api/user/preferences')
        .set('Authorization', `Bearer ${token}`)
        .send({
          assets: 'bitcoin,solana',
          investorType: 'trader',
          contentPrefs: 'technical',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Preferences updated successfully');
      expect(res.body.user).toHaveProperty('assets', 'bitcoin,solana');
      expect(res.body.user).toHaveProperty('investorType', 'trader');
    });


    it('Edge Case: should fail without token', async () => {
      const res = await request(app)
        .put('/api/user/preferences')
        .send({
          assets: 'bitcoin',
          investorType: 'hodler',
          contentPrefs: 'news',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Access denied. No token provided.');
    });
  });
});
