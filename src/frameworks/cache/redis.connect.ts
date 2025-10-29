import { createClient } from "redis";
import { config } from "../../shared/config";
import logger from "../../infrastructures/logger";

const redisUrl = `rediss://${config.redis.REDIS_HOST}:${config.redis.REDIS_PASS}@${config.redis.REDIS_HOST}:${config.redis.REDIS_PORT}`
console.log(redisUrl);
export const redisClient = createClient({
  url: redisUrl
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
