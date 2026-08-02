# TaskFlow API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![OpenAPI 3.0](https://img.shields.io/badge/OpenAPI-3.0-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white)
![Swagger UI](https://img.shields.io/badge/Swagger_UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

A RESTful Task API built with Node.js, Express.js, PostgreSQL, Supabase Authentication, JWT, Docker, and Swagger UI.

The project started as a simple Task API and was extended with PostgreSQL persistence, Docker Compose, Supabase authentication, JWT verification, reusable authentication middleware, protected routes, logout, and bearer-token authentication in Swagger UI.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Swagger UI](#swagger-ui)
- [Project Structure](#project-structure)
- [HTTP Status Codes](#http-status-codes)
- [Git and Security](#git-and-security)
- [Author](#author)

---

## Features

- Full CRUD (Create, Read, Update, Delete) operations
- RESTful API endpoints
- PostgreSQL database for persistent task storage
- SQL-based CRUD operations
- Dockerized application using Docker Compose
- Persistent PostgreSQL volume
- One-command startup with Docker Compose
- Automatic database and table creation
- Automatic seeding of three example tasks
- Data persists after server restarts
- JSON request and response handling
- Input validation with proper error handling
- User signup with Supabase Authentication
- User login with Supabase Authentication
- JWT access token authentication
- JWT token verification through Supabase
- Reusable authentication middleware
- Protected routes
- User logout
- Public and protected API endpoints
- Bearer Token authentication in Swagger UI
- Interactive API documentation using Swagger UI
- OpenAPI 3.0 specification
- Standard HTTP status codes

---

## Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **JavaScript (ES6)** – Programming language
- **PostgreSQL** – Relational database
- **pg** – PostgreSQL client for Node.js
- **Docker** – Containerization platform
- **Docker Compose** – Multi-container application management
- **Supabase Auth** – User authentication and JWT issuing
- **JWT** – Access-token based authentication
- **OpenAPI 3.0** – API specification
- **Swagger UI Express** – Interactive API documentation
- **Git / GitHub** – Version control and project hosting

---

## Prerequisites

- Docker Desktop
- Git
- A Supabase project

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jaweriawaheed19/TaskFlow-API.git
```

### 2. Navigate to the project directory

```bash
cd TaskFlow-API
```

### 3. Create the environment file

Copy `.env.example` to `.env`.

**Windows**

```cmd
copy .env.example .env
```

**Linux/macOS**

```bash
cp .env.example .env
```

### 4. Configure the environment variables

Open `.env` and provide the required values:

```env
DATABASE_URL=postgres://username:password@localhost:5432/database_name
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

The `SUPABASE_KEY` must be the Supabase **anon/public key**. The `service_role` key must never be placed in this project.

### 5. Start the application

Run the application with:

```bash
docker compose up
```

This command starts the required services and runs the API on:

```text
http://localhost:3000
```

Swagger UI is available at:

```text
http://localhost:3000/docs
```

---

## Environment Variables

The project uses environment variables for database and Supabase configuration.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL database connection |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase anon/public API key |
| `PORT` | Port used by the Express server |

The `.env` file contains the actual local configuration and is excluded from Git using `.gitignore`.

A `.env.example` file is included in the repository with placeholder values so another developer can configure their own environment without receiving the project's secrets.

---

## Database

The project uses **PostgreSQL** for persistent task storage.

The PostgreSQL database runs inside Docker and is connected to the API through the `pg` package.

When the application starts, it automatically:

- Creates the `tasks` table if it does not already exist.
- Seeds the database with example tasks if the table is empty.
- Connects to PostgreSQL using the configured database URL.

The PostgreSQL data is stored in a Docker volume, so tasks remain available after stopping and restarting the containers.

The database connection is configured through:

```env
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

### Tables

![Database Tables](screenshots/database-tables.png)

### Tasks Data

![Tasks Table](screenshots/tasks-table.png)

---

## Authentication

Authentication is handled by **Supabase Auth**.

The application does not store passwords or hash passwords itself. User credentials are sent to Supabase, which manages authentication and issues JWT access tokens.

The authentication flow is:

```text
Client
   |
   | Email + Password
   v
Supabase Auth
   |
   | JWT Access Token
   v
Client
   |
   | Authorization: Bearer <token>
   v
Express API
   |
   | Token verification
   v
Supabase
   |
   | Valid user
   v
Protected Route
```

### Authentication Features

- User signup
- User login
- Access token generation
- JWT verification
- Reusable authentication middleware
- Protected routes
- User logout
- Public routes
- Bearer authentication in Swagger UI

### Protected Routes

Protected routes use the following HTTP header:

```text
Authorization: Bearer <access_token>
```

The authentication middleware extracts the token, verifies it with Supabase, and attaches the verified user to the request.

If the token is missing or invalid, the API returns:

```json
{
  "error": "Invalid or expired token"
}
```

---

## API Endpoints

### Authentication and Protected Routes

These are the five authentication-related endpoints required by the assignment.

| Method | Endpoint | Description | Authentication |
|:------:|----------|-------------|:---------------:|
| POST | `/auth/signup` | Creates a new user account | No |
| POST | `/auth/login` | Authenticates a user and returns access and refresh tokens | No |
| POST | `/auth/logout` | Logs out the authenticated user | Yes |
| GET | `/protected/profile` | Returns the authenticated user's profile information | Yes |
| GET | `/public/info` | Returns publicly accessible information | No |

### Additional Task API Endpoints

The original Task API functionality remains available.

| Method | Endpoint | Description |
|:------:|----------|-------------|
| GET | `/` | Returns basic information about the API |
| GET | `/health` | Checks whether the server is running |
| GET | `/tasks` | Returns all tasks |
| GET | `/tasks/{id}` | Returns a task by its ID |
| POST | `/tasks` | Creates a new task |
| PUT | `/tasks/{id}` | Updates an existing task |
| DELETE | `/tasks/{id}` | Deletes a task |
| GET | `/docs` | Opens the Swagger UI documentation |

---

## Swagger UI

Interactive API documentation is available at:

```text
http://localhost:3000/docs
```

Swagger UI provides an interactive interface for the API, including a **Try it out** feature.

The protected routes are configured with bearer-token authentication using the OpenAPI security scheme.

The **Authorize** button allows an access token obtained from Supabase login to be provided once and reused when testing protected endpoints.

### Swagger UI Overview

![Swagger UI Overview](screenshots/swagger-ui-overview.png)

### Swagger Authentication

The protected routes display a lock icon when bearer authentication is configured.

After selecting **Authorize** and providing a valid JWT, protected endpoints can be tested directly from Swagger UI.

---

## Project Structure

```text
TaskFlow-API/
├── screenshots/
│   ├── database-tables.png
│   ├── tasks-table.png
│   ├── swagger-post-success.png
│   └── swagger-ui-overview.png
├── middlewares/
│   └── authMiddleware.js
├── .dockerignore
├── .env.example
├── .gitignore
├── compose.yaml
├── database.js
├── Dockerfile
├── openapi.json
├── package.json
├── package-lock.json
├── server.js
├── supabase.js
└── README.md
```

---

## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| **200 OK** | Request completed successfully |
| **201 Created** | A new resource was created successfully |
| **204 No Content** | Request completed successfully with no response body |
| **400 Bad Request** | The request contains invalid or missing data |
| **401 Unauthorized** | Authentication is required or the provided token is invalid |
| **404 Not Found** | The requested resource does not exist |

---

## Git and Security

The project uses Git for version control.

The authentication work was completed incrementally through separate stage commits, including:

```text
Stage 0: setup server and supabase client
Stage 1: signup and login routes working
Stage 2: public route and unverified protected route
Stage 3: profile route token verification
Stage 4: auth middleware and logout endpoint
Stage 5: Swagger UI documentation with bearer auth
```

The `.env` file is intentionally excluded from Git.

```text
.env
```

Only `.env.example` is committed so that other developers can see the required environment variable names without exposing actual credentials.

**Never commit Supabase keys, database passwords, or other secrets to GitHub.**

---

## Author

*Jaweria Waheed Satti*

- Student – BS Computer Science
- [LinkedIn](https://www.linkedin.com/in/jaweriasatti19)
- [Email](mailto:jaweriasatti19@gmail.com)