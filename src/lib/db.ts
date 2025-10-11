import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../infrastructures/logger";
import { startReservationWatcher } from "../frameworks/workers/reservationWatcher";
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info(`mongoDB connected: ${conn.connection.host}`);
    startReservationWatcher();
  } catch (error) {
    logger.error(`mongoose connection error: ${error}`);
  }
};
