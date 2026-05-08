# CommunityHub API - Quick Reference

## Setup & Run
```bash
npm install
npm start
```

## API Base URL
```
http://localhost:3000
```

## Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/posts` | Get all posts with filters |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |
| PATCH | `/api/posts/:id/like` | Like a post |
| PATCH | `/api/posts/:id/unlike` | Unlike a post |
| GET | `/api/health` | Health check |

## Sample Requests

### Create Post
```json
POST /api/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is some interesting content about web development",
  "author": "John Developer"
}
```

### Get Posts with Filters
```
GET /api/posts?author=John&sort=newest&page=1&limit=10
```

### Update Post
```json
PUT /api/posts/1
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content here"
}
```

### Like/Unlike
```
PATCH /api/posts/1/like
PATCH /api/posts/1/unlike
```

## Query Parameters

- **author** - Filter by author name
- **search** - Search title/content
- **sort** - 'newest', 'oldest', 'popular'
- **page** - Page number (default: 1)
- **limit** - Posts per page (default: 10)

## Status Codes

- **201** - Created (POST successful)
- **204** - No Content (DELETE successful)
- **400** - Bad Request (validation failed)
- **404** - Not Found (resource doesn't exist)
- **500** - Server Error

## Error Response Format

```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

## Validation Rules

| Field | Rules |
|-------|-------|
| title | Required, min 3 chars |
| content | Required, min 10 chars |
| author | Required, min 2 chars |

## Sample Data

The API comes with 3 sample posts:
1. "Getting Started with Node.js" by John Doe
2. "Express.js Fundamentals" by Jane Smith
3. "Building REST APIs" by John Doe

You can test all operations on these posts.
