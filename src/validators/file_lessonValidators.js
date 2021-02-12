const { Segments, Joi } = require("celebrate");

const file_lesson_Validators = {};

file_lesson_Validators.create = {
  [Segments.BODY]: Joi.object().keys({
    file_id: Joi.string().uuid().required(),
    lesson_id: Joi.string().uuid().required(),
  }),
};

file_lesson_Validators.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    file_id: Joi.string().uuid(),
    lesson_id: Joi.string().uuid(),
  }),
};

file_lesson_Validators.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = file_lesson_Validators;
