User API with JWT Authentication

A simple RESTful API built with Node.js and Express, featuring secure JWT-based authentication and protected user routes.

-Features

1. Create, read, update, delete (CRUD) users
2. JWT Authentication for protected routes
3. Passwords securely stored with bcryptjs
4. In-memory user storage (easy to plug into a DB later)
5. Auto-restarts via nodemon (dev script)

SECRET_KEY=your_super_secret_key_here

npm run dev # for auto-reload using nodemon
npm start # normal run

Server will run on : http://localhost:3000 (You can change the port if you want.)

-Authentication
Login to receive a JWT token

Include it in the Authorization header as:
Bearer <your_token_here>

🛠️ API Endpoints
Method Endpoint Protected Description
GET /api/users ✅ Get all users
GET /api/users/:id ✅ Get user by ID
PUT /api/users/:id ✅ Update user
DELETE /api/users/:id ✅ Delete user

All protected routes require the Authorization: Bearer <token> header.

Sample User JSON (POST /api/users)
{
"name": "Aayush",
"email": "aayush@example.com",
"password": "aayush123"
}

Tech Stack

Node.js
Express
JSON Web Token (jsonwebtoken)
Bcrypt.js for hashing
dotenv for config
Nodemon (dev only)
