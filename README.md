# Task Management CRUD API

A simple REST API for managing tasks with SQLite database, built with Express.js.

## Quick Start (2 minutes)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd CRUD-API-with-DB

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

**That's it!** The server runs on `http://localhost:3000`

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs

## API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/` | Welcome message | - |
| GET | `/api` | API info | - |
| GET | `/health` | Health check | - |
| GET | `/tasks` | Get all tasks | - |
| GET | `/tasks/:id` | Get task by ID | - |
| POST | `/tasks` | Create a task | `{ "title": "string", "done": boolean }` |
| PUT | `/tasks/:id` | Update a task | `{ "title": "string", "done": boolean }` |
| DELETE | `/tasks/:id` | Delete a task | - |

## Examples with cURL

**Create a task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "done": false}'
```

**Get all tasks:**
```bash
curl http://localhost:3000/tasks
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Project Structure

```
.
├── databse_crud.js    # Express server with CRUD logic
├── package.json       # Dependencies and scripts
├── swagger.json       # OpenAPI 3.0 documentation
├── tasks.db          # SQLite database (auto-created)
└── README.md
```

## License

ISC
