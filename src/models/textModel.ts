import { pool } from '../config/database';

export interface Text {
  id: number;
  content: string;
  userId: number;     // foreign key linking to users table
  created_at: Date;
  updated_at: Date;
}

export const TextModel = {
  async create(content: string, userId: number): Promise<Text> {
    const { rows } = await pool.query(
      `INSERT INTO texts(content, user_id) VALUES($1, $2) RETURNING *`,
      [content, userId]
    );
    return rows[0];
  },

  async findById(id: number): Promise<Text | null> {
    const { rows } = await pool.query(
      `SELECT * FROM texts WHERE id = $1`,
      [id]
    );

    if (!rows[0]) return null;

    const row = rows[0];
    return {
      id: row.id,
      content: row.content,
      userId: row.user_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  },

  async update(id: number, content: string): Promise<Text | null> {
    const { rows } = await pool.query(
      `UPDATE texts SET content = $1 WHERE id = $2 RETURNING *`,
      [content, id]
    );
    return rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await pool.query(
      `DELETE FROM texts WHERE id = $1`,
      [id]
    );
    return (rowCount ?? 0) > 0;
  }
};
