# 🚀 Quick Start Guide

## Run in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Server
```bash
npm start
```

You should see:
```
🚀 CommunityHub API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Running on http://localhost:3000
🔧 Environment: development
📝 Try GET http://localhost:3000 for API documentation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3️⃣ Test the API

Open in your browser or use curl:
```bash
# Get API documentation
curl http://localhost:3000

# Get all posts
curl http://localhost:3000/api/posts

# Create a post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is my first post on CommunityHub",
    "author": "John Developer"
  }'
```

---

## 📚 Documentation

- **[README.md](README.md)** - Complete API documentation
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick endpoint reference
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive testing examples
- **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Deep dive into code structure
- **[PostmanCollection.json](PostmanCollection.json)** - Import for Postman

---

## 🧪 Quick Test URLs

### In Browser
- API Docs: http://localhost:3000
- All Posts: http://localhost:3000/api/posts
- Health Check: http://localhost:3000/api/health
- First Post: http://localhost:3000/api/posts/1

### With Query Parameters
- By Author: http://localhost:3000/api/posts?author=John
- Search: http://localhost:3000/api/posts?search=Node
- Popular: http://localhost:3000/api/posts?sort=popular
- Pagination: http://localhost:3000/api/posts?page=1&limit=5

---

## 🎯 What You Can Do

✅ Create posts  
✅ Read posts (all or single)  
✅ Update posts  
✅ Delete posts  
✅ Like/Unlike posts  
✅ Search & filter  
✅ Sort & paginate  
✅ Validate requests  
✅ Handle errors  

---

## 📝 Common cURL Examples

```bash
# Create
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "content": "Content here", "author": "Me"}'

# Read All
curl http://localhost:3000/api/posts

# Read One
curl http://localhost:3000/api/posts/1

# Update
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "content": "Updated content"}'

# Delete
curl -X DELETE http://localhost:3000/api/posts/1

# Like
curl -X PATCH http://localhost:3000/api/posts/1/like

# Search
curl "http://localhost:3000/api/posts?search=node&sort=popular"
```

---

## 🛑 Stop Server

Press `Ctrl + C` in terminal

---

## ✨ You're Ready!

Everything is set up and ready to go. Start the server and start testing! 🎉

For detailed information, see [TESTING_GUIDE.md](TESTING_GUIDE.md)
