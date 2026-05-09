require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`\n🚀 CommunityHub API Server`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 Running on http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${NODE_ENV}`);
    console.log(`📝 Try GET http://localhost:${PORT} for API documentation`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
