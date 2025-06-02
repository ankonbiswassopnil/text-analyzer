import { pool } from '../config/database';

export interface User {
  id: number;
  google_id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}

export const UserModel = {
  async findByGoogleId(googleId: string): Promise<User | null> {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE google_id = $1',
      [googleId]
    );
    return rows[0] || null;
  },

  async create(user: {
    google_id: string;
    email: string;
    name: string;
    avatar_url: string;
  }): Promise<User> {
    const { rows } = await pool.query(
      `
      INSERT INTO users (google_id, email, name, avatar_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [user.google_id, user.email, user.name, user.avatar_url]
    );
    return rows[0];
  }
};
