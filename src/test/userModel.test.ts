import { pool } from '../config/database';
import { UserModel } from '../models/userModel';

describe('UserModel', () => {
  const testUser = {
    google_id: 'test_google_id_123',
    email: 'test@example.com',
    name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
  };

  // Clean up before tests to avoid duplicates
  beforeAll(async () => {
    await pool.query('DELETE FROM users WHERE google_id = $1 OR email = $2', [testUser.google_id, testUser.email]);
  });

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE google_id = $1 OR email = $2', [testUser.google_id, testUser.email]);
    await pool.end();
  });

  it('should create a new user', async () => {
    const createdUser = await UserModel.create(testUser);
    expect(createdUser).toHaveProperty('id');
    expect(createdUser.google_id).toBe(testUser.google_id);
    expect(createdUser.email).toBe(testUser.email);
    expect(createdUser.name).toBe(testUser.name);
    expect(createdUser.avatar_url).toBe(testUser.avatar_url);
  });

  it('should find user by google_id', async () => {
    const user = await UserModel.findByGoogleId(testUser.google_id);
    expect(user).not.toBeNull();
    expect(user!.google_id).toBe(testUser.google_id);
    expect(user!.email).toBe(testUser.email);
  });

  it('should return null for non-existent google_id', async () => {
    const user = await UserModel.findByGoogleId('non_existent_id');
    expect(user).toBeNull();
  });
});
