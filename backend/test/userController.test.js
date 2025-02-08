const request = require('supertest');
const { app, server } = require('../server');
const User = require('../models/User');

describe('User Controller', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    server.close();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('firstName', 'John');
      expect(res.body).toHaveProperty('lastName', 'Doe');
      expect(res.body).toHaveProperty('email', 'john.doe@example.com');
    });

    it('should not register a user with an existing email', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should return 500 if there is a server error', async () => {
      jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Server error');
      });

      const res = await request(app)
        .post('/api/users/register')
        .send({
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Server error. Please try again later.');
    });
  });
});