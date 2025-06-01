import { pool } from '../../src/config/database';
import type { PoolClient } from 'pg';
import request from 'supertest';
import app from '../../src/app';

let client: PoolClient;
let insertedId: number;

beforeEach(async () => {
  client = await pool.connect();

  const result = await client.query(
    `INSERT INTO texts (content) VALUES ($1) RETURNING id`,
    ['This is seeded test content']
  );
  insertedId = result.rows[0].id;

  await client.query('COMMIT');
  await client.query('BEGIN');
});

afterEach(async () => {
  await client.query('ROLLBACK');
  client.release();
});

describe('Text Validators', () => {
  describe('validateCreateText', () => {
    it('should fail when content is missing', async () => {
      const res = await request(app).post('/api/texts').send({});
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors).toContainEqual(expect.objectContaining({ path: 'content' }));
    });

    it('should fail when content is too short', async () => {
      const res = await request(app).post('/api/texts').send({ content: 'Hi' });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].msg).toBe('Content must be at least 5 characters');
    });

    it('should succeed with valid content', async () => {
      const res = await request(app).post('/api/texts').send({ content: 'This is valid content' });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('Successfully Created');
    });
  });

  describe('validateUpdateText', () => {
    it('should fail if id is invalid', async () => {
      const res = await request(app).put('/api/texts/abc').send({ content: 'Valid content' });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].path).toBe('id');
    });

    it('should fail if content is empty', async () => {
      const res = await request(app).put(`/api/texts/${insertedId}`).send({ content: '' });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].path).toBe('content');
    });

    it('should pass with valid ID and content', async () => {
      const res = await request(app).put(`/api/texts/${insertedId}`).send({ content: 'Updated content is fine' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('Successfully Updated');
    });
  });

  describe('validateTextIdParam', () => {
    it('should fail if id is not a number', async () => {
      const res = await request(app).get('/api/texts/foo');
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].path).toBe('id');
    });

    it('should fail if id is less than or equal to 0', async () => {
      const res = await request(app).get('/api/texts/0');
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.errors[0].msg).toBe('Invalid ID');
    });

    it('should succeed with valid id', async () => {
      const res = await request(app).get(`/api/texts/${insertedId}`);
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.data).toBeDefined();
    });
  });
});
