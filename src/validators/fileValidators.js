const { Segments, Joi } = require("celebrate");

const courseValidator = {};

courseValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    path: Joi.string().required(),
    user_id: Joi.string().uuid().required(),
  }),
};

courseValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    path: Joi.string(),
    user_id: Joi.string().uuid(),
  }),
};

courseValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = courseValidator;
