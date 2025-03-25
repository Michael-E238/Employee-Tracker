import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';\
import { createConnection } from'mysql2/promise';

const db = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const sqlDir = path.join(__dirname, '../sql');

fs.readdirSync(sqlDir).forEach((file) => {
  const filePath = path.join(sqlDir, file);
  const sql = fs.readFileSync(filePath, 'utf8');
  db.query(sql);
});

export default db;