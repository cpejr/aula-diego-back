const { Segments, Joi } = require("celebrate");

const occupationValidator = {};

occupationValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    organization_id: Joi.string().uuid().required(),
  }),
};

occupationValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    organization_id: Joi.string().uuid(),
  }),
};

occupationValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = occupationValidator;
