const { Segments, Joi } = require("celebrate");

const sessionValidator = {};

sessionValidator.login = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string(),
    google: Joi.boolean(),
  }),
};

sessionValidator.verifyToken = {
  [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(),
};

sessionValidator.forgotPassword = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

module.exports = sessionValidator;
