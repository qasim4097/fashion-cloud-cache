const cacheService = require("../services/cache");

async function getValue(req, res, next) {
  try {
    const { key } = req.params;

    const value = await cacheService.getValue(key);

    if (value) res.status(200).json(value);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}

async function getKeys(req, res, next) {
  try {
    const keys = await cacheService.getKeys();

    res.status(200).json(keys);
  } catch (error) {
    next(error);
  }
}

async function insertUpdateKey(req, res, next) {
  try {
    const { key, value, ttl } = req.body;

    const result = await cacheService.insertUpdateKey({ key, value, ttl });

    if (result) res.sendStatus(200);
    else res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function removeKey(req, res, next) {
  try {
    const { id } = req.params;

    const result = await cacheService.removeKey(id);

    if (result) res.sendStatus(200);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}

async function removeKeys(req, res, next) {
  try {
    const count = await cacheService.removeKeys();
    res.status(200).json("Keys Removed");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getValue,
  getKeys,
  insertUpdateKey,
  removeKey,
  removeKeys,
};
