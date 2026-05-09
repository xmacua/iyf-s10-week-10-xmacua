// Logger middleware
const logger = (req, res, next) => {
    const startTime = Date.now();
    
    // Log request
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Track response time
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`  ↳ Status: ${res.statusCode} | Duration: ${duration}ms`);
    });
    
    next();
};

module.exports = logger;
