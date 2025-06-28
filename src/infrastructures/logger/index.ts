import winston from "winston";
import developmentLogger from "./developmentLogger";
import productionLogger from "./productionLogger";
import dotenv from "dotenv";
dotenv.config();

let logger: winston.Logger;
if (process.env.NODE_ENV !== "production") {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}

export default logger;
