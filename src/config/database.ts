import { Pool } from 'pg';

const isTest = process.env.NODE_ENV === 'test';

export const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: isTest ? 'text_analyzer_test' : 'text_analyzer',
  password: process.env.PGPASSWORD || 'kratos040471',
  port: Number(process.env.PGPORT) || 5432,
});

// Test connection
pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Database connection error', err.stack);
  else console.log('Database connected');
});