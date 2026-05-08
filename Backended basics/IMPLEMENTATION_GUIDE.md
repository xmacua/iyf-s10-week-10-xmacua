# CommunityHub API - Implementation Guide

## 📚 Overview

This is a complete, production-ready REST API built with Node.js and Express.js following enterprise best practices. It implements all lessons from Week 10 Backend Basics course (Lessons 19-20).

## ✅ What's Implemented

### Lesson 19 Tasks
- ✅ **Task 19.1: Node.js Basics** - Project initialization with npm and git
- ✅ **Task 19.2: Express Setup** - Server with basic routing and middleware
- ✅ **Task 19.3: Request & Response** - Route parameters, query strings, various response methods
- ✅ **Task 19.4: Building Posts API** - Full CRUD API with in-memory storage

### Lesson 20 Tasks
- ✅ **Task 20.1: Middleware** - Logger middleware, request tracking
- ✅ **Task 20.2: Error Handling** - Custom error handling, validation middleware
- ✅ **Task 20.3: Organizing Code** - Modular structure with routes, controllers, middleware
- ✅ **Task 20.4: Environment Variables** - .env configuration setup

### Features Implemented
- ✅ **CRUD Operations** - Create, Read, Update, Delete posts
- ✅ **Filtering** - Filter posts by author
- ✅ **Search** - Full-text search in titles and content
- ✅ **Sorting** - Sort by newest, oldest, or most popular
- ✅ **Pagination** - Paginate through large result sets
- ✅ **Like/Unlike** - Interactive like functionality with counters
- ✅ **Validation** - Request validation with meaningful error messages
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Logging** - Request logging with response times
- ✅ **Documentation** - Comprehensive API documentation

## 📂 Project Structure

```
communityhub-api/
├── src/
│   ├── routes/
│   │   ├── index.js           # Main route aggregator
│   │   └── posts.js           # Posts routes
│   ├── middleware/
│   │   ├── logger.js          # Request logging
│   │   ├── errorHandler.js    # Error handling & custom errors
│   │   └── validate.js        # Request validation
│   ├── controllers/
│   │   └── postsController.js # Business logic for posts
│   ├── data/
│   │   └── store.js           # In-memory data store
│   └── app.js                 # Express app configuration
├── server.js                  # Application entry point
├── package.json               # Project metadata & dependencies
├── .env                       # Environment configuration
├── .env.example              # Example environment file
├── .gitignore                # Git ignore rules
├── README.md                 # Full API documentation
├── QUICK_REFERENCE.md        # Quick reference guide
├── IMPLEMENTATION_GUIDE.md   # This file
└── PostmanCollection.json    # Postman import file
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

This installs:
- **express** - Web framework for Node.js
- **dotenv** - Environment variable loader

### 2. Start Server
```bash
npm start
```

Output:
```
🚀 CommunityHub API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Running on http://localhost:3000
🔧 Environment: development
📝 Try GET http://localhost:3000 for API documentation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Test the API
Visit `http://localhost:3000` to see API documentation, or use the provided Postman collection.

## 🔧 Key Implementation Details

### File: server.js
**Purpose:** Application entry point

```javascript
require('dotenv').config();  // Load environment variables
const app = require('./src/app');  // Get Express app
const PORT = process.env.PORT || 3000;  // Use env PORT or default

app.listen(PORT, () => { ... });  // Start server
```

### File: src/app.js
**Purpose:** Express application setup

```javascript
// Middleware stack:
app.use(express.json());        // Parse JSON bodies
app.use(logger);               // Log all requests
app.use('/', routes);          // Mount routes
app.use(errorHandler);         // Handle errors (MUST BE LAST!)
```

### File: src/controllers/postsController.js
**Purpose:** Business logic for posts operations

All CRUD operations:
- `getAllPosts()` - Get with filtering, searching, sorting, pagination
- `getPostById()` - Fetch single post by ID
- `createPost()` - Create new post (validated)
- `updatePost()` - Update post fields
- `deletePost()` - Remove post
- `likePost()` - Increment likes
- `unlikePost()` - Decrement likes

### File: src/middleware/validate.js
**Purpose:** Request validation

Validates POST and PUT requests:
- Title: minimum 3 characters
- Content: minimum 10 characters
- Author: minimum 2 characters

### File: src/middleware/errorHandler.js
**Purpose:** Error handling and custom errors

Features:
- `ApiError` class for structured error handling
- `errorHandler` middleware for consistent error responses
- `asyncHandler` wrapper for async route handlers

### File: src/data/store.js
**Purpose:** In-memory data storage

Contains:
- `posts` array with initial sample data
- `nextId` counter for generating new post IDs

## 📡 API Endpoints Reference

