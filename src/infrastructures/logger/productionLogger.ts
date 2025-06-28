import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level} ${timestamp}   ${message}`;
});

const productionLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    // defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console(),
      new transports.File({ filename: "error.log" }),
    ],
  });
};

export default productionLogger;
