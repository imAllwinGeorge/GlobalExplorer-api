import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const developmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), myFormat),
    // defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
};

export default developmentLogger;
