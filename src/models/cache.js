const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultTTLInSec = process.env.DEFAULT_TTL * 1000;
const cacheSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    ttl: {
      type: Number,
      default: defaultTTLInSec,
    },
  },
  {
    timestamps: true,
  }
);

const Cache = mongoose.model("cache", cacheSchema);

module.exports = Cache;
