import request from 'supertest';
import express from 'express';
import feedbackRoutes from '../src/routes/feedback';
import { prisma } from '../src/db';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../src/middleware/authMiddleware';

const app = express();
app.use(express.json());
app.use('/api/feedback', authenticateToken, feedbackRoutes);

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'test_secret', {
    expiresIn: '1h',
  });
};

describe('Feedback Endpoints', () => {
  let token: string;
  let testUser: any;

  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
    
    testUser = await prisma.user.create({
      data: {
        name: 'Feedback User',
        email: 'feedback@test.com',
        password: 'password123',
      },
    });

    token = generateToken(testUser.id);
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('POST /api/feedback', () => {
    it('should record feedback successfully', async () => {
      const res = await request(app)
        .post('/api/feedback')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentId: 'news-123',
          contentType: 'news',
          voteType: 'UP',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Feedback saved successfully');
      expect(res.body.feedback).toHaveProperty('voteType', 'UP');
    });

    it('Edge Case: should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/feedback')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'news',
        }); // Missing contentId and voteType

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Missing required fields (contentId, contentType, voteType)');
    });


    it('Edge Case: should fail without token', async () => {
      const res = await request(app)
        .post('/api/feedback')
        .send({
          contentId: 'news-123',
          contentType: 'news',
          voteType: 'UP',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Access denied. No token provided.');
    });
  });
});
