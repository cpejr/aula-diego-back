const { Segments, Joi } = require("celebrate");

const lessonValidator = {};

lessonValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    course_id: Joi.string().required(),
  }),
};

lessonValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    course_id: Joi.string().required(),
    }),
};

lessonValidator.deletelive = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = lessonValidator;
