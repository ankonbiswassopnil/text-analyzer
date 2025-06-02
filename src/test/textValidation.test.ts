import { pool } from '../../src/config/database';
import type { PoolClient } from 'pg';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../src/app';

// Use the same JWT secret your app uses (replace with your actual secret or load from env)
const JWT_SECRET = '822739985192'; // Example secret, should match your app's secret

// Generate a valid test JWT token for user with id 1
const testUserPayload = { id: 1, email: 'testuser@example.com' };
const testToken = jwt.sign(testUserPayload, JWT_SECRET, { expiresIn: '1h' });

let client: PoolClient;
let insertedId: number;

beforeEach(async () => {
  client = await pool.connect();

  // Insert with user_id = 1 so ownership matches the test JWT user
  const result = await client.query(
    `INSERT INTO texts (content, user_id) VALUES ($1, $2) RETURNING id`,
    ['This is seeded test content', 1]
  );
  insertedId = result.rows[0].id;
  console.log('Inserted ID:', insertedId);

  client.release();
});

afterEach(async () => {
  client = await pool.connect();

  await client.query('DELETE FROM texts WHERE id = $1', [insertedId]);

  client.release();
});

describe('Text Validators', () => {
  describe('validateCreateText', () => {
    it('should fail when content is missing', async () => {
      const res = await request(app)
        .post('/api/texts')
        .set('Authorization', `Bearer ${testToken}`)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: 'content' })])
      );
    });

    it('should fail when content is too short', async () => {
      const res = await request(app)
        .post('/api/texts')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ content: 'Hi' });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].msg).toBe('Content must be at least 5 characters');
    });

    it('should succeed with valid content', async () => {
      const res = await request(app)
        .post('/api/texts')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ content: 'This is valid content' });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('Successfully Created');
    });
  });

  describe('validateUpdateText', () => {
    it('should fail if id is invalid', async () => {
      const res = await request(app)
        .put('/api/texts/abc')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ content: 'Valid content' });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].path).toBe('id');
    });

    it('should fail if content is empty', async () => {
      const res = await request(app)
        .put(`/api/texts/${insertedId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send({ content: '' });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].path).toBe('content');
    });

    it('should pass with valid ID and content', async () => {
      const res = await request(app)
        .put(`/api/texts/${insertedId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send({ content: 'Updated content is fine' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('Successfully Updated');
    });
  });

  describe('validateTextIdParam', () => {
    it('should fail if id is not a number', async () => {
      const res = await request(app)
        .get('/api/texts/foo')
        .set('Authorization', `Bearer ${testToken}`);
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].path).toBe('id');
    });

    it('should fail if id is less than or equal to 0', async () => {
      const res = await request(app)
        .get('/api/texts/0')
        .set('Authorization', `Bearer ${testToken}`);
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].msg).toBe('Invalid ID');
    });

    it('should succeed with valid id', async () => {
      const res = await request(app)
        .get(`/api/texts/${insertedId}`)
        .set('Authorization', `Bearer ${testToken}`);
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.data).toBeDefined();
    });
  });
});
