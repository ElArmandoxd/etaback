const config = {
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/eta',
    SERVER_URL: process.env.SERVER_URL || 'http://127.0.0.1:3000'
}

module.exports = config;