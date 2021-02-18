const { Segments, Joi } = require("celebrate");

const live_presenceValidator = {};

live_presenceValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    live_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    confirmarion: Joi.bool().default(false),
    watch_time: Joi.integer().default(0),
  }),
};

live_presenceValidator.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    live_id: Joi.string().uuid(),
    user_id: Joi.string().uuid(),
    confirmarion: Joi.bool(),
    watch_time: Joi.integer(),
  }),
};

live_presenceValidator.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = live_presenceValidator;
