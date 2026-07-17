/**
 * taskStore.js
 * ------------
 * A tiny in-memory "database" for tasks.
 * Data lives only in this array, so it resets whenever the server restarts.
 */

let tasks = [
  { id: 1, title: "Learn Express.js", done: false },
  { id: 2, title: "Build a REST API", done: false },
];

// Keeps track of the next id to hand out, so ids never collide even
// after tasks are deleted.
let nextId = 3;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(title) {
  const newTask = {
    id: nextId++,
    title,
    done: false,
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.done !== undefined) task.done = updates.done;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
