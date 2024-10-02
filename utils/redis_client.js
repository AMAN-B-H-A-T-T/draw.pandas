const redis = require('ioredis')
require('dotenv').config()

// for local redis client server 

const client = new redis()

// for external redis clien server 
// const client = new redis(process.env.EXTERNAL_REDIS_URL)

module.exports = client