# Express Authentication API

A RESTful API built with Express.js for user authentication and management, using MySQL as the database.

## Features

- User registration and authentication
- JWT-based authorization
- Password hashing with bcrypt
- MySQL database integration
- Request validation
- Error handling
- Docker support for MySQL database
- Comprehensive unit tests with Vitest

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Docker and Docker Compose (for running MySQL)
- MySQL

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd orthoplex_challenge
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=strong-password
DB_NAME=challenge
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
```

4. Start MySQL using Docker:
```bash
docker-compose up -d
```

5. Run database migrations:
Execute the SQL script in `migrations/user.table.sql`

6. Run tests:
```bash
pnpm test
```

7. Start the server:
```bash
 #in development mode
    `pnpm start:dev`
#in production mode 
    `pnpm start:prod`
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### User Management
- `GET /user/:userId` - Get user by ID
- `GET /user` - Get all users
- `POST /user` - Create new user
- `PUT /user/:userId` - Update user
- `DELETE /user/:userId` - Delete user

## Project Structure

```
├── config/             # Configuration files
├── controllers/        # Route controllers
├── middleware/         # Express middlewares
├── models/            # Database models
├── routes/            # Route definitions
├── services/          # Business logic
├── utils/             # Utility functions
└── migrations/        # Database migrations
```

## Technologies

- Express.js - Web framework
- MySQL2 - Database driver
- JSON Web Token - Authentication
- bcrypt - Password hashing
- express-validator - Request validation
- Docker - Container platform

## Error Handling

The API uses a centralized error handling mechanism. All errors are processed through the `error.handler` middleware.

## Validation

Request validation is implemented using express-validator. Validation schemas are defined in the `utils/validators` directory.

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Input validation for all requests
- Parameterized SQL queries to prevent injection

