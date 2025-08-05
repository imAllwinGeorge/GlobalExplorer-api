import dotenv from "dotenv";
dotenv.config();

export const config = {
  redis: {
    REDIS_USERNAME: process.env.REDIS_USERNAME || "default",
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT || "16807",
  },

  razorpay: {
    RAZORPAY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
  },

  cors: {
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
  },
};
