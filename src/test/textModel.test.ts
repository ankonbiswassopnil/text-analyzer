import { TextModel } from '../models/textModel';
import { pool } from '../config/database';

describe('Text Model', () => {
  beforeAll(async () => {
    // Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `);

    // Create texts table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS texts (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
  });

  beforeEach(async () => {
  // Insert test user with required fields, including google_id (adjust value as needed)
  await pool.query(`
    INSERT INTO users(id, name, email, google_id)
    VALUES (1, 'Test User', 'test@example.com', 'dummy-google-id')
    ON CONFLICT (id) DO NOTHING
  `);

  await pool.query('DELETE FROM texts');
});

  afterAll(async () => {
    await pool.end();
  });

  test('should create and retrieve text', async () => {
    const created = await TextModel.create('Test content', 1);
    const found = await TextModel.findById(created.id);
    console.log('Created Text:', created);
    console.log('Found Text:', found);
    expect(found).not.toBeNull();

    if (found) {
      expect(found.content).toBe('Test content');
      expect(found.id).toBe(created.id);
      expect(found.userId).toBe(1);  // check userId as well
    }
  });

  test('should return null for non-existent id', async () => {
    const found = await TextModel.findById(99999);
    expect(found).toBeNull();
  });
});
