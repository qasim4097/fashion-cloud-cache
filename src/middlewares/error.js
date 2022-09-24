const logger = require("../logger");

module.exports = function (err, req, res, next) {
  logger.error(err);

  const statusCode = 500;
  const message =
    process.env.NODE_ENV !== "production"
      ? err.message
      : "Some error happened in the server";
  res.status(statusCode).json({ message });
};
