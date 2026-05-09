# CommunityHub API

A RESTful API for managing posts in a community platform, built with Node.js and Express.js.

## Project Structure

```
communityhub-api/
├── src/
│   ├── routes/
│   │   ├── posts.js          # Posts routes
│   │   └── index.js          # Route aggregator
│   ├── middleware/
│   │   ├── logger.js         # Request logging middleware
│   │   ├── errorHandler.js   # Error handling & validation
│   │   └── validate.js       # Request validation
│   ├── controllers/
│   │   └── postsController.js # Posts business logic
│   ├── data/
│   │   └── store.js          # In-memory data store
│   └── app.js                # Express app setup
├── server.js                 # Entry point
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .env.example              # Example env file
└── README.md                 # Documentation
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# .env is already set up with defaults
# PORT=3000
# NODE_ENV=development
```

### 3. Start the Server
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/api/health` - API health status

### Posts Endpoints

#### Get All Posts
```bash
GET /api/posts
```

**Query Parameters:**
- `author` - Filter by author name (case-insensitive)
- `search` - Search in title and content
- `sort` - Sort posts: `newest`, `oldest`, `popular`
- `page` - Page number (default: 1)
- `limit` - Posts per page (default: 10)

**Example:**
```bash
GET /api/posts?author=john&sort=newest&page=1&limit=5
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Getting Started with Node.js",
      "content": "Node.js is a JavaScript runtime...",
      "author": "John Doe",
      "createdAt": "2026-01-15T10:00:00Z",
      "updatedAt": null,
      "likes": 10
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 3,
    "pages": 1
  }
}
```

#### Get Single Post
```bash
GET /api/posts/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Getting Started with Node.js",
  "content": "Node.js is a JavaScript runtime...",
  "author": "John Doe",
  "createdAt": "2026-01-15T10:00:00Z",
  "updatedAt": null,
  "likes": 10
}
```

#### Create Post
```bash
POST /api/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post on CommunityHub",
  "author": "Jane Developer"
}
```

**Validation:**
- `title` - Required, minimum 3 characters
- `content` - Required, minimum 10 characters
- `author` - Required, minimum 2 characters

**Response:** `201 Created`
```json
{
  "id": 4,
  "title": "My First Post",
  "content": "This is the content of my first post on CommunityHub",
  "author": "Jane Developer",
  "createdAt": "2026-01-20T15:30:45.123Z",
  "updatedAt": null,
  "likes": 0
}
```

#### Update Post
```bash
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content goes here with more details"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content goes here with more details",
  "author": "John Doe",
  "createdAt": "2026-01-15T10:00:00Z",
  "updatedAt": "2026-01-20T15:32:10.456Z",
  "likes": 10
}
```

#### Delete Post
```bash
DELETE /api/posts/:id
```

**Response:** `204 No Content`

#### Like Post
```bash
PATCH /api/posts/:id/like
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Getting Started with Node.js",
  "content": "Node.js is a JavaScript runtime...",
  "author": "John Doe",
  "createdAt": "2026-01-15T10:00:00Z",
  "updatedAt": null,
  "likes": 11
}
```

#### Unlike Post
```bash
PATCH /api/posts/:id/unlike
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Getting Started with Node.js",
  "content": "Node.js is a JavaScript runtime...",
  "author": "John Doe",
  "createdAt": "2026-01-15T10:00:00Z",
  "updatedAt": null,
  "likes": 10
}
```

## Testing with cURL

### Get all posts
```bash
curl http://localhost:3000/api/posts
```

### Get posts by author
```bash
curl "http://localhost:3000/api/posts?author=john"
```

### Search posts
```bash
curl "http://localhost:3000/api/posts?search=node"
```

### Get most popular posts
```bash
curl "http://localhost:3000/api/posts?sort=popular"
```

### Create a post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "This is my new post about web development",
    "author": "Developer Jane"
  }'
```

### Get single post
```bash
curl http://localhost:3000/api/posts/1
```

### Update post
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Post Title",
    "content": "This is the updated content of the post"
  }'
```

### Like a post
```bash
curl -X PATCH http://localhost:3000/api/posts/1/like
```

### Delete post
```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

## Testing with Postman/Thunder Client

### Import Collection
1. Create a new collection named "CommunityHub API"
2. Add requests as listed in the cURL examples above
3. Use variables for base URL: `{{BASE_URL}} = http://localhost:3000`

## Middleware

### Logger Middleware
- Logs all requests with method, URL, and response time
- Useful for debugging and monitoring

### Validation Middleware
- Validates POST and PUT requests
- Checks required fields and minimum character lengths
- Returns 400 Bad Request with error details if validation fails

### Error Handler Middleware
- Centralized error handling for the entire application
- Returns consistent error responses
- Logs error details for debugging

## Features

✅ **CRUD Operations** - Create, Read, Update, Delete posts
✅ **Filtering** - Filter posts by author
✅ **Search** - Search in post titles and content
✅ **Sorting** - Sort by newest, oldest, or most popular
✅ **Pagination** - Paginate through results
✅ **Like/Unlike** - Like and unlike posts
✅ **Validation** - Request validation with helpful error messages
✅ **Error Handling** - Comprehensive error handling with consistent responses
✅ **Logging** - Request logging with response times
✅ **Environment Config** - Environment-based configuration

## File Structure Explained

- **server.js** - Application entry point, loads environment variables and starts server
- **src/app.js** - Express application setup, middleware configuration
- **src/routes/** - Route definitions
- **src/controllers/** - Business logic for handling requests
- **src/middleware/** - Custom middleware (logging, validation, error handling)
- **src/data/store.js** - In-memory data persistence
- **.env** - Environment variables (PORT, NODE_ENV, etc.)

## Learning Outcomes

After completing this project, you will understand:
- ✅ How to create a Node.js server with Express
- ✅ How to organize code with routes and controllers
- ✅ How to implement CRUD operations
- ✅ How to use middleware for cross-cutting concerns
- ✅ How to validate request data
- ✅ How to handle errors properly
- ✅ How to implement filtering, searching, and sorting
- ✅ How to paginate results
- ✅ How to structure a production-like API

## Next Steps

- Add a database (MongoDB, PostgreSQL) to replace in-memory storage
- Add authentication and authorization
- Add comments functionality to posts
- Add user management
- Add rate limiting
- Add API documentation with Swagger/OpenAPI
- Add unit and integration tests
- Deploy to a cloud platform

## License

ISC