### Posts Collection

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/api/posts` | Get all posts (with filters) | 200 |
| GET | `/api/posts/:id` | Get single post | 200/404 |
| POST | `/api/posts` | Create new post | 201/400 |
| PUT | `/api/posts/:id` | Update post | 200/404 |
| DELETE | `/api/posts/:id` | Delete post | 204/404 |
| PATCH | `/api/posts/:id/like` | Like post | 200/404 |
| PATCH | `/api/posts/:id/unlike` | Unlike post | 200/404 |

### Query Parameters for GET /api/posts

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| author | string | Filter by author name | `?author=john` |
| search | string | Search title/content | `?search=node` |
| sort | string | Sort: newest/oldest/popular | `?sort=newest` |
| page | number | Page number (default: 1) | `?page=2` |
| limit | number | Items per page (default: 10) | `?limit=5` |

## 🧪 Testing Examples

### Get all posts
```bash
curl http://localhost:3000/api/posts
```

### Create a post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learning Express",
    "content": "Express is an amazing web framework for Node.js",
    "author": "John Developer"
  }'
```

### Search posts
```bash
curl "http://localhost:3000/api/posts?search=node&sort=popular"
```

### Like a post
```bash
curl -X PATCH http://localhost:3000/api/posts/1/like
```

## 🔍 Code Walkthrough

### Creating a Post Flow
1. **Request arrives** → POST /api/posts with JSON body
2. **Middleware** → `express.json()` parses body
3. **Validation** → `validatePost` middleware checks requirements
4. **Controller** → `createPost()` generates ID, adds timestamp, saves to store
5. **Response** → Returns 201 Created with new post data

### Getting Filtered Posts Flow
1. **Request arrives** → GET /api/posts?author=john&sort=newest
2. **Controller** → `getAllPosts()` executes:
   - Gets copy of all posts
   - Filters by author if provided
   - Searches if search term provided
   - Sorts by specified order
   - Paginates results
3. **Response** → Returns paginated array with metadata

## 🛡️ Error Handling

### Validation Error (400)
```json
{
  "error": "Validation failed",
  "errors": [
    "Title must be at least 3 characters",
    "Content must be at least 10 characters"
  ]
}
```

### Not Found Error (404)
```json
{
  "error": "Post not found"
}
```

### Server Error (500)
```json
{
  "error": {
    "message": "Internal Server Error",
    "status": 500
  }
}
```

## 📝 Sample Data

The API comes pre-populated with 3 posts:

1. **"Getting Started with Node.js"** by John Doe (10 likes)
2. **"Express.js Fundamentals"** by Jane Smith (15 likes)
3. **"Building REST APIs"** by John Doe (8 likes)

Use these for testing all operations.

## 🎓 Learning Outcomes

By studying this implementation, you'll understand:

### Core Concepts
- ✅ Node.js event-driven architecture
- ✅ HTTP request/response cycle
- ✅ REST API principles (CRUD, HTTP methods, status codes)
- ✅ Stateless server communication

### Express.js
- ✅ Routing and middleware
- ✅ Request/response handling
- ✅ Middleware pipeline and execution order
- ✅ Error handling patterns

### Code Organization
- ✅ Separation of concerns (routes, controllers, middleware)
- ✅ Modular architecture scalability
- ✅ Reusable middleware patterns
- ✅ Project structure best practices

### API Design
- ✅ Query parameters for filtering/sorting
- ✅ Pagination implementation
- ✅ Request validation strategies
- ✅ Consistent error responses
- ✅ HTTP status code usage

## 🔄 Request-Response Cycle

```
┌─────────────────────────────────────────┐
│           HTTP Request Arrives          │
└──────────────────┬──────────────────────┘
                   ↓
        ┌──────────────────────┐
        │  Middleware Stack    │
        ├──────────────────────┤
        │ 1. express.json()    │  ← Parse body
        │ 2. logger            │  ← Log request
        └──────────────────────┘
                   ↓
        ┌──────────────────────┐
        │   Route Matching     │
        └──────────────────────┘
                   ↓
        ┌──────────────────────┐
        │    Validation        │  ← Check data
        │    Middleware        │
        └──────────────────────┘
                   ↓
        ┌──────────────────────┐
        │   Route Handler      │  ← Business logic
        │   Controller         │
        └──────────────────────┘
                   ↓
        ┌──────────────────────┐
        │   JSON Response      │
        └──────────────────────┘
                   ↓
        ┌──────────────────────┐
        │  Error Handler       │  ← If error occurs
        │  Middleware          │
        └──────────────────────┘
```

## 🚀 Next Steps for Enhancement

### Immediate Extensions
- Add comments API endpoints
- Add user authentication (JWT tokens)
- Implement rate limiting
- Add request logging to file

### Database Integration
- Replace in-memory store with MongoDB
- Add schema validation
- Implement transactions for complex operations

### Production Ready
- Add comprehensive error logging
- Implement caching strategy
- Add API versioning (/v1/api/posts)
- Deploy to cloud platform (Heroku, AWS, etc.)

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [RESTful API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

## ✨ Summary

This CommunityHub API demonstrates professional backend development practices with:
- Clean, modular code architecture
- Comprehensive error handling
- Request validation
- Advanced query features (search, filter, sort, paginate)
- Industry-standard project structure
- Complete documentation

It's ready for immediate learning, testing, and serves as a solid foundation for building more complex APIs.

Happy coding! 🎉
