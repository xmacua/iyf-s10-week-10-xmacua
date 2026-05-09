// In-memory data store
let posts = [
    { 
        id: 1, 
        title: "Getting Started with Node.js", 
        content: "Node.js is a JavaScript runtime that allows you to run JavaScript outside of a browser. It's perfect for building server-side applications and APIs.",
        author: "John Doe",
        createdAt: "2026-01-15T10:00:00Z",
        updatedAt: null,
        likes: 10
    },
    { 
        id: 2, 
        title: "Express.js Fundamentals", 
        content: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
        author: "Jane Smith",
        createdAt: "2026-01-16T14:30:00Z",
        updatedAt: null,
        likes: 15
    },
    { 
        id: 3, 
        title: "Building REST APIs", 
        content: "REST (Representational State Transfer) is an architectural style for designing networked applications. Learn how to build scalable REST APIs with Express.",
        author: "John Doe",
        createdAt: "2026-01-17T09:15:00Z",
        updatedAt: null,
        likes: 8
    }
];

let nextId = 4;

module.exports = {
    posts,
    nextId: {
        getValue: () => nextId,
        increment: () => nextId++
    }
};
