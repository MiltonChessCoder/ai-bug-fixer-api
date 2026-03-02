# User Management REST API

A RESTful User Management API built with Node.js and Express.

This project demonstrates backend architecture best practices including:
- Route-controller separation
- Middleware authentication
- Environment configuration
- Input validation
- Filtering, sorting, and pagination
- File-based persistence

---

## 🚀 Tech Stack

- Node.js
- Express
- dotenv
- fs module (File System)

---

## 📦 Installation

1. Clone the repository
2. Install dependencies:    npm install
3. Create a `.env` file in the project root:    ADMIN_USERNAME=admin    ADMIN_PASSWORD=password123
4. Start the server: node server.js
    Server runs on: http://localhost:3000



## 🔐 Authentication

Protected routes require Basic Authentication.

Example credentials:

Username:admnin Password:password123

Use Postman → Authorization → Basic Auth.

---

## 📌 API Endpoints

### Public Routes

- GET /users  
- GET /users/:id  

Optional Query Parameters:

- `name` → filter by name  
- `page` → pagination page number  
- `limit` → number of records per page  
- `sortBy` → id | name  
- `order` → asc | desc  

Example: GET /users?page=1&limit=2&sortBy=name&order=desc



### Protected Routes (Require Authentication)

- POST /users  
- PUT /users/:id  
- DELETE /users/:id  

---

## 📄 Example Request

POST /users

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}

// additional features on deployment




