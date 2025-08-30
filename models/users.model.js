import {pool} from "../dbConnection.js";

export async function insertUser({ username, email, password }) {
  const result = await pool.query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [username, email, password]
  );
  return result.rows[0]?.id;
}

export async function getUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

export async function getUserById(id) {
  const result = await pool.query(
    `SELECT id, username, email, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function getAllUsers() {
  const result = await pool.query(
    `SELECT id, username, email, created_at FROM users ORDER BY created_at DESC`
  );
  return result.rows;
}
