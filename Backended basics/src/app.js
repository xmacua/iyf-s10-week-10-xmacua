const express = require('express');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to CommunityHub API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /api/health',
            posts: {
                getAll: 'GET /api/posts',
                getOne: 'GET /api/posts/:id',
                create: 'POST /api/posts',
                update: 'PUT /api/posts/:id',
                delete: 'DELETE /api/posts/:id',
                like: 'PATCH /api/posts/:id/like',
                unlike: 'PATCH /api/posts/:id/unlike'
            }
        }
    });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Error handler (must be last!)
app.use(errorHandler);

module.exports = app;
