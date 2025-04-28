const { createClient } = require('redis');
const { redisHost, redisPort } = require('../config');

const client = createClient({ url: `redis://${redisHost}:${redisPort}` });
client.on('error', err => console.error('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Redis connected');
})();

module.exports = client;