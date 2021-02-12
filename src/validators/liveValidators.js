const { Segments, Joi } = require("celebrate");

const liveValidator = {};

liveValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    confirmation_code: Joi.string().required(),
    link: Joi.string().required(),
    course_id: Joi.string().uuid().required(),
  }),
};

liveValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    date: Joi.string(),
    confirmation_code: Joi.string(),
    link: Joi.string(),
    course_id: Joi.string().uuid(),
    }),
};

liveValidator.deletelive = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = liveValidator;
