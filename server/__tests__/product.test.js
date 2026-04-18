process.env.JWT_ACCESS_SECRET = 'test_access_secret';
process.env.JWT_REFRESH_SECRET = 'test_refresh_secret';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock';

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { generateAccessToken } = require('../utils/jwt');

// Mock Redis
jest.mock('../config/redis', () => ({
  get: jest.fn(),
  setEx: jest.fn(),
  connect: jest.fn()
}));

describe('Product Integration Tests', () => {
  let mongoServer;
  let adminToken;
  let categoryId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
    adminToken = generateAccessToken(admin._id);

    const category = await Category.create({ name: 'Pizza' });
    categoryId = category._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should create a new product as admin', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Margherita',
        description: 'Classic cheese and tomato',
        price: 12.99,
        category: categoryId.toString()
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Margherita');
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toBeInstanceOf(Array);
  });
});
