const { Segments, Joi } = require("celebrate");

const user_classValidator = {};

user_classValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    user_id: Joi.string().uuid().required(),
    class_id: Joi.string().uuid().required(),
  }),
};

user_classValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    user_id: Joi.string().uuid(),
    class_id: Joi.string().uuid(),
  }),
};

user_classValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = user_classValidator;
