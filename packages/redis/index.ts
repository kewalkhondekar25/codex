// import { createClient } from"redis";

// export const redisClient = createClient({
//   url: process.env.REDIS_URL
// })

import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;