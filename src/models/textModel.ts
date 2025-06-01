import { pool } from '../config/database';

interface Text {
  id: number;
  content: string;
  created_at: Date;
}

export const TextModel = {
  async create(content: string): Promise<Text> {
    const { rows } = await pool.query(
      'INSERT INTO texts(content) VALUES($1) RETURNING *',
      [content]
    );
    return rows[0];
  },

    async findById(id: number): Promise<Text | null> {
        const { rows } = await pool.query(
        'SELECT * FROM texts WHERE id = $1',
        [id]
        );
        return rows[0] || null;
    }
};