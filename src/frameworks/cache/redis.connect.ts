import { createClient } from "redis";
import { config } from "../../shared/config";
import logger from "../../infrastructures/logger";

const redisUrl = `${config.redis.REDIS_HOST}`;
console.log(redisUrl);
export const redisClient = createClient({
  url: redisUrl,
  socket: config.node.NODE_ENV === "production"
  ? {
      tls: true,
      rejectUnauthorized: true,
    }
  : undefined,

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
