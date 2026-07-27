require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN DEFAULT FALSE
    )
  `);

  const result = await pool.query(
    "SELECT COUNT(*) AS count FROM tasks"
  );

  if (Number(result.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO tasks (title, done)
      VALUES
      ('Learn Express', false),
      ('Build Task API', false),
      ('Test API Endpoints', true)
    `);
  }
}

module.exports = {
  pool,
  initializeDatabase,
};