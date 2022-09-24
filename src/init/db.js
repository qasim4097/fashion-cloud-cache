const mongoose = require("mongoose");

const eventEmitter = require("../utils/event");
const { DB_CONNECTION_EVENT } = require("../utils/constants");

const logger = require("../logger");

// Mongoose connection
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const connectionUrl = process.env.MONGO_URL;

mongoose.connect(
  "mongodb://localhost:27017/fashion-cloud-cache",
  mongooseOptions
);

mongoose.connection.on("connected", () =>
  eventEmitter.emit(DB_CONNECTION_EVENT)
);
mongoose.connection.on("error", (err) =>
  logger.error("MongoDB connection error: ", err)
);

module.exports = mongoose.connection;
