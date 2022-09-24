require("./init");

const app = require("./app");

const eventEmitter = require("./utils/event");
const { DB_CONNECTION_EVENT } = require("./utils/constants");

const logger = require("./logger");

PORT = process.env.PORT || 3000;

eventEmitter.on(DB_CONNECTION_EVENT, async () => {
  app.listen(PORT, () => logger.info(`Listening at port ${PORT}`));
});

process.on("uncaughtExceptionMonitor", (err) => {
  logger.error(err, "Uncaught Exception thrown");
});
