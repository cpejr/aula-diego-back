const { Segments, Joi } = require("celebrate");

const fileValidator = {};

fileValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    path: Joi.string().required(),
    user_id: Joi.string().uuid().required(),
  }),
};

fileValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    path: Joi.string(),
    user_id: Joi.string().uuid(),
  }),
};

fileValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = fileValidator;
