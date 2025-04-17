import { createClient } from 'redis';

const redisClient = createClient({
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


export default redisClient;
