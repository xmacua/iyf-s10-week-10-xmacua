const express = require('express');
const router = express.Router();

const postsRoutes = require('./posts');

// Posts routes
router.use('/posts', postsRoutes);

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'CommunityHub API'
    });
});

module.exports = router;
