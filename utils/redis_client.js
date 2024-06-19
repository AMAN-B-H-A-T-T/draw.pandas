const redis = require('ioredis')
require('dotenv').config()

const client = new redis({
    port : process.env.REDIS_PORT,
    host : process.env.REDIS_HOST,
    username : process.env.REDIS_USER,
    password:  process.env.REDIS_PASSWORD
})

module.exports = client