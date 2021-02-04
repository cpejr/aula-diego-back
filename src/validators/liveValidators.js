const { Segments, Joi } = require("celebrate");

const liveValidator = {};

liveValidator.create = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    live_link: Joi.string().required(),
    date: Joi.date().required(),
    /* time: Joi.string().required(), */
    duration: Joi.string().required(),
    confirmation_code: Joi.string().required(),
  }),
};

liveValidator.uptade = {
  [Segments.PARAMS]: Joi.object().keys({
    live_id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      start_date: Joi.date().optional(),
      description: Joi.string().optional(),
      live_link: Joi.string().optional(),
      duration: Joi.string().optional(),
      confirmation_code: Joi.string().optional(),
    }),
};

liveValidator.deletelive = {
  [Segments.PARAMS]: Joi.object().keys({
    live_id: Joi.string().required(),
  }),
};

module.exports = liveValidator;
