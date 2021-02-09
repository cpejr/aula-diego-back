const { Segments, Joi } = require("celebrate");

const liveValidator = {};

liveValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    datetime: Joi.string().required(),
    link: Joi.string().required(),
    course_id: Joi.string().required(),
    confirmation_code: Joi.string().required(),
  }),
};

liveValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    datetime: Joi.string().required(),
    link: Joi.string().required(),
    course_id: Joi.string().required(),
    confirmation_code: Joi.string().required(),
    }),
};

liveValidator.deletelive = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = liveValidator;
