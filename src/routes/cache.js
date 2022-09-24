const express = require("express");
const router = express.Router();
const {
  getValue,
  getKeys,
  insertUpdateKey,
  removeKey,
  removeKeys,
} = require("../controllers/cache");
const {
  upsertKeyValueValidation,
} = require("../middlewares/validations/cache");

router.get("/values/:key", getValue);
router.get("/keys", getKeys);
router.put("/", upsertKeyValueValidation, insertUpdateKey);
router.delete("/keys/:id", removeKey);
router.delete("/keys", removeKeys);

module.exports = router;
