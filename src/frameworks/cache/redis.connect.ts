import { createClient } from "redis";
import { config } from "../../shared/config";
import logger from "../../infrastructures/logger";

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
    logger.info("Redis Connected Successfully!");
  } catch (error) {
    logger.error("Redis Connectio failed: ", error);
    process.exit(1);
  }
};
