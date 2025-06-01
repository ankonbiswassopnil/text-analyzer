import request from 'supertest';
import app from '../app'; 
import { pool } from '../config/database';

describe('Text Controller', () => {
  beforeAll(async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS texts (id SERIAL PRIMARY KEY, content TEXT NOT NULL)');
  });

  beforeEach(async () => {
    await pool.query('TRUNCATE texts RESTART IDENTITY CASCADE');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('App should be defined', () => {
    expect(app).toBeDefined();
  });

  test('POST /texts - should 404 until implemented', async () => {
    const response = await request(app)
      .post('/texts')
      .send({ content: 'Test content' });
    expect(response.status).toBe(404); // Expecting 404 since route doesn't exist yet
  });
});