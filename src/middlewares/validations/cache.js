const Joi = require("joi");

function upsertKeyValueValidation(req, res, next) {
  const schema = Joi.object({
    key: Joi.required(),
    value: Joi.required(),
    ttl: Joi.required(),
  });

  const { error } = schema.validate(req.body);

  if (error) res.status(400).json(error.message);
  else next();
}

module.exports = {
  upsertKeyValueValidation,
};
