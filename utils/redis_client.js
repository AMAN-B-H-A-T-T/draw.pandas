const redis = require('ioredis')
require('dotenv').config()

const client = new redis(process.env.EXTERNAL_REDIS_URL)

module.exports = client