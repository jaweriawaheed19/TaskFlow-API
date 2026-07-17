# Task Management API

A simple RESTful Task Management API built with **Node.js** and **Express.js**, storing tasks in an in-memory array (no database required).

## Project structure

```
task-api/
├── server.js        # Entry point: creates the app, mounts routes, starts the server
├── taskRoutes.js     # All /tasks route handlers (GET, POST, PUT, DELETE)
├── taskStore.js       # In-memory "database" + helper functions for tasks
├── openapi.json      # OpenAPI 3.0 spec, served via Swagger UI at /docs
├── package.json
└── README.md
```

## Setup

```bash
npm install
npm start
```

The server starts on `http://localhost:3000` by default (override with the `PORT` env var).

Interactive Swagger docs are available at: **http://localhost:3000/docs**

## Endpoints

| Method | Path         | Description                                  |
|--------|--------------|-----------------------------------------------|
| GET    | `/`          | API info and list of available endpoints      |
| GET    | `/health`    | Health check (status, uptime, timestamp)      |
| GET    | `/docs`      | Swagger UI documentation                      |
| GET    | `/tasks`     | List all tasks                                |
| GET    | `/tasks/:id` | Get a single task by id                       |
| POST   | `/tasks`     | Create a new task (body: `{ "title": "..." }`)|
| PUT    | `/tasks/:id` | Update a task (body: `{ title?, done? }`)     |
| DELETE | `/tasks/:id` | Delete a task                                 |

## Task shape

```json
{
  "id": 1,
  "title": "Buy groceries",
  "done": false
}
```

## Example requests (curl)

```bash
# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write documentation"}'

# List all tasks
curl http://localhost:3000/tasks

# Get one task
curl http://localhost:3000/tasks/1

# Update a task
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1
```

## Error responses

- `400 Bad Request` — invalid or missing fields (e.g. empty `title`, no valid fields on update)
- `404 Not Found` — task id does not exist, in the form `{ "error": "Task <id> not found" }`

## Notes

- Data resets every time the server restarts, since everything lives in memory (`taskStore.js`).
- Task ids are auto-incrementing integers and are never reused, even after deletion.
