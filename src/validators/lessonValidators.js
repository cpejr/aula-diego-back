const { Segments, Joi } = require("celebrate");

const lessonValidator = {};

lessonValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    course_id: Joi.string().uuid().required(),
  }),
};

lessonValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    course_id: Joi.string().uuid(),
    }),
};

lessonValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = lessonValidator;
