# Mobile Recharge Backend API

## Folder Structure
- `config/` - Database configuration
- `models/` - Mongoose schemas (User, Plan)
- `routes/` - API route definitions
- `controllers/` - Request handling logic
- `middleware/` - Authentication & authorization
- `server.js` - Main server file

## Setup
1. Install dependencies: `npm install`
2. Create `.env` file with MongoDB URI and JWT secret
3. Start development server: `npm run dev`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Users (Protected)
- GET `/api/users` - Get all users (Admin only)
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user (Admin only)

### Plans
- GET `/api/plans` - Get all plans (Public)
- POST `/api/plans` - Create plan (Admin only)
- PUT `/api/plans/:id` - Update plan (Admin only)
- DELETE `/api/plans/:id` - Delete plan (Admin only)

## Security Features
- JWT authentication
- Password encryption with bcrypt
- Role-based authorization
- Protected routes