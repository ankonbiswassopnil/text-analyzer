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
});