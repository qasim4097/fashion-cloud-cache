const winston = require("winston");
const logFolder = "log";
const path = require("path");
const fs = require("fs");

if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

const fileOptions = {
  maxsize: 1024 * 1024 * (process.env.LOG_MAX_SIZE || 2000000), // Default for 2MB. It can be overridden by .env file.
  maxFiles: 100,
  tailable: true,
  timestamp: true,
};

//for logging error of Object type Error
const replaceError = ({ message, stack, ...value }) => ({
  message,
  stack,
  ...value,
});
const replacer = (key, value) =>
  value instanceof Error ? replaceError(value) : value;

const level =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
    ? "info"
    : "debug";
const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json({ replacer }),
    winston.format.colorize()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: path.join(logFolder, "/error.log"),
      level: "error",
      ...fileOptions,
    }),
    new winston.transports.File({
      filename: path.join(logFolder, "/combined.log"),
      ...fileOptions,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
