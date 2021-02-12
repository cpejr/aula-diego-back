const { Segments, Joi } = require("celebrate");

const classValidator = {};

classValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().uuid().required(),
    organization_id: Joi.string().uuid().required(),
    course_id: Joi.string().required(),
  }),
};

classValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    organization_id: Joi.string().uuid(),
    course_id: Joi.string().uuid(),
  }),
};

classValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = classValidator;
