"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379',
});
redisClient.connect().then(() => {
    console.log('Redis connected');
}).catch((err) => {
    console.error('Error while connecting to Redis:', err);
});
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});
exports.default = redisClient;
