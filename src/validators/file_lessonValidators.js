const { Segments, Joi } = require("celebrate");

const file_lessonValidator = {};

file_lessonValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    file_id: Joi.string().uuid().required(),
    lesson_id: Joi.string().uuid().required(),
  }),
};

file_lessonValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    file_id: Joi.string().uuid(),
    lesson_id: Joi.string().uuid(),
  }),
};

file_lessonValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = file_lessonValidator;
