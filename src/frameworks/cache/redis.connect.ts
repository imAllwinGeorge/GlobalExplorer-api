import { createClient } from "redis";
import { config } from "../../shared/config";

export const redisClient = createClient({
  username: config.redis.REDIS_USERNAME || "default",
  password: config.redis.REDIS_PASS,
  socket: {
    host: config.redis.REDIS_HOST,
    port: parseInt(config.redis.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis clientError", err));

export const connectRedisClient = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected Successfully!");
  } catch (error) {
    console.log("Redis Connectio failed: ", error);
    process.exit(1);
  }
};
