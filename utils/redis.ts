import Redis, { Redis as IORedisClient } from 'ioredis';

// Create a Redis client instance with type annotation
const redisClient: IORedisClient = new Redis({
    host: 'localhost',
    port: 6379
});

// Handle Redis client errors with proper typing
redisClient.on('error', (err: Error) => {
    console.error('Redis error: ', err);
});

export default redisClient;