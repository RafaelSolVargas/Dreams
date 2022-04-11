const env = process.env.NODE_ENV || 'development';
const config = require('../configs/databaseEnv')[env.trim()];

module.exports = config;
