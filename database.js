const Database = require("better-sqlite3");

const db = new Database("tasks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    done INTEGER
  )
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO tasks (title, done)
    VALUES (?, ?)
  `);

  insert.run("Learn Express", 0);
  insert.run("Build Task API", 0);
  insert.run("Test API Endpoints", 1);
}

module.exports = db;