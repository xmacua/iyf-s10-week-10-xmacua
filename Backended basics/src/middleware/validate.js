const { ApiError } = require('./errorHandler');

// Validate post creation/update
const validatePost = (req, res, next) => {
    const { title, content, author } = req.body;
    const errors = [];
    
    if (!title || title.trim().length < 3) {
        errors.push('Title must be at least 3 characters');
    }
    
    if (!content || content.trim().length < 10) {
        errors.push('Content must be at least 10 characters');
    }
    
    if (!author || author.trim().length < 2) {
        errors.push('Author must be at least 2 characters');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            error: 'Validation failed',
            errors 
        });
    }
    
    next();
};

module.exports = {
    validatePost
};
