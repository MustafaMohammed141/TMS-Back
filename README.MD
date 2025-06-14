# 📝 Project Documentation

## 🛠️ Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** (via Mongoose)
- **JWT (JSON Web Token)** for authentication
- **Vercel** for deployment
- **CORS** and **dotenv** for environment and security configs

## 📁 API Routes

### 🔐 Auth
- `POST /auth/signup`  
  → Register a new user  
- `GET /auth/login`  
  → Log in a user

### 👤 Users (Protected by JWT)
- `GET /users/:userId`  
  → Get a single user by ID  
- `PUT /users/:userId`  
  → Update user info  
- `DELETE /users/:userId`  
  → Delete a user

### ✅ Tasks (Protected by JWT)
- `GET /tasks/:userId/`  
  → Fetch all tasks for a user  
- `POST /tasks/:userId/`  
  → Add a new task for a user  
- `GET /tasks/:userId/:taskId`  
  → Get a task by ID  
- `PUT /tasks/:userId/:taskId`  
  → Update a task  
- `DELETE /tasks/:userId/:taskId`  
  → Delete a task

## 🔒 Middleware
- `CheckSign.js`: Verifies JWT tokens for protected routes.