const { Segments, Joi } = require("celebrate");

const lesson_presenceValidator = {};

lesson_presenceValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    lesson_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    confirmarion: Joi.bool().default('pending'),
  }),
};

lesson_presenceValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    lesson_id: Joi.string().uuid(),
    user_id: Joi.string().uuid(),
    confirmarion: Joi.bool(),
  }),
};

lesson_presenceValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = lesson_presenceValidator;
