# TaskFlow-API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![OpenAPI 3.0](https://img.shields.io/badge/OpenAPI-3.0-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white)
![Swagger UI](https://img.shields.io/badge/Swagger_UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

A RESTful Task Management API built with **Node.js** and **Express.js** that supports full CRUD (Create, Read, Update, Delete) operations on an in-memory task list. The project demonstrates REST API fundamentals, HTTP methods, status codes, request validation, and interactive API documentation using **Swagger UI**.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Example curl Request](#example-curl-request)
- [Swagger UI](#swagger-ui)
- [Project Structure](#project-structure)
- [HTTP Status Codes](#http-status-codes)
- [Author](#author)


## Features

- Full CRUD (Create, Read, Update, Delete) operations
- RESTful API endpoints
- In-memory task storage (no database)
- JSON request and response handling
- Input validation with proper error handling
- Interactive API documentation using Swagger UI
- Standard HTTP status codes (200, 201, 204, 400, 404)


## Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **Swagger UI Express** – Interactive API documentation
- **OpenAPI 3.0** – API specification
- **JavaScript (ES6)** – Programming language


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jaweriawaheed19/TaskFlow-API.git
```

### 2. Navigate to the project directory

```bash
cd TaskFlow-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

The server will start at:

```text
http://localhost:3000
```

Open Swagger UI at:

```text
http://localhost:3000/docs
```

**Repository:**  
**[TaskFlow-API](https://github.com/jaweriawaheed19/TaskFlow-API)**


## API Endpoints

| Method | Endpoint | Description | Possible Responses |
|:------:|----------|-------------|--------------------|
| GET | `/` | Returns basic information about the API | 200 OK |
| GET | `/health` | Checks whether the server is running | 200 OK |
| GET | `/tasks` | Returns all tasks | 200 OK |
| GET | `/tasks/{id}` | Returns a task by its ID | 200 OK, 404 Not Found |
| POST | `/tasks` | Creates a new task | 201 Created, 400 Bad Request |
| PUT | `/tasks/{id}` | Updates an existing task | 200 OK, 400 Bad Request, 404 Not Found |
| DELETE | `/tasks/{id}` | Deletes a task | 204 No Content, 404 Not Found |


## Example curl Request

The following command creates a new task.

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
```

Example response:

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```


## Swagger UI

Interactive API documentation is available at:

```text
http://localhost:3000/docs
```

### API Overview

The following screenshot shows all available API endpoints documented in Swagger UI.

![Swagger UI Overview](screenshots/swagger-ui-overview.png)

### Successful POST Request

The following screenshot demonstrates creating a new task using Swagger UI's **Try it out** feature.

![Successful POST Request](screenshots/swagger-post-success.png)


## Project Structure

```text
TaskFlow-API/
├── screenshots/
│   ├── swagger-ui-overview.png
│   └── swagger-post-success.png
├── openapi.json
├── package.json
├── package-lock.json
├── server.js
├── .gitignore
└── README.md
```


## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| **200 OK** | Request completed successfully |
| **201 Created** | A new task was created successfully |
| **204 No Content** | A task was deleted successfully |
| **400 Bad Request** | The request was invalid (e.g., missing title or no fields to update) |
| **404 Not Found** | The requested task does not exist |


## Author

*Jaweria Waheed Satti*

- Student – BS Computer Science  
- [LinkedIn](https://www.linkedin.com/in/jaweriasatti19)  
- [Email](mailto:jaweriasatti19@gmail.com)
