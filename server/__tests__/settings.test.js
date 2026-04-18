process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

// Mock Redis
jest.mock('../config/redis', () => ({
  get: jest.fn(),
  setEx: jest.fn(),
  connect: jest.fn()
}));

describe('Settings Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should get default settings', async () => {
    const res = await request(app).get('/api/v1/settings');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('restaurantName', 'FastFeast');
  });
});
