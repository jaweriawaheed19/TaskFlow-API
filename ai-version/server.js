/**
 * server.js
 * ---------
 * Entry point for the Task Management API.
 * Run with: npm start
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapiSpec = require("./openapi.json");
const taskRoutes = require("./taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Serve interactive API docs (Swagger UI) at /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

// GET / - basic API info
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Task Management API",
    version: "1.0.0",
    endpoints: {
      "GET /": "API information",
      "GET /health": "Health check",
      "GET /docs": "Interactive Swagger UI documentation",
      "GET /tasks": "List all tasks",
      "GET /tasks/:id": "Get a single task by id",
      "POST /tasks": "Create a new task (body: { title })",
      "PUT /tasks/:id": "Update a task (body: { title?, done? })",
      "DELETE /tasks/:id": "Delete a task",
    },
  });
});

// GET /health - simple uptime/status check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// All /tasks endpoints live in taskRoutes.js
app.use("/tasks", taskRoutes);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Task Management API running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
