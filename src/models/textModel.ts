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
    },

    async update(id: number, content: string): Promise<Text | null> {
    const { rows } = await pool.query(
      'UPDATE texts SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );
    return rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await pool.query(
      'DELETE FROM texts WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  }
};