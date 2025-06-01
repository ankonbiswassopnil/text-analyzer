import { TextModel } from '../models/textModel';
import { pool } from '../config/database';

describe('Text Model', () => {
  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    await pool.query('DELETE FROM texts');
  });

  test('should create and retrieve text', async () => {
    const created = await TextModel.create('Test content');
    const found = await TextModel.findById(created.id);
    
    expect(found).not.toBeNull();
    
    if (found) {
      expect(found.content).toBe('Test content');
      expect(found.id).toBe(created.id);
    }
  });

  test('should return null for non-existent id', async () => {
    const found = await TextModel.findById(99999);
    expect(found).toBeNull();
  });
});