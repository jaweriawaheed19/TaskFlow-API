/**
 * taskRoutes.js
 * -------------
 * All the /tasks endpoints, kept in their own router so server.js
 * stays short and readable.
 */

const express = require("express");
const taskStore = require("./taskStore");

const router = express.Router();

/**
 * Small helper: turns a route param like ":id" into a number and
 * tells us whether it was actually a valid integer.
 */
function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) ? id : null;
}

// GET /tasks - return every task
router.get("/", (req, res) => {
  res.status(200).json(taskStore.getAllTasks());
});

// GET /tasks/:id - return a single task
router.get("/:id", (req, res) => {
  const id = parseId(req.params.id);
  const task = id !== null ? taskStore.getTaskById(id) : null;

  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  res.status(200).json(task);
});

// POST /tasks - create a new task
router.post("/", (req, res) => {
  const { title } = req.body || {};

  const isValidTitle = typeof title === "string" && title.trim().length > 0;
  if (!isValidTitle) {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string" });
  }

  const newTask = taskStore.createTask(title.trim());
  res.status(201).json(newTask);
});

// PUT /tasks/:id - update an existing task
router.put("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null || !taskStore.getTaskById(id)) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  const { title, done } = req.body || {};
  const updates = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "If provided, title must be a non-empty string" });
    }
    updates.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({ error: "If provided, done must be a boolean" });
    }
    updates.done = done;
  }

  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ error: "Provide at least one valid field to update: title, done" });
  }

  const updatedTask = taskStore.updateTask(id, updates);
  res.status(200).json(updatedTask);
});

// DELETE /tasks/:id - remove a task
router.delete("/:id", (req, res) => {
  const id = parseId(req.params.id);
  const wasDeleted = id !== null && taskStore.deleteTask(id);

  if (!wasDeleted) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  res.status(204).send();
});

module.exports = router;
