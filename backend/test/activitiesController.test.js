const request = require('supertest');
const { app, server } = require('../server');
const Activity = require('../models/Activity');

describe('Activities Controller', () => {
  beforeAll(async () => {
    await Activity.deleteMany({});
  });

  afterAll(async () => {
    await Activity.deleteMany({});
    server.close();
  });

  describe('POST /api/activities', () => {
    it('should add a new activity', async () => {
      const res = await request(app)
        .post('/api/activities')
        .send({
          name: 'Hiking',
          description: 'A fun outdoor activity',
          locationCity: 'Riyadh',
          type: ['Adventure'],
          pictureUrl: 'http://example.com/picture.jpg'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Activity added successfully');
      expect(res.body.activity).toHaveProperty('name', 'Hiking');
    });

    it('should return 400 if activity data is invalid', async () => {
      const res = await request(app)
        .post('/api/activities')
        .send({
          name: '',
          description: 'A fun outdoor activity',
          locationCity: 'Riyadh',
          type: ['Adventure'],
          pictureUrl: 'http://example.com/picture.jpg'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/activities/:id', () => {
    it('should update an existing activity', async () => {
      const activity = new Activity({
        name: 'Hiking',
        description: 'A fun outdoor activity',
        locationCity: 'Riyadh',
        type: ['Adventure'],
        pictureUrl: 'http://example.com/picture.jpg'
      });
      await activity.save();

      const res = await request(app)
        .put(`/api/activities/${activity._id}`)
        .send({
          name: 'Mountain Hiking',
          description: 'A fun and challenging outdoor activity',
          locationCity: 'Riyadh',
          type: ['Adventure'],
          pictureUrl: 'http://example.com/picture.jpg'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Activity updated successfully');
      expect(res.body.activity).toHaveProperty('name', 'Mountain Hiking');
    });

    it('should return 404 if activity not found', async () => {
      const res = await request(app)
        .put('/api/activities/60c72b2f9b1d8b3a2c8e4d2e')
        .send({
          name: 'Mountain Hiking',
          description: 'A fun and challenging outdoor activity',
          locationCity: 'Riyadh',
          type: ['Adventure'],
          pictureUrl: 'http://example.com/picture.jpg'
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Activity not found');
    });
  });

  describe('DELETE /api/activities/:id', () => {
    it('should delete an existing activity', async () => {
      const activity = new Activity({
        name: 'Hiking',
        description: 'A fun outdoor activity',
        locationCity: 'Riyadh',
        type: ['Adventure'],
        pictureUrl: 'http://example.com/picture.jpg'
      });
      await activity.save();

      const res = await request(app).delete(`/api/activities/${activity._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Activity deleted successfully');
    });

    it('should return 404 if activity not found', async () => {
      const res = await request(app).delete('/api/activities/60c72b2f9b1d8b3a2c8e4d2e');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Activity not found');
    });
  });

  describe('GET /api/activities', () => {
    it('should get an activity by name', async () => {
      const activity = new Activity({
        name: 'Hiking',
        description: 'A fun outdoor activity',
        locationCity: 'Riyadh',
        type: ['Adventure'],
        pictureUrl: 'http://example.com/picture.jpg'
      });
      await activity.save();

      const res = await request(app).get('/api/activities').query({ name: 'Hiking' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Hiking');
    });

    it('should return 404 if activity not found', async () => {
      const res = await request(app).get('/api/activities').query({ name: 'Nonexistent' });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Activity not found');
    });
  });
});