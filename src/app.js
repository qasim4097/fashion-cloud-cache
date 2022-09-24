require("./init");

const express = require("express");
const app = express();

const cache = require("./routes/cache");
const errorsMiddlware = require("./middlewares/error");

app.use(express.json());

/** Endpoint to check status of the service. */
app.get("/api/status", async (req, res) =>
  res.status(200).json({ message: "Cache service is up and running." })
);

app.use("/api/cache", cache);

/** Error handler middleware */
app.use(errorsMiddlware);

module.exports = app;
